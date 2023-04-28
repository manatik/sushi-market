import logo from 'assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import UserAvatar from '@components/admin/user-info/User-avatar'

import { IUser } from '@common-types/user.types'

import { userIsAdmin } from '@utils/utils'

import styles from './header.style.module.scss'

interface Props {
	user?: IUser
}

const Header: FC<Props> = ({ user }) => {
	return (
		<div className={styles.main}>
			<Image src={logo} width={150} height={40} alt={'logo'} />

			<div className={styles.right}>
				{userIsAdmin(user?.roles) && <Link href={'/admin/dashboard'}>Админка</Link>}
				{user ? <UserAvatar /> : <div>войти</div>}
			</div>
		</div>
	)
}

export default Header
