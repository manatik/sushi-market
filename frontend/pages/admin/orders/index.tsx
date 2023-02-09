import React from 'react'

import { NextPageAuth } from '@common-types/private-route.types'

const OrdersPage: NextPageAuth = () => {
	return <div>orders</div>
}

OrdersPage.isOnlyRoles = ['admin']

export default OrdersPage
