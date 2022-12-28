import type {
	ICategory,
	ICategoryResponse,
	ICreateCategory,
	IUpdateCategory
} from '@common-types/category.types'
import type { IDefaultResponse } from '@common-types/default-response.types'
import { CategoryService } from '@services/category.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useCategories = (onlyHidden?: boolean) =>
	useQuery<ICategoryResponse, AxiosError<any>, ICategory[]>(
		['categories', onlyHidden],
		() => CategoryService.all(onlyHidden),
		{
			select: data => data.categories,
			refetchInterval: 15000,
			staleTime: 15000
		}
	)

export const useCreateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, ICreateCategory>(
		['create-category'],
		CategoryService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['categories'] })
				toast.success(data.message)
			},
			onError(error) {
				toast.error(
					<div>
						<p>{error.response?.data.message}</p>
						<p>{error.response?.data.error}</p>
					</div>
				)
			}
		}
	)
}

export const useUpdateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation<
		IDefaultResponse,
		AxiosError<IDefaultResponse>,
		{ id: string; dto: IUpdateCategory }
	>(['update-category'], CategoryService.update, {
		onSuccess(data) {
			queryClient.invalidateQueries({ queryKey: ['categories'] })
			toast.success(data.message)
		},
		onError(error) {
			toast.error(
				<div>
					<p>{error.response?.data.message}</p>
					<p>{error.response?.data.error}</p>
				</div>
			)
		}
	})
}

export const useRemoveCategory = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, string>(
		['remove-category'],
		CategoryService.remove,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['categories'] })
				toast.success(data.message)
			},
			onError(error) {
				toast.error(
					<div>
						<p>{error.response?.data.message}</p>
						<p>{error.response?.data.error}</p>
					</div>
				)
			}
		}
	)
}
