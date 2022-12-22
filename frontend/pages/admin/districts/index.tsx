import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const DistrictsPage: NextPageAuth = () => {
	return <div>Districts page</div>
}

DistrictsPage.isOnlyRoles = ['admin']

export default DistrictsPage
