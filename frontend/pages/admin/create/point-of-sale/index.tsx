import CreatePointOfSale from '@components/pages/admin/point-of-sale/create/Point-of-sale'

import { NextPageAuth } from '@common-types/private-route.types'

const CreatePointOfSalePage: NextPageAuth = () => {
	return <CreatePointOfSale />
}

CreatePointOfSalePage.isOnlyRoles = ['admin']

export default CreatePointOfSalePage
