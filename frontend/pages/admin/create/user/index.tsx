import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const CreateUserPage: NextPageAuth = () => {
	return <div>create user</div>
}

CreateUserPage.isOnlyRoles = ['admin']

export default CreateUserPage
