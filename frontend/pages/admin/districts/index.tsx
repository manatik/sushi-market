import React from 'react'

import { NextPageAuth } from '@common-types/private-route.types'

const DistrictsPage: NextPageAuth = () => {
	return <div>Districts page</div>
}

DistrictsPage.isOnlyRoles = ['admin']

export default DistrictsPage
