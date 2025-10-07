import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const API_BASE_URL = "/"
export const AUTH_KEYS = {
  REFRESH_TOKEN: 'refreshToken',
  // ACCESS_TOKEN is stored in Redux state (memory)
}
