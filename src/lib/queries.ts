import {
	fetchStore,
	fetchStoreProductByHandle,
} from "@colossal-sh/storefront-sdk";

export function storeQuery(uid: string) {
	return {
		queryKey: ["storefrontProject", uid, null],
		queryFn: () => fetchStore({ uid }),
	};
}

export function productQuery(storeUid: string, handle: string) {
	return {
		queryKey: ["productByHandle", storeUid, handle],
		queryFn: () => fetchStoreProductByHandle(storeUid, handle),
	};
}
