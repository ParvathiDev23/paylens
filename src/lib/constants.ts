export const ROLES = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "Engineering Manager",
  "DevOps Engineer",
  "Designer",
  "Data Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Mobile Engineer",
  "QA Engineer",
  "Security Engineer",
] as const;

export type Role = (typeof ROLES)[number];

export const TRACKS = {
  IC: "Individual Contributor",
  MANAGEMENT: "Management",
} as const;

export type Track = keyof typeof TRACKS;

export const SENIORITY_LABELS: Record<number, string> = {
  1: "Intern",
  2: "Junior",
  3: "Mid-Level",
  4: "Senior",
  5: "Staff",
  6: "Senior Staff",
  7: "Principal",
  8: "Distinguished",
  9: "Fellow",
  10: "VP/Executive",
} as const;

export const CURRENCIES: Record<string, string> = {
  USD: "$",
  INR: "Rs.",
  EUR: "E",
  GBP: "P",
  CAD: "C$",
  AUD: "A$",
  SGD: "S$",
  JPY: "Y",
} as const;

export const APP_NAME = "PayLens";

export const APP_DESCRIPTION =
  "Compare compensation intelligently using levels, roles, locations, and structure.";
