import { NextPageAuth } from '@common-types/private-route.types'
import CreateProduct from '@components/pages/admin/product/create/Product'
import React from 'react'

const CreateProductPage: NextPageAuth = () => {
	return <CreateProduct />
}

CreateProductPage.isOnlyRoles = ['admin']

export default CreateProductPage
