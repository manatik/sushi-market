import { ICategory, ICategoryResponse, ICreateCategory } from '@common-types/category.types'
import { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import { CategoryService } from '@services/category.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useCategories = () =>
	useQuery<ICategoryResponse, AxiosError<any>, ICategory[]>(['categories'], CategoryService.all, {
		select: data => data.categories,
		refetchInterval: 15000,
		staleTime: 15000
	})

export const useCreateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError, ICreateCategory>(
		['create-category'],
		CategoryService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['categories'] })
				toast.success(data.message)
			}
		}
	)
}
