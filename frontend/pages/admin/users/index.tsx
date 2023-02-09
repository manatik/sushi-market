import React from 'react'

import { NextPageAuth } from '@common-types/private-route.types'

const UsersPage: NextPageAuth = () => {
	return <div>users page</div>
}

UsersPage.isOnlyRoles = ['admin']

export default UsersPage
