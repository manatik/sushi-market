import dayjs from 'dayjs'

export const booleanYesOrNot = (value: boolean) => (value ? 'Да' : 'Нет')
export const dateToFormatDate = (date?: string | Date | null) =>
	!date ? '' : dayjs(date).format('DD.MM.YYYY HH:mm')
