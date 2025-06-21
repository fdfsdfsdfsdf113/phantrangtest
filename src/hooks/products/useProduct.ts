import { productsApi, type GetProductsParams } from '@/apis/products.api';
import type { BaseResponse } from '@/types/common.type';
import type { Product } from '@/types/product.type';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useProduct = (params?: GetProductsParams) => {
	const result = useQuery({
		queryKey: [productsApi.getProducts.name, params],
		queryFn: () => productsApi.getProducts(params),
	});
	const { data: productsResponse } = result;

	const products = productsResponse?.data.items || [];
	const pagination = productsResponse?.data;

	return {
		...result,
		products,
		pagination,
	};
};

export const useProd = () => {
    const { productId } = useParams();

    const { data: product } = useQuery<BaseResponse<Product>>({
        queryKey: [productsApi.getProduct.name, productId],
        queryFn: () => productsApi.getProduct(productId!),
        enabled: !!productId,
    });

    return { product};
};
