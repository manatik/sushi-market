import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const PromotionsPage: NextPageAuth = () => {
	return <div>promotions page</div>
}

PromotionsPage.isOnlyRoles = ['admin']

export default PromotionsPage
