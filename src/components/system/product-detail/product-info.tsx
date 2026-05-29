import { useStoreProductByHandle } from "@colossal-sh/storefront-sdk";
import { useParams } from "@tanstack/react-router";
import { STORE_UID } from "#/lib/constants";

export function ProductInfo() {
	const { handle } = useParams({ strict: false }) as { handle: string };
	const { data } = useStoreProductByHandle(STORE_UID, handle);
	const product = data?.productByHandle;

	if (!product) return null;

	return (
		<div>
			<h1
				className="font-display text-3xl font-bold sm:text-4xl"
				data-editable-entity="product"
				data-editable-id={product.uid}
				data-editable-field="name"
			>
				{product.name}
			</h1>

			{product.tagline && (
				<p
					className="mt-3 text-base text-muted-foreground"
					data-editable-entity="product"
					data-editable-id={product.uid}
					data-editable-field="tagline"
				>
					{product.tagline}
				</p>
			)}

			{product.description && (
				<p
					className="mt-6 leading-relaxed text-muted-foreground"
					data-editable-entity="product"
					data-editable-id={product.uid}
					data-editable-field="description"
				>
					{product.description}
				</p>
			)}
		</div>
	);
}
