import { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import { ICreateProduct, IProduct, IProductResponse } from '@common-types/product.types'
import { ProductService } from '@services/product.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useProducts = () =>
	useQuery<IProductResponse, AxiosError<any>, IProduct[]>(['products'], ProductService.all, {
		select: data => data.products,
		refetchInterval: 15000
	})

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError, ICreateProduct>(
		['create-product'],
		ProductService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['products'] })
				toast.success(data.message)
			}
		}
	)
}
