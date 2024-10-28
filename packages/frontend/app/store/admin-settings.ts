import { toast } from 'react-toastify'
import { atom, selector } from 'recoil'

type AdminSettings = {
	sidebarCreate: boolean
	hiddenTime: boolean
}

export const adminSettingsAtom = atom<AdminSettings>({
	key: 'admin-settings-state',
	default: {
		sidebarCreate: false,
		hiddenTime: false
	},
	effects: [
		({ onSet, setSelf }) => {
			if (typeof window !== 'undefined') {
				onSet(newState => {
					localStorage.setItem('settings', JSON.stringify(newState))
					toast.success('Настройки успешно сохранены')
				})

				setSelf(JSON.parse(localStorage.getItem('settings') || '{}'))
			}
		}
	]
})

export const adminSettingsSelector = selector({
	key: 'admin-settings-selector',
	get({ get }) {
		return get(adminSettingsAtom)
	}
})
