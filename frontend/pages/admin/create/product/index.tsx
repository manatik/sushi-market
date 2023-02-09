import CreateProduct from '@components/pages/admin/product/create/Product'

import { NextPageAuth } from '@common-types/private-route.types'

const CreateProductPage: NextPageAuth = () => {
	return <CreateProduct />
}

CreateProductPage.isOnlyRoles = ['admin']

export default CreateProductPage
