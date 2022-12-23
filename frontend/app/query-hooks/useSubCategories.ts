import { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import {
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

	return useMutation<IDefaultResponse, AxiosError, ICreateSubCategory>(
		['create-sub-category'],
		SubCategoryService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
				toast.success(data.message)
			}
		}
	)
}
