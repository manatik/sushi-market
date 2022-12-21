import { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import type { UserInfo, UserInfoResponse } from '@common-types/user.types'
import Sidebar from '@components/ui/sidebar/Sidebar'
import UserAvatar from '@components/user-info/User-avatar'
import { UserService } from '@services/user.service'
import { useQuery } from '@tanstack/react-query'
import { axiosErrorHandle } from '@utils/axios-error-handle'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren } from 'react'
import styles from './layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const router = useRouter()

	const { data: user, isLoading } = useQuery<
		UserInfoResponse,
		AxiosError<IDefaultResponse>,
		UserInfo
	>(['user'], UserService.getInfo, {
		select: data => data.user,
		onError(error) {
			axiosErrorHandle(error, router)
		}
	})

	if (isLoading || !user) {
		return <div>loading...</div>
	}

	console.log(user)

	return (
		<div className={styles.layout}>
			<div className={styles.left}>
				<Sidebar />
			</div>

			<div className={styles.right}>
				<div className={styles.topLine}>
					<UserAvatar firstname={user.firstname} />
				</div>
				<div className={styles.center}>{children}</div>
				<div className={styles.bottomLine}>.</div>
			</div>
		</div>
	)
}

export default Layout
