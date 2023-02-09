import { IconProps } from '@radix-ui/react-icons/dist/types'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { ComponentType, FC, useEffect, useState } from 'react'

import Link from '@components/ui/link/Link'
import styles from '@components/ui/sidebar/sidebar.style.module.scss'

interface Props {
	path: string
	Icon?: ComponentType<IconProps>
	label: string
	className?: string
	activeClassName?: string
}

const SidebarItem: FC<Props> = ({ path, label, Icon, className, activeClassName }) => {
	const { asPath, isReady } = useRouter()
	const [isActiveItem, setIsActiveItem] = useState<boolean>(false)
	const activeItemClass = activeClassName || styles.sidebarItem_active

	useEffect(() => {
		if (isReady) {
			const linkPathname = new URL(path, location.href).pathname
			const activePathname = new URL(asPath, location.href).pathname

			setIsActiveItem(linkPathname === activePathname)
		}
	}, [asPath, isReady, path])

	return (
		<div className={classNames(styles.sidebarItem, { [activeItemClass]: isActiveItem }, className)}>
			{Icon && <Icon className={styles.sidebarItem__icon} />}

			<Link className={styles.sidebarItem__link} href={path}>
				{label}
			</Link>
		</div>
	)
}

export default SidebarItem
