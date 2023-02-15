import dayjs from 'dayjs'

export const booleanYesOrNot = (value: boolean) => (value ? 'Да' : 'Нет')
export const dateToFormatDate = (date?: string | Date) => dayjs(date).format('DD.MM.YYYY HH:mm')

export const currencyFormatter = (number: number) => {
	return Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0
	}).format(number)
}
