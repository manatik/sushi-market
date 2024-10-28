import React, { FC, PropsWithChildren } from 'react'

import styles from './layout.style.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.main}>{children}</div>
}

export default Layout
