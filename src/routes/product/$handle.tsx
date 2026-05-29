import { createFileRoute } from "@tanstack/react-router";
import { ProductDetails } from "#/components/system/product-detail";
import { STORE_UID } from "#/lib/constants";
import { productQuery } from "#/lib/queries";
import { canonicalHead, productJsonLd, socialMeta } from "#/lib/seo";

export const Route = createFileRoute("/product/$handle")({
	loader: ({ params, context: { queryClient } }) =>
		queryClient.ensureQueryData(productQuery(STORE_UID, params.handle)),
	head: ({ params, loaderData }) => {
		const product = loaderData?.productByHandle;
		const path = `/product/${params.handle}`;
		const base = canonicalHead(path);
		return {
			...base,
			meta: [
				...base.meta,
				...(product
					? socialMeta({
							title: product.name,
							description: product.description,
							type: "product",
						})
					: []),
			],
			scripts: product ? [productJsonLd(product, path)] : [],
		};
	},
	component: ProductPage,
});

function ProductPage() {
	return <ProductDetails />;
}
