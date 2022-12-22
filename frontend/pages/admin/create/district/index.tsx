import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const CreateDistrictPage: NextPageAuth = () => {
	return <div>create district</div>
}

CreateDistrictPage.isOnlyRoles = ['admin']

export default CreateDistrictPage
