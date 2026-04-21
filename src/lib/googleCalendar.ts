/**
 * Google Calendar Integration
 * Fetches unavailable dates from Google Calendar API
 * Supports per-service calendars for independent availability
 * Uses service account (not user OAuth) for simpler auth flow
 */

import { google } from "googleapis";

// ---------------------------------------------------------------------------
// Service detection from event titles (single-calendar strategy)
// ---------------------------------------------------------------------------

const SERVICE_PATTERNS: { productId: string; pattern: RegExp }[] = [
  { productId: "360-slow-motion", pattern: /360|slow\s*motion/i },
  { productId: "glam-vintage", pattern: /vintage|glam/i },
  { productId: "selfie-pod", pattern: /selfie/i },
];

const BLOCK_ALL_PATTERNS = /holiday|unavailable|blocked|busy|day\s*off|annual\s*leave/i;

const ALL_PRODUCT_IDS = ["360-slow-motion", "glam-vintage", "selfie-pod"];

/**
 * Detect which services an event blocks based on its summary/title.
 * - Empty / unrecognised summary → blocks ALL services (safe default)
 * - "holiday", "blocked", etc. → blocks ALL services
 * - Keywords like "360", "vintage", "selfie" → blocks only matching services
 * - Multiple keywords → blocks multiple services (e.g. "360booth+selfie pod")
 */
function detectServicesFromEvent(summary: string | undefined | null): string[] {
  if (!summary || !summary.trim()) return ALL_PRODUCT_IDS;
  if (BLOCK_ALL_PATTERNS.test(summary)) return ALL_PRODUCT_IDS;

  const matched: string[] = [];
  for (const { productId, pattern } of SERVICE_PATTERNS) {
    if (pattern.test(summary)) {
      matched.push(productId);
    }
  }

  if (matched.length === 0) {
    // Unrecognised event title — safe default: block all
    console.warn(
      `[googleCalendar] Unrecognised event "${summary}" — blocking all services`
    );
    return ALL_PRODUCT_IDS;
  }

  return matched;
}

// ---------------------------------------------------------------------------
// Structured calendar event type
// ---------------------------------------------------------------------------

interface CalendarEvent {
  dates: string[];     // YYYY-MM-DD
  services: string[];  // product IDs this event blocks
  summary: string;
}

/** Map product IDs to their dedicated calendar env vars */
const CALENDAR_ID_MAP: Record<string, string | undefined> = {
  "360-slow-motion": process.env.GOOGLE_CALENDAR_ID_360_SLOW_MOTION,
  "glam-vintage": process.env.GOOGLE_CALENDAR_ID_GLAM_VINTAGE,
  "selfie-pod": process.env.GOOGLE_CALENDAR_ID_SELFIE_POD,
};

/** Get calendar ID for a product, falling back to the global calendar */
function getCalendarIdForProduct(productId: string): string | undefined {
  return CALENDAR_ID_MAP[productId] || process.env.GOOGLE_CALENDAR_CALENDAR_ID;
}

/**
 * Initialize Google Calendar API client using service account credentials
 */
function getCalendarClient() {
  const projectId = process.env.GOOGLE_CALENDAR_PROJECT_ID;
  const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL;

  if (!projectId || !privateKey || !clientEmail) {
    throw new Error(
      "Google Calendar credentials not configured. Set GOOGLE_CALENDAR_PROJECT_ID, GOOGLE_CALENDAR_PRIVATE_KEY, and GOOGLE_CALENDAR_CLIENT_EMAIL"
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: projectId,
      private_key: privateKey,
      client_email: clientEmail,
      client_id: "",
    },
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });

  return google.calendar({ version: "v3", auth });
}

/**
 * Fetch events from a specific Google Calendar for a given month
 * Returns list of date strings in YYYY-MM-DD format
 */
