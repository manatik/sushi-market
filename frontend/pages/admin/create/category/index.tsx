import { NextPageAuth } from '@common-types/private-route.types'
import CreateCategory from '@components/pages/admin/category/create/Category'
import React from 'react'

const CreateCategoryPage: NextPageAuth = () => {
	return <CreateCategory />
}

CreateCategoryPage.isOnlyRoles = ['admin']

export default CreateCategoryPage
