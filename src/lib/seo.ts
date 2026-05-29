const OG_IMAGE_PATH = "/opengraph.jpg";

function origin() {
	return typeof window === "undefined" ? "" : window.location.origin;
}

export function canonicalHead(path: string) {
	const url = `${origin()}${path}`;
	return {
		links: [{ rel: "canonical", href: url }],
		meta: [{ property: "og:url", content: url }],
	};
}

export function socialMeta({
	title,
	description,
	type = "website",
}: {
	title: string;
	description?: string | null;
	type?: string;
}) {
	const image = `${origin()}${OG_IMAGE_PATH}`;

	return [
		{ title },
		{ property: "og:title", content: title },
		{ property: "og:type", content: type },
		{ property: "og:image", content: image },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:image", content: image },
		...(description
			? [
					{ name: "description", content: description },
					{ property: "og:description", content: description },
					{ name: "twitter:description", content: description },
				]
			: []),
	];
}


function jsonLdScript(data: unknown) {
	return {
		type: "application/ld+json",
		children: JSON.stringify(data).replace(/</g, "\\u003c"),
	};
}

export function organizationJsonLd(name: string) {
	return jsonLdScript({
		"@context": "https://schema.org",
		"@type": "Organization",
		name,
		url: origin(),
		logo: `${origin()}/web-app-manifest-512x512.png`,
	});
}

interface JsonLdProduct {
	name: string;
	description?: string | null;
	currency: string;
	defaultPrice?: { unitAmount: number } | null;
	defaultVariant?: {
		media?: Array<{ url?: string | null; type: string; status: string }> | null;
	} | null;
}

function priceMajor(amountMinor: number, currency: string) {
	const digits =
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
		}).resolvedOptions().maximumFractionDigits ?? 2;
	return (amountMinor / 10 ** digits).toFixed(digits);
}

export function productJsonLd(product: JsonLdProduct, path: string) {
	const url = `${origin()}${path}`;

	const images = (product.defaultVariant?.media ?? [])
		.filter((m) => m.type === "IMAGE" && m.status === "READY" && m.url)
		.map((m) => m.url as string);

	return jsonLdScript({
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name,
		...(product.description ? { description: product.description } : {}),
		...(images.length > 0 ? { image: images } : {}),
		url,
		...(product.defaultPrice
			? {
					offers: {
						"@type": "Offer",
						price: priceMajor(product.defaultPrice.unitAmount, product.currency),
						priceCurrency: product.currency,
						availability: "https://schema.org/InStock",
						url,
					},
				}
			: {}),
	});
}
