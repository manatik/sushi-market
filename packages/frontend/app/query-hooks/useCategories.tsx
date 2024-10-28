import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { CategoryService } from '@services/category.service'

import type {
	ICategory,
	ICategoryFilters,
	ICategoryResponse,
	ICreateCategory,
	IUpdateCategory
} from '@common-types/category.types'
import type { UpdateQueryHook } from '@common-types/common.types'
import type { IDefaultResponse } from '@common-types/default-response.types'

export const useCategories = (filters?: ICategoryFilters) =>
	useQuery<ICategoryResponse, AxiosError<any>, ICategory[]>(
		['categories', filters],
		() => CategoryService.all(filters),
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

export const useUpdateCategory = ({ isShowToast }: UpdateQueryHook = { isShowToast: true }) => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; dto: IUpdateCategory }>(
		['update-category'],
		CategoryService.update,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['categories'] })
				if (isShowToast) {
					toast.success(data.message)
				}
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
