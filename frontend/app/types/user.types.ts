import { IDefaultResponse } from './IDefaultResponse.types'

export interface UserInfoResponse extends IDefaultResponse {
	user: UserInfo
}

export interface UserInfo {
	id: string
	firstname: string
	lastname: string | null
	activeAddressId: string | null
	addresses: string[]
	birthdate: string | null
	email: string | null
	phone: string
	roles: IRole[]
	dateCreated: string
	dateDeleted: string | null
	dateUpdated: string | null
}

export interface IUserAuth {
	isAuth: boolean
	roles: IRole[]
}

export interface IRole {
	id: string
	name: string
	dateCreated: string
	dateDeleted: string | null
	dateUpdated: string | null
}

export interface ISignIn extends Pick<UserInfo, 'phone'> {
	phone: string
	password: string
}

export interface ISignUp extends ISignIn {
	firstname: string
	birthdate?: string
}
