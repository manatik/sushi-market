import CreateDistrict from '@components/pages/admin/district/create/District'

import { NextPageAuth } from '@common-types/private-route.types'

const CreateDistrictPage: NextPageAuth = () => {
	return <CreateDistrict />
}

CreateDistrictPage.isOnlyRoles = ['admin']

export default CreateDistrictPage
