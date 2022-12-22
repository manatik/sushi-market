import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const CreateProductPage: NextPageAuth = () => {
	return <div>create product</div>
}

CreateProductPage.isOnlyRoles = ['admin']

export default CreateProductPage
