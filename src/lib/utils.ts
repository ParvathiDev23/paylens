import { CURRENCIES } from "./constants";

/**
 * Formats a numeric amount with the appropriate currency symbol.
 * Falls back to the raw currency code if no symbol mapping exists.
 */
export function formatCurrency(amount: number, currency: string): string {
  const symbol = CURRENCIES[currency] ?? currency;

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${symbol}${formatted}`;
}

/**
 * Converts large numbers into compact human-readable strings.
 * e.g. 1200000 -> "1.2M", 85000 -> "85K"
 */
export function formatCompactNumber(num: number): string {
  if (Math.abs(num) >= 1_000_000) {
    const value = num / 1_000_000;
    return `${parseFloat(value.toFixed(1))}M`;
  }

  if (Math.abs(num) >= 1_000) {
    const value = num / 1_000;
    return `${parseFloat(value.toFixed(1))}K`;
  }

  return num.toString();
}

/**
 * Converts arbitrary text into a URL-safe slug.
 * Strips non-alphanumeric characters and collapses whitespace into hyphens.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Calculates the given percentile from a sorted numeric array
 * using linear interpolation between adjacent ranks.
 */
export function calculatePercentile(
  values: number[],
  percentile: number
): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) {
    return sorted[lower];
  }

  const fraction = index - lower;
  return sorted[lower] + fraction * (sorted[upper] - sorted[lower]);
}

/**
 * Merges CSS class names, filtering out falsy values.
 */
export function cn(
  ...classes: (string | undefined | false | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
