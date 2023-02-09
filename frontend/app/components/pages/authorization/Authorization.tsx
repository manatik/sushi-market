import * as Tabs from '@radix-ui/react-tabs'
import logo from 'assets/logo.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import SignIn from '@components/pages/authorization/sign-in/Sign-in'
import SignUp from '@components/pages/authorization/sign-up/Sign-up'

import { HOME_PATH } from '@utils/pages-paths'

import styles from './authorization.style.module.scss'

export enum AuthTabs {
	SignIn = 'sign-in',
	SignUp = 'sign-up'
}

const Authorization = () => {
	const router = useRouter()
	const [activeTab, setActiveTab] = useState<AuthTabs>(AuthTabs.SignIn)

	const handleClick = (tab: AuthTabs) => {
		setActiveTab(tab)
	}

	const onSuccessSign = () => {
		router.back()
	}

	const onTabState = (activeTab: AuthTabs, tab: AuthTabs) => {
		if (activeTab === tab) {
			return 'active'
		} else {
			return 'inactive'
		}
	}

	return (
		<div className={styles.main}>
			<div className={styles.main__logo} onClick={() => router.replace(HOME_PATH)}>
				<Image src={logo} width={25 * 16} height={100} alt={'logo'} />
			</div>

			<Tabs.Root className={styles.tabs} defaultValue={AuthTabs.SignIn}>
				<Tabs.List className={styles.tabsList}>
					<Tabs.Trigger
						data-state={onTabState(activeTab, AuthTabs.SignIn)}
						className={styles.tabsList__item}
						value={AuthTabs.SignIn}
						onClick={() => handleClick(AuthTabs.SignIn)}
					>
						Войти
					</Tabs.Trigger>

					<Tabs.Trigger
						data-state={onTabState(activeTab, AuthTabs.SignUp)}
						className={styles.tabsList__item}
						value={AuthTabs.SignUp}
						onClick={() => handleClick(AuthTabs.SignUp)}
					>
						Зарегистрироваться
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value={AuthTabs.SignIn}>
					<SignIn onSuccessSign={onSuccessSign} />
				</Tabs.Content>

				<Tabs.Content value={AuthTabs.SignUp}>
					<SignUp onSuccessSign={onSuccessSign} />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	)
}

export default Authorization
