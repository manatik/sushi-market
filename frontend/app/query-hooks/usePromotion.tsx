import type { IDefaultResponse } from '@common-types/default-response.types'
import type {
	ICreatePromotion,
	IPromotion,
	IPromotionResponse
} from '@common-types/promotion.types'
import { PromotionService } from '@services/promotion.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const usePromotions = () =>
	useQuery<IPromotionResponse, AxiosError, IPromotion[]>(['promotions'], PromotionService.all, {
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
