import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import styles from './current-date.style.module.scss'

const CurrentDate = () => {
	const [date, setDate] = useState<string | null>(null)
	const [time, setTime] = useState<string | null>(null)

	useEffect(() => {
		setInterval(() => {
			const genDate = dayjs()
			setDate(genDate.format('DD.MM.YYYY'))
			setTime(genDate.format('HH:mm:ss'))
		}, 1000)
	}, [])

	if (!time || !date) {
		return <div className={styles.currentDate} />
	}

	return (
		<div className={styles.currentDate}>
			<span className={styles.currentDate__time}>{time}</span>
			<span className={styles.currentDate__date}>{date}</span>
		</div>
	)
}

export default CurrentDate
