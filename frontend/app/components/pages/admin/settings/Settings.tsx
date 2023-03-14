import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@components/ui/checkbox/Checkbox'

import styles from './settings.style.module.scss'

const Settings = () => {
	// const [settingsState, setSettingsState] = useRecoilState(adminSettingsAtom)
	const { control, handleSubmit, setValue } = useForm()

	const onSubmit = (form: any) => {
		// setSettingsState(form)
	}

	// useEffect(() => {
	// 	for (const [key, value] of Object.entries(settingsState)) {
	// 		setValue(key, value)
	// 	}
	// }, [setValue, settingsState])

	return (
		<div className={styles.main}>
			<span className={styles.title}>Настройки административной панели</span>

			<form className={styles.menu}>
				<div className={styles.item}>
					<Controller
						control={control}
						name={'sidebarCreate'}
						render={({ field }) => <Checkbox onCheckedChange={value => field.onChange(value)} checked={field.value} />}
					/>

					<span>Пункт &quot;Создать&quot; всегда раскрыт</span>
				</div>

				<div className={styles.item}>
					<Controller
						control={control}
						name={'hiddenTime'}
						render={({ field }) => <Checkbox onCheckedChange={value => field.onChange(value)} checked={field.value} />}
					/>
					<span>Скрыть время</span>
				</div>
			</form>

			<button className={styles.save} type={'submit'} onClick={handleSubmit(onSubmit)}>
				Сохранить
			</button>
		</div>
	)
}

export default Settings
