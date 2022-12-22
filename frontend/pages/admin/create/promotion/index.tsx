import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const CreatePromotionPage: NextPageAuth = () => {
	return <div>create promotion</div>
}

CreatePromotionPage.isOnlyRoles = ['admin']

export default CreatePromotionPage
