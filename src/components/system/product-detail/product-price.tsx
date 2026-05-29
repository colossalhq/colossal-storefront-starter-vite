import {
	getFormattedProductPrice,
	useStoreProductByHandle,
} from "@colossal-sh/storefront-sdk";
import { useParams } from "@tanstack/react-router";
import { STORE_UID } from "#/lib/constants";

export function ProductPrice() {
	const { handle } = useParams({ strict: false }) as { handle: string };
	const { data } = useStoreProductByHandle(STORE_UID, handle);
	const product = data?.productByHandle;

	if (!product) return null;

	const formattedPrice = getFormattedProductPrice(product);
	if (!formattedPrice) return null;

	return (
		<div>
			<p
				className="text-2xl font-semibold"
				data-editable-entity="product"
				data-editable-id={product.uid}
				data-editable-field="price"
			>
				{formattedPrice}
			</p>
		</div>
	);
}
