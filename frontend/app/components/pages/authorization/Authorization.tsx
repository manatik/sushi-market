import SignIn from '@components/pages/authorization/sign-in/Sign-in'
import SignUp from '@components/pages/authorization/sign-up/Sign-up'
import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'
import styles from './authorization.style.module.scss'

export enum AuthTabs {
	SignIn = 'sign-in',
	SignUp = 'sign-up'
}

const Authorization = () => {
	const [activeTab, setActiveTab] = useState<AuthTabs>(AuthTabs.SignIn)

	const handleClick = (tab: AuthTabs) => {
		console.log(tab)
		setActiveTab(tab)
	}

	console.log(activeTab)
	return (
		<div className={styles.main}>
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
					<SignIn />
				</Tabs.Content>

				<Tabs.Content value={AuthTabs.SignUp}>
					<SignUp />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	)
}

export default Authorization
