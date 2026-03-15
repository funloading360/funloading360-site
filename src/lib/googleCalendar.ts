/**
 * Google Calendar Integration
 * Fetches unavailable dates from Raz's calendar via Google Calendar API
 * Uses service account (not user OAuth) for simpler auth flow
 */

import { google } from "googleapis";

interface GoogleCalendarError {
  status: number;
  message: string;
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
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });

  return google.calendar({ version: "v3", auth });
}

/**
 * Fetch events from Raz's Google Calendar for a given month
 * Returns list of dates marked as unavailable/booked
 */
async function fetchCalendarEvents(
  year: number,
  month: number
): Promise<Date[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_CALENDAR_ID;
  if (!calendarId) {
    throw new Error("GOOGLE_CALENDAR_CALENDAR_ID not configured");
  }

  try {
    const calendar = getCalendarClient();

    // Set time range: start of month to end of month
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

    // Extract dates from events
    // Consider an event as occupying the entire day if it spans that day
    const unavailableDates = new Set<string>();

    for (const event of events) {
      if (!event.start || !event.end) continue;

      const startStr = event.start.dateTime || event.start.date;
      const endStr = event.end.dateTime || event.end.date;

      if (!startStr || !endStr) continue;

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      // Iterate through each day the event spans
      const currentDate = new Date(startDate);
      currentDate.setHours(0, 0, 0, 0);

      while (currentDate < endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        unavailableDates.add(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return Array.from(unavailableDates).map((d) => new Date(d));
  } catch (error: any) {
    const errorMessage =
      error?.message || "Failed to fetch calendar events";
    console.error("Google Calendar API error:", errorMessage);

    // Fallback: return empty array to allow booking to proceed
    // (safer to over-book than to block all dates)
    return [];
  }
}

/**
 * Get unavailable dates for a month
 * Returns array of date strings in YYYY-MM-DD format
 */
export async function getUnavailableDates(
  year: number,
  month: number
): Promise<string[]> {
  try {
    const dates = await fetchCalendarEvents(year, month);
    return dates.map((d) => d.toISOString().split("T")[0]);
  } catch (error) {
    console.error("Error getting unavailable dates:", error);
    return [];
  }
}

/**
 * Check if a specific date is available
 */
export async function isDateAvailable(dateString: string): Promise<boolean> {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const unavailableDates = await getUnavailableDates(year, month);
    return !unavailableDates.includes(dateString);
  } catch (error) {
    console.error("Error checking date availability:", error);
    // Default to available if there's an error
    return true;
  }
}
