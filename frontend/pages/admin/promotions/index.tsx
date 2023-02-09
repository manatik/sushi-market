import React from 'react'

import { NextPageAuth } from '@common-types/private-route.types'

const PromotionsPage: NextPageAuth = () => {
	return <div>promotions page</div>
}

PromotionsPage.isOnlyRoles = ['admin']

export default PromotionsPage
