"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomCalendarProps {
  value: string; // YYYY-MM-DD format
  onChange: (date: string) => void;
  disabled?: boolean;
  minDate?: string; // YYYY-MM-DD format
  productIds?: string[];
  onPerProductData?: (data: Record<string, string[]>) => void;
}

/** Human-readable labels for product IDs */
const PRODUCT_LABELS: Record<string, string> = {
  "360-slow-motion": "360 Slow Motion",
  "glam-vintage": "Glam Vintage",
  "selfie-pod": "Selfie Pod",
};

export default function CustomCalendar({
  value,
  onChange,
  disabled = false,
  minDate,
  productIds,
  onPerProductData,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    value ? new Date(value) : new Date()
  );
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(
    new Set()
  );
  const [perProductDates, setPerProductDates] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  // Serialize productIds for stable dependency
  const productIdsKey = productIds?.join(",") || "";

  // Fetch unavailable dates when month or productIds change
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      setLoading(true);
      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;

        const params = new URLSearchParams({
          year: String(year),
          month: String(month),
        });
        if (productIdsKey) {
          params.set("productIds", productIdsKey);
        }

        const response = await fetch(
          `/api/calendar/availability?${params.toString()}`
        );

        if (response.ok) {
          const json = await response.json();
          setUnavailableDates(new Set(json.data.unavailableDates));

          if (json.data.perProduct) {
            setPerProductDates(json.data.perProduct);
            onPerProductData?.(json.data.perProduct);
          }
        }
      } catch (error) {
        console.error("Failed to fetch unavailable dates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnavailableDates();
  }, [currentMonth, productIdsKey]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (day: number) => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth() + 1;
    return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const isDateUnavailable = (day: number): boolean => {
    const dateStr = formatDate(day);
    return unavailableDates.has(dateStr);
  };

  const isDateInPast = (day: number): boolean => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (day: number): boolean => {
    return value === formatDate(day);
  };

  const isDateAfterMin = (day: number): boolean => {
    if (!minDate) return true;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const min = new Date(minDate);
    return date >= min;
  };

  /** Build tooltip showing which services are unavailable on a date */
  const getUnavailableTooltip = (day: number): string | undefined => {
    const dateStr = formatDate(day);
    if (!unavailableDates.has(dateStr)) return undefined;

    // If we have per-product data, show which services are booked
    const bookedServices = Object.entries(perProductDates)
      .filter(([, dates]) => dates.includes(dateStr))
      .map(([pid]) => PRODUCT_LABELS[pid] || pid);

    if (bookedServices.length > 0) {
      return `Unavailable: ${bookedServices.join(", ")}`;
    }
    return "Date unavailable";
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDayClick = (day: number) => {
    if (
      disabled ||
      isDateUnavailable(day) ||
      isDateInPast(day) ||
      !isDateAfterMin(day)
    ) {
      return;
    }
    onChange(formatDate(day));
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthName = currentMonth.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          disabled={disabled || loading}
          className="p-1 hover:bg-border rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
        <h3 className="text-sm font-semibold text-white capitalize">{monthName}</h3>
        <button
          onClick={handleNextMonth}
          disabled={disabled || loading}
          className="p-1 hover:bg-border rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-gold animate-spin" />
        </div>
      )}

      {/* Calendar Grid */}
      {!loading && (
        <>
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {emptyDays.map((i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of month */}
            {days.map((day) => {
              const isUnavailable = isDateUnavailable(day);
              const isPast = isDateInPast(day);
              const isSelected = isDateSelected(day);
              const isClickable =
                !disabled && !isUnavailable && !isPast && isDateAfterMin(day);

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  disabled={!isClickable}
                  className={cn(
                    "aspect-square rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center",
                    isSelected
                      ? "bg-gold text-background"
                      : isUnavailable
                        ? "bg-border/50 text-gray-600 cursor-not-allowed"
                        : isPast
                          ? "bg-border/50 text-gray-600 cursor-not-allowed"
                          : isClickable
                            ? "bg-border text-gray-300 hover:bg-gold hover:text-background cursor-pointer"
                            : "bg-surface text-gray-600 cursor-not-allowed"
                  )}
                  title={
                    isUnavailable
                      ? getUnavailableTooltip(day)
                      : isPast
                        ? "Date has passed"
                        : undefined
                  }
                >
                  {day}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Info text */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Gray dates are unavailable
      </p>
    </div>
  );
}
