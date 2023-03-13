import { IDefaultResponse } from './default-response.types'

export interface UserResponse extends IDefaultResponse {
	user: IUser
}

export interface UsersResponse extends IDefaultResponse {
	users: IUser[]
}

export interface RolesResponse extends IDefaultResponse {
	roles: IRole[]
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

export interface ICreateUser extends Pick<IUser, 'firstname' | 'lastname' | 'email' | 'phone'> {
	birthdate?: string | null
	roles: string[]
	password: string
}

export interface IUpdateUser extends Partial<Omit<IUser, 'roles'>> {
	roles?: string[]
}

export interface IUserAuth {
	isAuth: boolean
	roles: IRole[]
	error: boolean
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

export interface IUserFilters {
	search?: string
	onlyHidden?: boolean
}
