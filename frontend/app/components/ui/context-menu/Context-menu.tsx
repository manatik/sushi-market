import { ContextMenuItemProps } from '@radix-ui/react-context-menu'
import * as RadixContextMenu from '@radix-ui/react-context-menu'
import { FC, PropsWithChildren } from 'react'

import styles from './context-menu.style.module.scss'

interface DotNotation {
	Title: typeof Title
	Item: typeof Item
	Content: typeof Content
}

const ContextMenu: FC<PropsWithChildren> & DotNotation = ({ children }) => {
	return <RadixContextMenu.Root>{children}</RadixContextMenu.Root>
}

const Title: FC<PropsWithChildren> = ({ children }) => {
	return <RadixContextMenu.Trigger>{children}</RadixContextMenu.Trigger>
}

const Content: FC<PropsWithChildren> = ({ children }) => {
	return (
		<RadixContextMenu.Portal>
			<RadixContextMenu.Content className={styles.contextMenu}>{children}</RadixContextMenu.Content>
		</RadixContextMenu.Portal>
	)
}

const Item: FC<PropsWithChildren<ContextMenuItemProps>> = ({ children, ...props }) => {
	return (
		<RadixContextMenu.Item {...props} className={styles.contextMenu__item}>
			{children}
		</RadixContextMenu.Item>
	)
}

ContextMenu.Item = Item
ContextMenu.Title = Title
ContextMenu.Content = Content

export default ContextMenu
