import { NextPageAuth } from '@common-types/private-route.types'
import Products from '@components/pages/admin/products/Products'
import React from 'react'

const ProductsPage: NextPageAuth = () => {
	return <Products />
}

ProductsPage.isOnlyRoles = ['admin']

export default ProductsPage
