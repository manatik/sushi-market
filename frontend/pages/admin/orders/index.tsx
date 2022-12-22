import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const OrdersPage: NextPageAuth = () => {
	return <div>orders</div>
}

OrdersPage.isOnlyRoles = ['admin']

export default OrdersPage
