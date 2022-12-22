import SignIn from '@components/pages/authorization/sign-in/Sign-in'
import SignUp from '@components/pages/authorization/sign-up/Sign-up'
import * as Tabs from '@radix-ui/react-tabs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './authorization.style.module.scss'
import logo from 'assets/logo.png'

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

	return (
		<div className={styles.main}>
			<div className={styles.main__logo}>
				<Image src={logo} width={25 * 16} height={100} alt={'logo'} />
			</div>

			<Tabs.Root className={styles.tabs} defaultValue={AuthTabs.SignIn}>
				<Tabs.List className={styles.tabsList}>
					<Tabs.Trigger
						data-state={AuthTabs.SignIn === activeTab ? 'active' : 'inactive'}
						className={styles.tabsList__item}
						value={AuthTabs.SignIn}
						onClick={() => handleClick(AuthTabs.SignIn)}
					>
						Войти
					</Tabs.Trigger>

					<Tabs.Trigger
						data-state={AuthTabs.SignUp === activeTab ? 'active' : 'inactive'}
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
