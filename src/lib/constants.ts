// Centralized business constants — single source of truth

export const DEPOSIT_PERCENT = 0.15;
export const DEPOSIT_LABEL = "15%";

export const ADDONS = [
  { id: "guest-book", name: "Guest Book", price: 40, description: "Guests sign memories" },
  { id: "extra-hour", name: "Extra Hour", price: 75, description: "More time for fun" },
  { id: "highlight-reel", name: "Highlight Reel", price: 79, description: "Professional edit next day" },
] as const;

export const BUSINESS_ADDRESS = {
  street: "Guys Farm Rd",
  city: "South Woodham Ferrers",
  postcode: "CM3 5NF",
  county: "Essex",
  country: "GB",
} as const;

export const BUSINESS_PHONE = "+44 7482 112110";
export const BUSINESS_EMAIL = "FunLoading360@gmail.com";
export const ADMIN_ALERT_EMAIL = "FunLoading360@gmail.com";
