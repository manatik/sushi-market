import dayjs from 'dayjs'

import type { ICategory } from '@common-types/category.types'
import type { IProduct } from '@common-types/product.types'
import type { IRole } from '@common-types/user.types'

export const booleanYesOrNot = (value: boolean) => (value ? 'Да' : 'Нет')
export const dateToFormatDate = (date?: string | Date) => dayjs(date).format('DD.MM.YYYY HH:mm')

export const currencyFormatter = (number: number) => {
	return Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0
	}).format(number)
}

export const userIsAdmin = (roles: IRole[] = []) => {
	return roles.some(role => role.name === 'admin')
}

export const productsGroupByCategory = (categories: ICategory[], products: IProduct[]) => {
	const array: [string, IProduct[]][] = []

	for (const category of categories) {
		const filtered = products.filter(product => product.category.name === category.name)

		if (filtered.length) {
			array.push([category.name, filtered])
		}
	}

	return array
}
