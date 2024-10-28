import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { PointOfSaleService } from '@services/point-of-sale.service'

import type { UpdateQueryHook } from '@common-types/common.types'
import type { IDefaultResponse } from '@common-types/default-response.types'
import type {
	ICreatePointOfSale,
	IPointOfSale,
	IPointOfSaleFilters,
	IPointOfSaleResponse,
	IUpdatePointOfSale
} from '@common-types/point-of-sale.types'

export const usePointsOfSale = (filters?: IPointOfSaleFilters) =>
	useQuery<IPointOfSaleResponse, AxiosError<any>, IPointOfSale[]>(
		['points-of-sale', filters],
		() => PointOfSaleService.all(filters),
		{
			select: data => data.pointsOfSale,
			refetchInterval: 15000,
			staleTime: 15000
		}
	)

export const useCreatePointOfSale = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, ICreatePointOfSale>(
		['create-point-of-sale'],
		PointOfSaleService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['points-of-sale'] })
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

export const useUpdatePointOfSale = ({ isShowToast }: UpdateQueryHook = { isShowToast: true }) => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; dto: IUpdatePointOfSale }>(
		['update-point-of-sale'],
		PointOfSaleService.update,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['points-of-sale'] })
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

export const useRemovePointOfSale = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, string>(
		['remove-point-of-sale'],
		PointOfSaleService.remove,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['points-of-sale'] })
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
