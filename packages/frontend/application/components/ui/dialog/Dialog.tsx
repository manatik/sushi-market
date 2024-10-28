import * as RadixDialog from '@radix-ui/react-dialog'
import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'

import styles from './dialog.style.module.scss'

interface Props extends PropsWithChildren {
	classname?: string
	isOpen: boolean
	onClose: () => void
	position?: 'left' | 'right' | 'center'
}

const Dialog: FC<Props> = ({ children, classname, isOpen, onClose, position = 'center' }) => {
	const dialogPositionsStyle = {
		center: styles.dialogContent__center,
		left: styles.dialogContent__left,
		right: styles.dialogContent__right
	}
	const positionStyle = dialogPositionsStyle[position]

	return (
		<RadixDialog.Root open={isOpen}>
			<RadixDialog.Portal>
				<RadixDialog.Overlay className={styles.overlay} onClick={onClose} />

				<RadixDialog.Content className={classNames(styles.dialogContent, positionStyle, classname)}>
					{children}
				</RadixDialog.Content>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	)
}

export default Dialog
