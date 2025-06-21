import { useParams } from 'react-router-dom';
import type { GetCategoriesParams } from './../../apis/categories.api';
import { categoriesApi } from './../../apis/categories.api';
import { useQuery } from '@tanstack/react-query';

export const useCategories = (params?: GetCategoriesParams) => {
	const result = useQuery({
		queryKey: [categoriesApi.getCategories.name, params],
		queryFn: () => categoriesApi.getCategories(params),
	});
	const { data: categoriesResponse } = result;

	const categories = categoriesResponse?.data.items || [];
	const pagination = categoriesResponse?.data;

	return {
		...result,
		categories,
		pagination,
	};
};

export const useCategory = () => {
	const { categoryId } = useParams();

	const result = useQuery({
		queryKey: [categoriesApi.getCategory.name, categoryId],
		queryFn: () => categoriesApi.getCategory(categoryId as string),
	});

	const { data: category } = result;

	return {
		...result,
		category,
	};
};