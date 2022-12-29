import * as RadixDialog from '@radix-ui/react-dialog'
import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import styles from './dialog.style.module.scss'

interface Props {
	isOpen: boolean
	onClose: () => void
	position?: 'left' | 'right' | 'center'
}

const Dialog: FC<PropsWithChildren<Props>> = ({
	children,
	isOpen,
	onClose,
	position = 'center'
}) => {
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

				<RadixDialog.Content className={classNames(styles.dialogContent, positionStyle)}>
					<RadixDialog.Title>Edit profile</RadixDialog.Title>

					<RadixDialog.Description>
						Make changes to your profile here. Click save when done.
					</RadixDialog.Description>

					<RadixDialog.Close asChild>
						<button onClick={onClose}>Save changes</button>
					</RadixDialog.Close>

					<RadixDialog.Close asChild>
						<button>lol</button>
					</RadixDialog.Close>
				</RadixDialog.Content>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	)
}

export default Dialog
