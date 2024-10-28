import { FC, PropsWithChildren } from 'react'

import Settings from '@components/admin/settings/Settings'
import AdminSidebar from '@components/admin/sidebar/Sidebar'
import UserAvatar from '@components/admin/user-info/User-avatar'
import CurrentDate from '@components/ui/current-date/Current-date'

import styles from './layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className={styles.layout}>
			<nav className={styles.left}>
				<AdminSidebar />
			</nav>

			<div className={styles.right}>
				<section className={styles.topLine}>
					<CurrentDate />
					<UserAvatar />
					<Settings />
				</section>
				<section className={styles.center}>{children}</section>
				<section className={styles.bottomLine}>_</section>
			</div>
		</main>
	)
}

export default Layout
