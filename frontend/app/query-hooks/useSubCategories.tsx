import type { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import type {
	ICreateSubCategory,
	ISubCategory,
	ISubCategoryResponse
} from '@common-types/sub-category.types'
import { SubCategoryService } from '@services/sub-category.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useSubCategories = () =>
	useQuery<ISubCategoryResponse, AxiosError<any>, ISubCategory[]>(
		['sub-categories'],
		SubCategoryService.all,
		{
			select: data => data.subCategories,
			staleTime: 15000,
			refetchInterval: 15000
		}
	)

export const useCreateSubCategory = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, ICreateSubCategory>(
		['create-sub-category'],
		SubCategoryService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
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

export const useUpdateSubCategory = () => {
	const queryClient = useQueryClient()

	return useMutation<
		IDefaultResponse,
		AxiosError<IDefaultResponse>,
		{ id: string; dto: ICreateSubCategory }
	>(['update-sub-category'], SubCategoryService.update, {
		onSuccess(data) {
			queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
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

export const useRemoveSubCategory = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError, string>(
		['remove-sub-category'],
		SubCategoryService.remove,
		{
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
			}
		}
	)
}