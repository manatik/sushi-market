import { UpdateIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import styles from './button-loading.style.module.scss'

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	isLoading: boolean
}

const ButtonLoading: FC<Props> = ({ className, isLoading, children, ...props }) => {
	return (
		<button {...props} className={classNames(styles.button, className)}>
			{isLoading === undefined || !isLoading ? children : <UpdateIcon className={styles.button__icon} />}
		</button>
	)
}

export default ButtonLoading
