import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A shorthand for `twMerge(clsx(...inputs))` that merges a list of classnames into a single string.
 * @param inputs - A list of classnames, or functions that return classnames.
 * @returns A merged string of all the classnames.
 * @example
 * cn("text-gray-900", "hover:text-gray-700") // "text-gray-900 hover:text-gray-700"
 * cn("text-gray-900", () => "hover:text-gray-700") // "text-gray-900 hover:text-gray-700"
 * cn(["text-gray-900", "hover:text-gray-700"]) // "text-gray-900 hover:text-gray-700"
 * cn([[["text-gray-900", "hover:text-gray-700"]]]) // "text-gray-900 hover:text-gray-700"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
