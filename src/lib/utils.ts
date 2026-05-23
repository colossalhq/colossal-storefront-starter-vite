import { formatPrice, type SimpleProduct } from "@colossal-sh/storefront-sdk";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatSimpleProductPrice(product: SimpleProduct): string | null {
	if (product.unitAmount === null) return null;
	const formatted = formatPrice(product.unitAmount, product.currency);
	return product.recurringInterval
		? `${formatted}/${product.recurringInterval.toLowerCase()}`
		: formatted;
}
