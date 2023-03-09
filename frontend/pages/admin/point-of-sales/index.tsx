import React from 'react'

import PointsOfSale from '@components/pages/admin/point-of-sale/list/Points-of-sale'

const PointOfSalesPage = () => {
	return <PointsOfSale />
}

PointOfSalesPage.isOnlyRoles = ['admin']

export default PointOfSalesPage
