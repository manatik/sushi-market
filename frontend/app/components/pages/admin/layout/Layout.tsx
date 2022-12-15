import Sidebar from '@components/ui/sidebar/Sidebar'
import React, { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<Sidebar />
			{children}
		</div>
	)
}

export default Layout
