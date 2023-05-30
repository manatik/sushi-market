import { NextPageAuth } from '@common-types/private-route.types'

import CreateProduct from '../../../../app/pages/admin/product/create/Product'

const CreateProductPage: NextPageAuth = () => {
	return <CreateProduct />
}

CreateProductPage.isOnlyRoles = ['admin']

export default CreateProductPage