async function fetchCalendarEvents(
  calendarId: string,
  year: number,
  month: number
): Promise<string[]> {
  try {
    const calendar = getCalendarClient();

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfMonth.toISOString(),
      timeMax: endOfMonth.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    const unavailableDates = new Set<string>();

    for (const event of events) {
      if (!event.start || !event.end) continue;

      const startStr = event.start.dateTime || event.start.date;
      const endStr = event.end.dateTime || event.end.date;

      if (!startStr || !endStr) continue;

      // For all-day events, start/end are date strings like "2026-03-21"
      // For timed events, they are ISO datetimes
      // Use UTC throughout to avoid DST issues
      const isAllDay = !event.start.dateTime;

      if (isAllDay) {
        // All-day events: start.date is inclusive, end.date is exclusive
        // e.g., "2026-03-21" to "2026-03-22" means only March 21
        const startParts = startStr.split("-").map(Number);
        const endParts = endStr.split("-").map(Number);
        const start = Date.UTC(startParts[0], startParts[1] - 1, startParts[2]);
        const end = Date.UTC(endParts[0], endParts[1] - 1, endParts[2]);

        let cur = start;
        while (cur < end) {
          const d = new Date(cur);
          const dateString = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
          unavailableDates.add(dateString);
          cur += 86400000; // +1 day in ms
        }
      } else {
        // Timed events: extract the date portion from start/end
        const startDate = new Date(startStr);
        const endDate = new Date(endStr);

        let cur = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
        const endDay = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());

        while (cur <= endDay) {
          const d = new Date(cur);
          const dateString = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
          unavailableDates.add(dateString);
          cur += 86400000;
        }
      }
    }

    return Array.from(unavailableDates);
  } catch (error: any) {
    console.error("Google Calendar API error:", error?.message || "Failed to fetch calendar events");
    return [];
  }
}

/**
 * Fetch structured events from Google Calendar for a given month.
 * Each event includes its blocked dates AND which services it affects.
 */
async function fetchCalendarEventsStructured(
  calendarId: string,
  year: number,
  month: number
): Promise<CalendarEvent[]> {
  try {
    const calendar = getCalendarClient();

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfMonth.toISOString(),
      timeMax: endOfMonth.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    const result: CalendarEvent[] = [];

    for (const event of events) {
      if (!event.start || !event.end) continue;

      const startStr = event.start.dateTime || event.start.date;
      const endStr = event.end.dateTime || event.end.date;
      if (!startStr || !endStr) continue;

      const eventDates: string[] = [];
      const isAllDay = !event.start.dateTime;

      if (isAllDay) {
        const startParts = startStr.split("-").map(Number);
        const endParts = endStr.split("-").map(Number);
        const start = Date.UTC(startParts[0], startParts[1] - 1, startParts[2]);
        const end = Date.UTC(endParts[0], endParts[1] - 1, endParts[2]);

        let cur = start;
        while (cur < end) {
          const d = new Date(cur);
          eventDates.push(
            `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`
          );
          cur += 86400000;
        }
      } else {
        const startDate = new Date(startStr);
        const endDate = new Date(endStr);

        let cur = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
        const endDay = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());

        while (cur <= endDay) {
          const d = new Date(cur);
          eventDates.push(
            `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`
          );
          cur += 86400000;
        }
      }

      const summary = event.summary || "";
      result.push({
        dates: eventDates,
        services: detectServicesFromEvent(summary),
        summary,
      });
    }

    return result;
  } catch (error: any) {
    console.error("Google Calendar API error:", error?.message || "Failed to fetch calendar events");
    return [];
  }
}

export interface UnavailableDatesResult {
  merged: string[];
  perProduct: Record<string, string[]>;
}

/**
 * Get unavailable dates for a month.
 * - Without productIds: legacy behaviour (single global calendar)
 * - With productIds: fetch each product's calendar in parallel, deduplicate
 */
