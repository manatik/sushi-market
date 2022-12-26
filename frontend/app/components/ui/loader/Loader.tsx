import { UpdateIcon } from '@radix-ui/react-icons'
import { CSSProperties, FC } from 'react'
import styles from './loader.style.module.scss'

type Size = 'small' | 'medium' | 'large'
type Direction = 'horizontal' | 'vertical'

interface Props {
	text?: string
	size?: Size
	direction?: Direction
}

const Loader: FC<Props> = ({ size = 'small', text, direction = 'vertical' }) => {
	const sizes: Record<Size, number> = {
		large: 21,
		medium: 18,
		small: 15
	}

	const currentSize = sizes[size]
	const currentFontSize = sizes[size] - 5
	const currentDirection: CSSProperties =
		direction === 'vertical' ? { flexDirection: 'column' } : {}

	return (
		<div className={styles.loader} style={currentDirection}>
			{text && (
				<span style={{ fontSize: currentFontSize }} className={styles.loader__text}>
					{text}
				</span>
			)}

			<UpdateIcon
				style={{ width: currentSize, height: currentSize }}
				className={styles.loader__icon}
			/>
		</div>
	)
}

export default Loader
