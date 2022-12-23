import { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import { ICreateIngredient, IIngredient, IIngredientResponse } from '@common-types/ingredient.types'
import { IngredientService } from '@services/ingredient.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useIngredients = () =>
	useQuery<IIngredientResponse, AxiosError<any>, IIngredient[]>(
		['ingredients'],
		IngredientService.all,
		{
			select: data => data.ingredients,
			refetchInterval: 15000,
			staleTime: 15000
		}
	)

export const useCreateIngredient = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError, ICreateIngredient>(
		['create-ingredient'],
		IngredientService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['ingredients'] })
				toast.success(data.message)
			}
		}
	)
}
