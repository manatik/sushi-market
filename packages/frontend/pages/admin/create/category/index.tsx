import { NextPageAuth } from '@common-types/private-route.types'

import CreateCategory from '../../../../app/pages/admin/category/create/Category'

const CreateCategoryPage: NextPageAuth = () => {
	return <CreateCategory />
}

CreateCategoryPage.isOnlyRoles = ['admin']

export default CreateCategoryPage
