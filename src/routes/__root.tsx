import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	useRouter,
} from "@tanstack/react-router";
import { PageEditor } from "@colossal-sh/visual-editor";
import type { ComponentRegistry, FieldLabels } from "@colossal-sh/visual-editor";
import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { ClientShell } from "#/components/system/shell/client-shell";
import { STORE_UID } from "#/lib/constants";
import { storeQuery } from "#/lib/queries";
import { organizationJsonLd, socialMeta } from "#/lib/seo";

const registry: ComponentRegistry = {
	ProductGallery: {
		label: "Gallery",
		sourceFile: "src/components/system/product-detail/index.tsx",
		variants: {
			propName: "variant",
			options: [
				{ value: "grid", label: "Grid" },
				{ value: "stack", label: "Stack" },
				{ value: "featured", label: "Featured" },
			],
		},
	},
};

const fieldLabels: FieldLabels = {
	product: {
		name: "Product Name",
		price: "Product Price",
		description: "Product Description",
		tagline: "Product Tagline",
	},
	store: {
		name: "Store Name",
	},
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(storeQuery(STORE_UID)),
	head: ({ loaderData }) => {
		const name = loaderData?.storeDetails?.name ?? "Colossal Store";
		return {
			meta: socialMeta({ title: name }),
			scripts: [organizationJsonLd(name)],
		};
	},
	component: RootComponent,
});

const parentOrigin = import.meta.env.VITE_PARENT_ORIGIN || null;

function RootComponent() {
	return (
		<ClientShell>
			<HeadContent />
			<PreviewEditor>
				<Outlet />
			</PreviewEditor>
		</ClientShell>
	);
}

function PreviewEditor({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();
	const router = useRouter();
	return (
		<PageEditor
			registry={registry}
			fieldLabels={fieldLabels}
			parentOrigin={parentOrigin}
			onRefresh={() => {
				queryClient.invalidateQueries();
				router.invalidate();
			}}
		>
			{children}
		</PageEditor>
	);
}
