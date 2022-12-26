import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { FC, PropsWithChildren } from 'react'
import styles from './confirm-dialog.style.module.scss'

interface Props {
	open: boolean
	title: string
	message: string | JSX.Element
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmDialog: FC<PropsWithChildren<Props>> = ({
	children,
	open,
	title,
	message,
	onConfirm,
	onCancel
}) => {
	return (
		<Dialog.Root open={open}>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} onClick={onCancel} />

				<Dialog.Content className={styles.dialogContent}>
					<Dialog.Title>{title}</Dialog.Title>

					<Dialog.Description>{message}</Dialog.Description>

					{children}

					<Dialog.Close className={styles.iconButton} onClick={onCancel}>
						<Cross2Icon />
					</Dialog.Close>

					<Dialog.Close onClick={onConfirm}>
						<button className={styles.confirmButton}>Да</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default ConfirmDialog
