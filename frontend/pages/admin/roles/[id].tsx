import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const RolePage: NextPageAuth = () => {
	return <div>role page</div>
}

RolePage.isOnlyRoles = ['admin']

export default RolePage
