import React from 'react'

import Products from '@components/pages/admin/product/list/Products'

import { NextPageAuth } from '@common-types/private-route.types'

const ProductsPage: NextPageAuth = () => {
	return <Products />
}

ProductsPage.isOnlyRoles = ['admin']

export default ProductsPage
