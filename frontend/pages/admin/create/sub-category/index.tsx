import CreateSubCategory from '@components/pages/admin/sub-category/create/Sub-category'
import React from 'react'
import CategoriesPage from '../../categories'

const SubCategoryPage = () => {
	return <CreateSubCategory />
}

CategoriesPage.isOnlyRoles = ['admin']

export default SubCategoryPage
