import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AdminAuth, AdminLoginInput, AdminStats, Cart, CartItemInput, CartItemUpdate, GetCartParams, GetWishlistParams, HealthStatus, ListProductsParams, Order, OrderInput, Product, ProductInput, ProductListResponse, ProductUpdate, Review, SiteSettings, SiteSettingsUpdate, WishlistInput } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListProductsUrl: (params?: ListProductsParams) => string;
/**
 * @summary List products with optional filters
 */
export declare const listProducts: (params?: ListProductsParams, options?: RequestInit) => Promise<ProductListResponse>;
export declare const getListProductsQueryKey: (params?: ListProductsParams) => readonly ["/api/products", ...ListProductsParams[]];
export declare const getListProductsQueryOptions: <TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(params?: ListProductsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProductsQueryResult = NonNullable<Awaited<ReturnType<typeof listProducts>>>;
export type ListProductsQueryError = ErrorType<unknown>;
/**
 * @summary List products with optional filters
 */
export declare function useListProducts<TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(params?: ListProductsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateProductUrl: () => string;
/**
 * @summary Create a new product (admin)
 */
export declare const createProduct: (productInput: ProductInput, options?: RequestInit) => Promise<Product>;
export declare const getCreateProductMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProduct>>, TError, {
        data: BodyType<ProductInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createProduct>>, TError, {
    data: BodyType<ProductInput>;
}, TContext>;
export type CreateProductMutationResult = NonNullable<Awaited<ReturnType<typeof createProduct>>>;
export type CreateProductMutationBody = BodyType<ProductInput>;
export type CreateProductMutationError = ErrorType<unknown>;
/**
* @summary Create a new product (admin)
*/
export declare const useCreateProduct: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProduct>>, TError, {
        data: BodyType<ProductInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createProduct>>, TError, {
    data: BodyType<ProductInput>;
}, TContext>;
export declare const getGetProductUrl: (id: number) => string;
/**
 * @summary Get product by ID
 */
export declare const getProduct: (id: number, options?: RequestInit) => Promise<Product>;
export declare const getGetProductQueryKey: (id: number) => readonly [`/api/products/${number}`];
export declare const getGetProductQueryOptions: <TData = Awaited<ReturnType<typeof getProduct>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductQueryResult = NonNullable<Awaited<ReturnType<typeof getProduct>>>;
export type GetProductQueryError = ErrorType<void>;
/**
 * @summary Get product by ID
 */
export declare function useGetProduct<TData = Awaited<ReturnType<typeof getProduct>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateProductUrl: (id: number) => string;
/**
 * @summary Update a product (admin)
 */
export declare const updateProduct: (id: number, productUpdate: ProductUpdate, options?: RequestInit) => Promise<Product>;
export declare const getUpdateProductMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProduct>>, TError, {
        id: number;
        data: BodyType<ProductUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateProduct>>, TError, {
    id: number;
    data: BodyType<ProductUpdate>;
}, TContext>;
export type UpdateProductMutationResult = NonNullable<Awaited<ReturnType<typeof updateProduct>>>;
export type UpdateProductMutationBody = BodyType<ProductUpdate>;
export type UpdateProductMutationError = ErrorType<unknown>;
/**
* @summary Update a product (admin)
*/
export declare const useUpdateProduct: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProduct>>, TError, {
        id: number;
        data: BodyType<ProductUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateProduct>>, TError, {
    id: number;
    data: BodyType<ProductUpdate>;
}, TContext>;
export declare const getDeleteProductUrl: (id: number) => string;
/**
 * @summary Delete a product (admin)
 */
export declare const deleteProduct: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteProductMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteProduct>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteProduct>>, TError, {
    id: number;
}, TContext>;
export type DeleteProductMutationResult = NonNullable<Awaited<ReturnType<typeof deleteProduct>>>;
export type DeleteProductMutationError = ErrorType<unknown>;
/**
* @summary Delete a product (admin)
*/
export declare const useDeleteProduct: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteProduct>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteProduct>>, TError, {
    id: number;
}, TContext>;
export declare const getGetFeaturedProductsUrl: () => string;
/**
 * @summary Get featured products for homepage
 */
export declare const getFeaturedProducts: (options?: RequestInit) => Promise<Product[]>;
export declare const getGetFeaturedProductsQueryKey: () => readonly ["/api/products/featured"];
export declare const getGetFeaturedProductsQueryOptions: <TData = Awaited<ReturnType<typeof getFeaturedProducts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getFeaturedProducts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetFeaturedProductsQueryResult = NonNullable<Awaited<ReturnType<typeof getFeaturedProducts>>>;
export type GetFeaturedProductsQueryError = ErrorType<unknown>;
/**
 * @summary Get featured products for homepage
 */
export declare function useGetFeaturedProducts<TData = Awaited<ReturnType<typeof getFeaturedProducts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetBestSellersUrl: () => string;
/**
 * @summary Get best-selling products
 */
export declare const getBestSellers: (options?: RequestInit) => Promise<Product[]>;
export declare const getGetBestSellersQueryKey: () => readonly ["/api/products/best-sellers"];
export declare const getGetBestSellersQueryOptions: <TData = Awaited<ReturnType<typeof getBestSellers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBestSellers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getBestSellers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetBestSellersQueryResult = NonNullable<Awaited<ReturnType<typeof getBestSellers>>>;
export type GetBestSellersQueryError = ErrorType<unknown>;
/**
 * @summary Get best-selling products
 */
export declare function useGetBestSellers<TData = Awaited<ReturnType<typeof getBestSellers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBestSellers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetRelatedProductsUrl: (id: number) => string;
/**
 * @summary Get related products
 */
export declare const getRelatedProducts: (id: number, options?: RequestInit) => Promise<Product[]>;
export declare const getGetRelatedProductsQueryKey: (id: number) => readonly [`/api/products/${number}/related`];
export declare const getGetRelatedProductsQueryOptions: <TData = Awaited<ReturnType<typeof getRelatedProducts>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRelatedProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRelatedProducts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRelatedProductsQueryResult = NonNullable<Awaited<ReturnType<typeof getRelatedProducts>>>;
export type GetRelatedProductsQueryError = ErrorType<unknown>;
/**
 * @summary Get related products
 */
export declare function useGetRelatedProducts<TData = Awaited<ReturnType<typeof getRelatedProducts>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRelatedProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetCartUrl: (params: GetCartParams) => string;
/**
 * @summary Get cart by session
 */
export declare const getCart: (params: GetCartParams, options?: RequestInit) => Promise<Cart>;
export declare const getGetCartQueryKey: (params?: GetCartParams) => readonly ["/api/cart", ...GetCartParams[]];
export declare const getGetCartQueryOptions: <TData = Awaited<ReturnType<typeof getCart>>, TError = ErrorType<unknown>>(params: GetCartParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCart>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCart>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCartQueryResult = NonNullable<Awaited<ReturnType<typeof getCart>>>;
export type GetCartQueryError = ErrorType<unknown>;
/**
 * @summary Get cart by session
 */
export declare function useGetCart<TData = Awaited<ReturnType<typeof getCart>>, TError = ErrorType<unknown>>(params: GetCartParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCart>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAddToCartUrl: () => string;
/**
 * @summary Add item to cart
 */
export declare const addToCart: (cartItemInput: CartItemInput, options?: RequestInit) => Promise<Cart>;
export declare const getAddToCartMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addToCart>>, TError, {
        data: BodyType<CartItemInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addToCart>>, TError, {
    data: BodyType<CartItemInput>;
}, TContext>;
export type AddToCartMutationResult = NonNullable<Awaited<ReturnType<typeof addToCart>>>;
export type AddToCartMutationBody = BodyType<CartItemInput>;
export type AddToCartMutationError = ErrorType<unknown>;
/**
* @summary Add item to cart
*/
export declare const useAddToCart: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addToCart>>, TError, {
        data: BodyType<CartItemInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof addToCart>>, TError, {
    data: BodyType<CartItemInput>;
}, TContext>;
export declare const getUpdateCartItemUrl: (sessionId: string, productId: number) => string;
/**
 * @summary Update cart item quantity
 */
export declare const updateCartItem: (sessionId: string, productId: number, cartItemUpdate: CartItemUpdate, options?: RequestInit) => Promise<Cart>;
export declare const getUpdateCartItemMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCartItem>>, TError, {
        sessionId: string;
        productId: number;
        data: BodyType<CartItemUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateCartItem>>, TError, {
    sessionId: string;
    productId: number;
    data: BodyType<CartItemUpdate>;
}, TContext>;
export type UpdateCartItemMutationResult = NonNullable<Awaited<ReturnType<typeof updateCartItem>>>;
export type UpdateCartItemMutationBody = BodyType<CartItemUpdate>;
export type UpdateCartItemMutationError = ErrorType<unknown>;
/**
* @summary Update cart item quantity
*/
export declare const useUpdateCartItem: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCartItem>>, TError, {
        sessionId: string;
        productId: number;
        data: BodyType<CartItemUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateCartItem>>, TError, {
    sessionId: string;
    productId: number;
    data: BodyType<CartItemUpdate>;
}, TContext>;
export declare const getRemoveFromCartUrl: (sessionId: string, productId: number) => string;
/**
 * @summary Remove item from cart
 */
export declare const removeFromCart: (sessionId: string, productId: number, options?: RequestInit) => Promise<Cart>;
export declare const getRemoveFromCartMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFromCart>>, TError, {
        sessionId: string;
        productId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof removeFromCart>>, TError, {
    sessionId: string;
    productId: number;
}, TContext>;
export type RemoveFromCartMutationResult = NonNullable<Awaited<ReturnType<typeof removeFromCart>>>;
export type RemoveFromCartMutationError = ErrorType<unknown>;
/**
* @summary Remove item from cart
*/
export declare const useRemoveFromCart: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFromCart>>, TError, {
        sessionId: string;
        productId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof removeFromCart>>, TError, {
    sessionId: string;
    productId: number;
}, TContext>;
export declare const getCreateOrderUrl: () => string;
/**
 * @summary Place an order
 */
export declare const createOrder: (orderInput: OrderInput, options?: RequestInit) => Promise<Order>;
export declare const getCreateOrderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
        data: BodyType<OrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
    data: BodyType<OrderInput>;
}, TContext>;
export type CreateOrderMutationResult = NonNullable<Awaited<ReturnType<typeof createOrder>>>;
export type CreateOrderMutationBody = BodyType<OrderInput>;
export type CreateOrderMutationError = ErrorType<unknown>;
/**
* @summary Place an order
*/
export declare const useCreateOrder: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
        data: BodyType<OrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createOrder>>, TError, {
    data: BodyType<OrderInput>;
}, TContext>;
export declare const getListOrdersUrl: () => string;
/**
 * @summary List all orders (admin)
 */
export declare const listOrders: (options?: RequestInit) => Promise<Order[]>;
export declare const getListOrdersQueryKey: () => readonly ["/api/orders"];
export declare const getListOrdersQueryOptions: <TData = Awaited<ReturnType<typeof listOrders>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListOrdersQueryResult = NonNullable<Awaited<ReturnType<typeof listOrders>>>;
export type ListOrdersQueryError = ErrorType<unknown>;
/**
 * @summary List all orders (admin)
 */
export declare function useListOrders<TData = Awaited<ReturnType<typeof listOrders>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listOrders>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetWishlistUrl: (params: GetWishlistParams) => string;
/**
 * @summary Get wishlist by session
 */
export declare const getWishlist: (params: GetWishlistParams, options?: RequestInit) => Promise<Product[]>;
export declare const getGetWishlistQueryKey: (params?: GetWishlistParams) => readonly ["/api/wishlist", ...GetWishlistParams[]];
export declare const getGetWishlistQueryOptions: <TData = Awaited<ReturnType<typeof getWishlist>>, TError = ErrorType<unknown>>(params: GetWishlistParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWishlist>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWishlist>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWishlistQueryResult = NonNullable<Awaited<ReturnType<typeof getWishlist>>>;
export type GetWishlistQueryError = ErrorType<unknown>;
/**
 * @summary Get wishlist by session
 */
export declare function useGetWishlist<TData = Awaited<ReturnType<typeof getWishlist>>, TError = ErrorType<unknown>>(params: GetWishlistParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWishlist>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAddToWishlistUrl: () => string;
/**
 * @summary Toggle product in wishlist
 */
export declare const addToWishlist: (wishlistInput: WishlistInput, options?: RequestInit) => Promise<Product[]>;
export declare const getAddToWishlistMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addToWishlist>>, TError, {
        data: BodyType<WishlistInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addToWishlist>>, TError, {
    data: BodyType<WishlistInput>;
}, TContext>;
export type AddToWishlistMutationResult = NonNullable<Awaited<ReturnType<typeof addToWishlist>>>;
export type AddToWishlistMutationBody = BodyType<WishlistInput>;
export type AddToWishlistMutationError = ErrorType<unknown>;
/**
* @summary Toggle product in wishlist
*/
export declare const useAddToWishlist: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addToWishlist>>, TError, {
        data: BodyType<WishlistInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof addToWishlist>>, TError, {
    data: BodyType<WishlistInput>;
}, TContext>;
export declare const getListReviewsUrl: () => string;
/**
 * @summary List customer reviews
 */
export declare const listReviews: (options?: RequestInit) => Promise<Review[]>;
export declare const getListReviewsQueryKey: () => readonly ["/api/reviews"];
export declare const getListReviewsQueryOptions: <TData = Awaited<ReturnType<typeof listReviews>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listReviews>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listReviews>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListReviewsQueryResult = NonNullable<Awaited<ReturnType<typeof listReviews>>>;
export type ListReviewsQueryError = ErrorType<unknown>;
/**
 * @summary List customer reviews
 */
export declare function useListReviews<TData = Awaited<ReturnType<typeof listReviews>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listReviews>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAdminLoginUrl: () => string;
/**
 * @summary Admin login with password
 */
export declare const adminLogin: (adminLoginInput: AdminLoginInput, options?: RequestInit) => Promise<AdminAuth>;
export declare const getAdminLoginMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
        data: BodyType<AdminLoginInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
    data: BodyType<AdminLoginInput>;
}, TContext>;
export type AdminLoginMutationResult = NonNullable<Awaited<ReturnType<typeof adminLogin>>>;
export type AdminLoginMutationBody = BodyType<AdminLoginInput>;
export type AdminLoginMutationError = ErrorType<void>;
/**
* @summary Admin login with password
*/
export declare const useAdminLogin: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
        data: BodyType<AdminLoginInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof adminLogin>>, TError, {
    data: BodyType<AdminLoginInput>;
}, TContext>;
export declare const getGetAdminStatsUrl: () => string;
/**
 * @summary Get admin dashboard statistics
 */
export declare const getAdminStats: (options?: RequestInit) => Promise<AdminStats>;
export declare const getGetAdminStatsQueryKey: () => readonly ["/api/admin/stats"];
export declare const getGetAdminStatsQueryOptions: <TData = Awaited<ReturnType<typeof getAdminStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAdminStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAdminStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getAdminStats>>>;
export type GetAdminStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get admin dashboard statistics
 */
export declare function useGetAdminStats<TData = Awaited<ReturnType<typeof getAdminStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetSettingsUrl: () => string;
/**
 * @summary Get site settings (hero, footer, newsletter)
 */
export declare const getSettings: (options?: RequestInit) => Promise<SiteSettings>;
export declare const getGetSettingsQueryKey: () => readonly ["/api/settings"];
export declare const getGetSettingsQueryOptions: <TData = Awaited<ReturnType<typeof getSettings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSettingsQueryResult = NonNullable<Awaited<ReturnType<typeof getSettings>>>;
export type GetSettingsQueryError = ErrorType<unknown>;
/**
 * @summary Get site settings (hero, footer, newsletter)
 */
export declare function useGetSettings<TData = Awaited<ReturnType<typeof getSettings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateSettingsUrl: () => string;
/**
 * @summary Update site settings (admin)
 */
export declare const updateSettings: (siteSettingsUpdate: SiteSettingsUpdate, options?: RequestInit) => Promise<SiteSettings>;
export declare const getUpdateSettingsMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSettings>>, TError, {
        data: BodyType<SiteSettingsUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateSettings>>, TError, {
    data: BodyType<SiteSettingsUpdate>;
}, TContext>;
export type UpdateSettingsMutationResult = NonNullable<Awaited<ReturnType<typeof updateSettings>>>;
export type UpdateSettingsMutationBody = BodyType<SiteSettingsUpdate>;
export type UpdateSettingsMutationError = ErrorType<unknown>;
/**
* @summary Update site settings (admin)
*/
export declare const useUpdateSettings: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSettings>>, TError, {
        data: BodyType<SiteSettingsUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateSettings>>, TError, {
    data: BodyType<SiteSettingsUpdate>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map