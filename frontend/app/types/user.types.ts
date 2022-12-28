import { IDefaultResponse } from './default-response.types'

export interface UserResponse extends IDefaultResponse {
	user: IUser
}

export interface IUser {
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

export interface IUpdateUser extends Partial<IUser> {}

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

export interface ISignIn {
	phone: string
	password: string
}

export interface ISignUp extends ISignIn {
	firstname: string
	birthdate?: string
}
