import {
	useCartContext,
	useStoreProductByHandle,
} from "@colossal-sh/storefront-sdk";
import { useParams } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "#/components/ui/button";
import { STORE_UID } from "#/lib/constants";

export function ProductAddToCart() {
	const { handle } = useParams({ strict: false }) as { handle: string };
	const { data } = useStoreProductByHandle(STORE_UID, handle);
	const { addItem } = useCartContext();
	const product = data?.productByHandle;

	if (!product) return null;

	return (
		<div>
			<Button
				size="lg"
				className="w-full gap-2 text-sm cursor-pointer"
				onClick={() => addItem(product.uid)}
			>
				<ShoppingBag className="h-4 w-4" />
				Add to Bag
			</Button>
		</div>
	);
}
