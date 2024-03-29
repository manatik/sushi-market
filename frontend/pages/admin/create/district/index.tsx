import { NextPageAuth } from '@common-types/private-route.types'

import CreateDistrict from '../../../../app/pages/admin/district/create/District'

const CreateDistrictPage: NextPageAuth = () => {
	return <CreateDistrict />
}

CreateDistrictPage.isOnlyRoles = ['admin']

export default CreateDistrictPage
