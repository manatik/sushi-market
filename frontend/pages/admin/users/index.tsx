import React from 'react'

import Users from '@components/pages/admin/user/list/Users'

import { NextPageAuth } from '@common-types/private-route.types'

const UsersPage: NextPageAuth = () => {
	return <Users />
}

UsersPage.isOnlyRoles = ['admin']

export default UsersPage
