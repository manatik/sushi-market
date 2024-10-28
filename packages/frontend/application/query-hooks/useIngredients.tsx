import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { IngredientService } from '@services/ingredient.service'

import type { UpdateQueryHook } from '@common-types/common.types'
import type { IDefaultResponse } from '@common-types/default-response.types'
import type {
	ICreateIngredient,
	IIngredient,
	IIngredientFilters,
	IIngredientResponse,
	IUpdateIngredient
} from '@common-types/ingredient.types'

export const useIngredients = (filters?: IIngredientFilters) =>
	useQuery<IIngredientResponse, AxiosError<any>, IIngredient[]>(
		['ingredients', filters],
		() => IngredientService.all(filters),
		{
			select: data => data.ingredients,
			refetchInterval: 15000,
			staleTime: 15000
		}
	)

export const useCreateIngredient = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, ICreateIngredient>(
		['create-ingredient'],
		IngredientService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['ingredients'] })
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

export const useUpdateIngredient = ({ isShowToast }: UpdateQueryHook = { isShowToast: true }) => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; dto: IUpdateIngredient }>(
		['update-ingredient'],
		IngredientService.update,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['ingredients'] })
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

export const useRemoveIngredient = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, string>(
		['remove-ingredient'],
		IngredientService.remove,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['ingredients'] })
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
