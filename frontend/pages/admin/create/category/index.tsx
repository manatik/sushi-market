import { NextPageAuth } from '@common-types/private-route.types'
import Category from '@components/pages/admin/create/category/Category'
import React from 'react'

const CreateCategoryPage: NextPageAuth = () => {
	return <Category />
}

CreateCategoryPage.isOnlyRoles = ['admin']

export default CreateCategoryPage
