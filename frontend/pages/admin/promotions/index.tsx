import React from 'react'

import Promotions from '@components/pages/admin/promotion/list/Promotions'

import { NextPageAuth } from '@common-types/private-route.types'

const PromotionsPage: NextPageAuth = () => {
	return <Promotions />
}

PromotionsPage.isOnlyRoles = ['admin']

export default PromotionsPage
