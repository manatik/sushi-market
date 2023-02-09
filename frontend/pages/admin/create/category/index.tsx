import CreateCategory from '@components/pages/admin/category/create/Category'

import { NextPageAuth } from '@common-types/private-route.types'

const CreateCategoryPage: NextPageAuth = () => {
	return <CreateCategory />
}

CreateCategoryPage.isOnlyRoles = ['admin']

export default CreateCategoryPage
