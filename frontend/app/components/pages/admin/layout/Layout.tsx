import Sidebar from '@components/ui/sidebar/Sidebar'
import React, { FC, PropsWithChildren } from 'react'
import styles from './layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<div className={styles.left}>
				<Sidebar />
			</div>

			<div className={styles.right}>
				<div className={styles.topLine}>.</div>
				<div className={styles.content}>{children}</div>
				<div className={styles.bottomLine}>.</div>
			</div>
		</div>
	)
}

export default Layout
