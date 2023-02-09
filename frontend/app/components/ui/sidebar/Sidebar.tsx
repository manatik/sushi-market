import classNames from 'classnames'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren } from 'react'

import { HOME_PATH } from '@utils/pages-paths'

import styles from './sidebar.style.module.scss'

export interface Props {
	className?: string
	icon: StaticImageData
}

const Sidebar: FC<PropsWithChildren<Props>> = ({ children, className, icon }) => {
	const router = useRouter()

	return (
		<div className={classNames(styles.sidebar, className)}>
			<div className={styles.sidebar__logo} onClick={() => router.push(HOME_PATH)}>
				<Image src={icon} width={120} height={30} alt={'logo'} />
			</div>

			<div className={styles.sidebar__items}>{children}</div>
		</div>
	)
}

export default Sidebar
