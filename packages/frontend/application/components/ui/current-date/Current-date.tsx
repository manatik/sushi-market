import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import Loader from '@components/ui/loader/Loader'

import styles from './current-date.style.module.scss'

const CurrentDate = () => {
	const [date, setDate] = useState<string | null>(null)
	const [time, setTime] = useState<string | null>(null)

	useEffect(() => {
		const interval = setInterval(() => {
			const genDate = dayjs()
			setDate(genDate.format('DD.MM.YYYY'))
			setTime(genDate.format('HH:mm:ss'))
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	if (!time || !date) {
		return (
			<div className={styles.currentDate}>
				<Loader size={'medium'} text={'Синхр.'} direction={'horizontal'} />
			</div>
		)
	}

	return (
		<div className={styles.currentDate}>
			<span className={styles.currentDate__time}>{time}</span>
			<span className={styles.currentDate__date}>{date}</span>
		</div>
	)
}

export default CurrentDate
