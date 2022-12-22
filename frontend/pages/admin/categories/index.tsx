import { NextPageAuth } from '@common-types/private-route.types'
import Categories from '@components/pages/admin/categories/Categories'
import React from 'react'

const CategoriesPage: NextPageAuth = () => {
	return <Categories />
}

CategoriesPage.isOnlyRoles = ['admin']

export default CategoriesPage
