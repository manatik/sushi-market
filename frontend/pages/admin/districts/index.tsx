import React from 'react'

import Districts from '@components/pages/admin/district/list/Districts'

import { NextPageAuth } from '@common-types/private-route.types'

const DistrictsPage: NextPageAuth = () => {
	return <Districts />
}

DistrictsPage.isOnlyRoles = ['admin']

export default DistrictsPage
