import { NextPageAuth } from '@common-types/private-route.types'

import CreateUser from '../../../../app/pages/admin/user/create/user'

const CreateUserPage: NextPageAuth = () => {
	return <CreateUser />
}

CreateUserPage.isOnlyRoles = ['admin']

export default CreateUserPage
