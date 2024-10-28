import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { PromotionService } from '@services/promotion.service'

import { UpdateQueryHook } from '@common-types/common.types'
import type { IDefaultResponse } from '@common-types/default-response.types'
import type { ICreatePromotion, IPromotion, IPromotionResponse, IUpdatePromotion } from '@common-types/promotion.types'
import { IPromotionFilters } from '@common-types/promotion.types'

export const usePromotions = (filters?: IPromotionFilters) =>
	useQuery<IPromotionResponse, AxiosError, IPromotion[]>(['promotions', filters], () => PromotionService.all(filters), {
		select: data => data.promotions,
		refetchInterval: 15000,
		staleTime: 15000
	})

export const useCreatePromotion = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, ICreatePromotion>(
		['create-promotion'],
		PromotionService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['promotions'] })
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

export const useSetPromotionProducts = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; products: string[] }>(
		['set-promotion-products'],
		PromotionService.setProducts,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['promotions'] })
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

export const useUpdatePromotion = ({ isShowToast }: UpdateQueryHook = { isShowToast: true }) => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; dto: IUpdatePromotion }>(
		['update-promotion'],
		PromotionService.update,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['promotions'] })
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

export const useRemovePromotion = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, string>(
		['remove-promotion'],
		PromotionService.remove,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['promotions'] })
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

export const useAddPromotionPhotos = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; dto: any }>(
		['add-promotion-photos'],
		PromotionService.addPhotos,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['promotions'] })
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

export const useRemovePromotionPhoto = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; photoId: string }>(
		['remove-promotion-photo'],
		PromotionService.removePhoto,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['promotions'] })
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
