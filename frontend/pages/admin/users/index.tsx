import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const UsersPage: NextPageAuth = () => {
	return <div>users page</div>
}

UsersPage.isOnlyRoles = ['admin']

export default UsersPage
