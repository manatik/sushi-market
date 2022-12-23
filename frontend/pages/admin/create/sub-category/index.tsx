import CreateSubCategory from '@components/pages/admin/create/sub-category/Sub-category'
import React from 'react'
import CategoriesPage from '../../categories'

const SubCategoryPage = () => {
	return <CreateSubCategory />
}

CategoriesPage.isOnlyRoles = ['admin']

export default SubCategoryPage
