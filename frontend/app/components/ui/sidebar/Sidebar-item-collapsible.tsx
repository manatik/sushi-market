import { ChevronRightIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import styles from './sidebar.style.module.scss'

interface Props {
	title: string
}

enum CollapseState {
	Closed = 'closed',
	Open = 'open'
}

const SidebarItemCollapsible: FC<PropsWithChildren<Props>> = ({ title, children }) => {
	const router = useRouter()
	const [collapse, setCollapse] = useState<CollapseState>(CollapseState.Closed)
	const isCollapsed = collapse === CollapseState.Closed

	const handleClick = () => {
		if (collapse === CollapseState.Closed) {
			setCollapse(CollapseState.Open)
		} else {
			setCollapse(CollapseState.Closed)
		}
	}

	useEffect(() => {
		if (Array.isArray(children)) {
			for (const child of children) {
				if (router.asPath === location.pathname) {
					setCollapse(CollapseState.Open)
				}
			}
		}
	}, [children, router.asPath])

	return (
		<div className={styles.sidebarItemCollapsible}>
			<div
				className={classNames(styles.sidebarItem, styles.sidebarItemCollapsible__title)}
				data-state={collapse}
				onClick={handleClick}
			>
				<ChevronRightIcon
					className={classNames(styles.sidebarItem__icon, styles.sidebarItemCollapsible__icon)}
				/>
				<span className={styles.sidebarItem__link}>{title}</span>
			</div>

			{!isCollapsed && <div className={styles.sidebarItemCollapsible__collapse}>{children}</div>}
		</div>
	)
}

export default SidebarItemCollapsible