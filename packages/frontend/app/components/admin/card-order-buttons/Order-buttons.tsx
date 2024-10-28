import Image from 'next/image'
import React, { FC } from 'react'

import arrow from '@assets/arrow.svg'

import styles from './order-buttons.style.module.scss'

interface Props {
	onLeftArrow: () => void
	onRightArrow: () => void
}

const OrderButtons: FC<Props> = ({ onLeftArrow, onRightArrow }) => {
	return (
		<div className={styles.buttons}>
			<button className={styles.button} onClick={e => onLeftArrow()}>
				<Image src={arrow} alt={'arrow-left'} width={12} height={12} />
			</button>
			<button className={styles.button} onClick={e => onRightArrow()}>
				<Image className={styles.button_previous} src={arrow} alt={'arrow-right'} width={12} height={12} />
			</button>
		</div>
	)
}

export default OrderButtons
