import type { IDefaultResponse } from '@common-types/default-response.types'
import {
	ICreateDistrict,
	IDistrict,
	IDistrictFilters,
	IDistrictResponse,
	IUpdateDistrict
} from '@common-types/district.types'
import { DistrictService } from '@services/district.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useDistricts = (filters?: IDistrictFilters) =>
	useQuery<IDistrictResponse, AxiosError<any>, IDistrict[]>(
		['districts', filters],
		() => DistrictService.all(filters),
		{
			select: data => data.districts,
			refetchInterval: 15000,
			staleTime: 15000
		}
	)

export const useCreateDistrict = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, ICreateDistrict>(
		['create-district'],
		DistrictService.create,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['districts'] })
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

export const useUpdateDistrict = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, { id: string; dto: IUpdateDistrict }>(
		['update-district'],
		DistrictService.update,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['districts'] })
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

export const useRemoveDistrict = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, string>(
		['remove-district'],
		DistrictService.remove,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['districts'] })
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
