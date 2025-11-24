import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function utils(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