export async function getUnavailableDates(
  year: number,
  month: number,
  productIds?: string[]
): Promise<UnavailableDatesResult> {
  try {
    // Legacy path: no product IDs → use global calendar
    if (!productIds || productIds.length === 0) {
      const calendarId = process.env.GOOGLE_CALENDAR_CALENDAR_ID;
      if (!calendarId) {
        return { merged: [], perProduct: {} };
      }
      const dates = await fetchCalendarEvents(calendarId, year, month);
      return { merged: dates, perProduct: {} };
    }

    // Per-product path: resolve calendar IDs, deduplicate fetches
    const calendarToProducts = new Map<string, string[]>();

    for (const pid of productIds) {
      const cid = getCalendarIdForProduct(pid);
      if (!cid) continue;
      const existing = calendarToProducts.get(cid) || [];
      existing.push(pid);
      calendarToProducts.set(cid, existing);
    }

    // No calendars configured → fail-open
    if (calendarToProducts.size === 0) {
      return { merged: [], perProduct: Object.fromEntries(productIds.map(p => [p, []])) };
    }

    // Single shared calendar → use structured event parsing for per-service filtering
    if (calendarToProducts.size === 1) {
      const [calendarId, pids] = Array.from(calendarToProducts.entries())[0];
      const events = await fetchCalendarEventsStructured(calendarId, year, month);

      const perProduct: Record<string, Set<string>> = {};
      for (const pid of productIds) {
        perProduct[pid] = new Set();
      }

      for (const event of events) {
        for (const pid of pids) {
          if (event.services.includes(pid)) {
            for (const d of event.dates) {
              perProduct[pid].add(d);
            }
          }
        }
      }

      const mergedSet = new Set<string>();
      const perProductArrays: Record<string, string[]> = {};
      for (const pid of productIds) {
        const dates = Array.from(perProduct[pid] || []);
        perProductArrays[pid] = dates;
        for (const d of dates) mergedSet.add(d);
      }

      return { merged: Array.from(mergedSet), perProduct: perProductArrays };
    }

    // Multiple different calendars → fetch each in parallel (original logic)
    const entries = Array.from(calendarToProducts.entries());
    const results = await Promise.allSettled(
      entries.map(([cid]) => fetchCalendarEvents(cid, year, month))
    );

    const perProduct: Record<string, string[]> = {};
    const mergedSet = new Set<string>();

    for (let i = 0; i < entries.length; i++) {
      const [, pids] = entries[i];
      const result = results[i];
      const dates = result.status === "fulfilled" ? result.value : [];

      for (const pid of pids) {
        perProduct[pid] = dates;
      }
      for (const d of dates) {
        mergedSet.add(d);
      }
    }

    // Ensure all requested products appear in perProduct (even if no calendar)
    for (const pid of productIds) {
      if (!(pid in perProduct)) {
        perProduct[pid] = [];
      }
    }

    return { merged: Array.from(mergedSet), perProduct };
  } catch (error) {
    console.error("Error getting unavailable dates:", error);
    return { merged: [], perProduct: {} };
  }
}

/**
 * Check if a specific date is available for given products
 */
export async function isDateAvailable(
  dateString: string,
  productIds?: string[]
): Promise<boolean> {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const { merged } = await getUnavailableDates(year, month, productIds);
    return !merged.includes(dateString);
  } catch (error) {
    console.error("Error checking date availability:", error);
    return true;
  }
}

interface CreateBookingEventParams {
  date: string;
  clientName: string;
  productName: string;
  venue?: string;
  bookingRef: string;
  productIds?: string[];
}

export async function createBookingEvent(params: CreateBookingEventParams): Promise<void> {
  const calendar = await getCalendarClient();
  const { date, clientName, productName, venue, bookingRef } = params;

  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);

  await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_CALENDAR_ID!,
    requestBody: {
      summary: `[BOOKED] ${productName} — ${clientName}`,
      description: `Booking Ref: ${bookingRef}\nClient: ${clientName}\nProduct: ${productName}${venue ? `\nVenue: ${venue}` : ""}`,
      start: { date: startDate.toISOString().split("T")[0] },
      end: { date: endDate.toISOString().split("T")[0] },
      status: "confirmed",
    },
  });
}
