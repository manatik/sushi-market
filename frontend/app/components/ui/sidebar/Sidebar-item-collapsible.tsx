import { ChevronRightIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

import styles from './sidebar.style.module.scss'

interface Props {
	title: string
	className?: string
	onClick?: () => void
	defaultValue?: CollapseState
}

enum CollapseState {
	Closed = 'closed',
	Open = 'open'
}

const SidebarItemCollapsible: FC<PropsWithChildren<Props>> = ({
	title,
	children,
	className,
	onClick,
	defaultValue = CollapseState.Closed
}) => {
	const [collapse, setCollapse] = useState<CollapseState>(defaultValue)

	const handleClick = () => {
		if (collapse === CollapseState.Closed) {
			setCollapse(CollapseState.Open)
		} else {
			setCollapse(CollapseState.Closed)
		}

		onClick?.()
	}

	useEffect(() => {
		if (Array.isArray(children) && children.some(child => child.props.path === location.pathname)) {
			setCollapse(CollapseState.Open)
		}
	}, [children])

	return (
		<div className={classNames(styles.sidebarItemCollapsible, className)}>
			<div
				className={classNames(styles.sidebarItem, styles.sidebarItemCollapsible__title)}
				data-state={collapse}
				onClick={handleClick}
			>
				<ChevronRightIcon className={classNames(styles.sidebarItem__icon, styles.sidebarItemCollapsible__icon)} />
				<span className={styles.sidebarItem__link}>{title}</span>
			</div>

			<div className={styles.sidebarItemCollapsible__collapse} data-state={collapse}>
				{children}
			</div>
		</div>
	)
}

export default SidebarItemCollapsible
