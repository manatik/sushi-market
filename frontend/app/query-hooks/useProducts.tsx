import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { ProductService } from '@services/product.service'

import type { UpdateQueryHook } from '@common-types/common.types'
import type { IDefaultResponse } from '@common-types/default-response.types'
import type {
	ICreateProduct,
	IProduct,
	IProductFilters,
	IProductResponse,
	IUpdateProduct
} from '@common-types/product.types'

export const useProducts = (filters?: IProductFilters) =>
	useQuery<IProductResponse, AxiosError<any>, IProduct[]>(['products', filters], () => ProductService.all(filters), {
		select: data => data.products,
		refetchInterval: 15000
	})

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, ICreateProduct>(
		['create-product'],
		ProductService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['products'] })
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

export const useSetProductIngredients = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; ingredients: string[] }>(
		['set-product-ingredients'],
		ProductService.setIngredients,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['products'] })
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

export const useUpdateProduct = ({ isShowToast }: UpdateQueryHook = { isShowToast: true }) => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; dto: IUpdateProduct }>(
		['update-product'],
		ProductService.update,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['products'] })
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

export const useRemoveProduct = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, string>(
		['remove-product'],
		ProductService.remove,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['products'] })
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
