import { ChevronRightIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import styles from './sidebar.style.module.scss'

interface Props {
	title: string
	className?: string
	onClick?: () => void
}

enum CollapseState {
	Closed = 'closed',
	Open = 'open'
}

const SidebarItemCollapsible: FC<PropsWithChildren<Props>> = ({
	title,
	children,
	className,
	onClick
}) => {
	const router = useRouter()
	const [collapse, setCollapse] = useState<CollapseState>(CollapseState.Closed)

	const handleClick = () => {
		if (collapse === CollapseState.Closed) {
			setCollapse(CollapseState.Open)
		} else {
			setCollapse(CollapseState.Closed)
		}

		onClick?.()
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
		<div className={classNames(styles.sidebarItemCollapsible, className)}>
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

			<div className={styles.sidebarItemCollapsible__collapse} data-state={collapse}>
				{children}
			</div>
		</div>
	)
}

export default SidebarItemCollapsible
