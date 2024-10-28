import { useState } from 'react'

enum ContextActions {
	EDIT,
	DETAILS
}

export const useContextMenu = <T = any>() => {
	const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined)
	const [action, setAction] = useState<ContextActions | undefined>(undefined)

	const handleAction = (item?: T, action?: ContextActions) => {
		setSelectedItem(item)
		setAction(action)
	}

	return {
		selectedItem,
		action,
		handleAction,
		ContextActions
	}
}
