import { useStoreProductByHandle } from "@colossal-sh/storefront-sdk";
import { useParams } from "@tanstack/react-router";
import { STORE_UID } from "#/lib/constants";
import { useState } from "react";
import { GalleryFeatured } from "./gallery-featured";
import { GalleryGrid } from "./gallery-grid";
import { GalleryStack } from "./gallery-stack";
import { ProductLightbox } from "./product-lightbox";

type GalleryVariant = "grid" | "stack" | "featured";

export function ProductGallery({
	variant = "grid",
}: {
	variant?: GalleryVariant;
}) {
	const { handle } = useParams({ strict: false }) as { handle: string };
	const { data } = useStoreProductByHandle(STORE_UID, handle);
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const product = data?.productByHandle;
	const productName = product?.name ?? "Product";

	const images =
		product?.defaultVariant?.media
			?.filter((m) => m.type === "IMAGE" && m.status === "READY" && m.url)
			.map((m) => m.url as string) ?? [];

	if (images.length === 0) {
		return (
			<div className="flex aspect-square items-center justify-center bg-muted text-muted-foreground">
				No images
			</div>
		);
	}

	const Gallery =
		variant === "stack"
			? GalleryStack
			: variant === "featured"
				? GalleryFeatured
				: GalleryGrid;

	return (
		<div
			data-component-type="ProductGallery"
			data-editor-variant={variant}
			data-editor-ignore
		>
			<Gallery
				images={images}
				productName={productName}
				onImageClick={setLightboxIndex}
			/>

			{lightboxIndex !== null && (
				<ProductLightbox
					images={images}
					initialIndex={lightboxIndex}
					productName={productName}
					onClose={() => setLightboxIndex(null)}
				/>
			)}
		</div>
	);
}
