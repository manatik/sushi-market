import { GearIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

import { ADMIN_SETTINGS_PATH } from '@utils/pages-paths'

import styles from './settings.style.module.scss'

const Settings = () => {
	return (
		<div className={styles.main}>
			<Link href={ADMIN_SETTINGS_PATH} className={styles.icon}>
				<GearIcon width={25} height={25} />
			</Link>
		</div>
	)
}

export default Settings
