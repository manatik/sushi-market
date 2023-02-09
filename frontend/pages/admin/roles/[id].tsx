import React from 'react'

import { NextPageAuth } from '@common-types/private-route.types'

const RolePage: NextPageAuth = () => {
	return <div>role page</div>
}

RolePage.isOnlyRoles = ['admin']

export default RolePage
