import logo from 'assets/logo.png'
import classNames from 'classnames'
import Image from 'next/image'
import React, { FC, PropsWithChildren } from 'react'
import styles from './sidebar.style.module.scss'

export interface Props {
	className?: string
}

const Sidebar: FC<PropsWithChildren<Props>> = ({ children, className }) => {
	return (
		<div className={classNames(styles.sidebar, className)}>
			<div className={styles.sidebar__logo}>
				<Image src={logo} width={120} height={30} alt={'logo'} />
			</div>

			<div className={styles.sidebar__items}>{children}</div>
		</div>
	)
}

export default Sidebar
