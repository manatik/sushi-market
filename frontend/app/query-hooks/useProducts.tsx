import type { IDefaultResponse } from '@common-types/default-response.types'
import { IProductFilters } from '@common-types/product.types'
import type {
	ICreateProduct,
	IProduct,
	IProductResponse,
	IUpdateProduct
} from '@common-types/product.types'
import { ProductService } from '@services/product.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useProducts = (onlyHidden: boolean, filters?: IProductFilters) =>
	useQuery<IProductResponse, AxiosError<any>, IProduct[]>(
		['products', onlyHidden, filters],
		() => ProductService.all(onlyHidden, filters),
		{
			select: data => data.products,
			refetchInterval: 15000
		}
	)

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

export const useUpdateProduct = () => {
	const queryClient = useQueryClient()

	return useMutation<
		IDefaultResponse,
		AxiosError<IDefaultResponse>,
		{ id: string; dto: IUpdateProduct }
	>(['update-product'], ProductService.update, {
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
	})
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
