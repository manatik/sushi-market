import ConfirmDialog from '@components/ui/confirm-dialog/Confirm-dialog'
import { useState } from 'react'
const useConfirm = (title: string, message: string | JSX.Element) => {
	const [promise, setPromise] = useState<null | any>(null)

	const confirm = () =>
		new Promise<boolean>((resolve, reject) => {
			setPromise({ resolve })
		})

	const handleClose = () => {
		setPromise(null)
	}

	const handleConfirm = () => {
		promise?.resolve(true)
		handleClose()
	}

	const handleCancel = () => {
		promise?.resolve(false)
		handleClose()
	}

	const ConfirmationDialog = () => (
		<ConfirmDialog
			onConfirm={handleConfirm}
			onCancel={handleCancel}
			open={promise !== null}
			title={title}
			message={message}
		/>
	)
	return { Dialog: ConfirmationDialog, onConfirm: confirm }
}

export default useConfirm
