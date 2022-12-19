export const LocalStorageService = {
	setAccessToken(token: string) {
		localStorage.setItem('a_t', token)
	},

	getAccessToken() {
		return localStorage.getItem('a_t')
	}
}
