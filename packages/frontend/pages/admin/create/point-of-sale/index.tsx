import { NextPageAuth } from '@common-types/private-route.types'

import CreatePointOfSale from '../../../../app/pages/admin/point-of-sale/create/Point-of-sale'

const CreatePointOfSalePage: NextPageAuth = () => {
	return <CreatePointOfSale />
}

CreatePointOfSalePage.isOnlyRoles = ['admin']

export default CreatePointOfSalePage
