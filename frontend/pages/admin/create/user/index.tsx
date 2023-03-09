import CreateUser from '@components/pages/admin/user/create/user'

import { NextPageAuth } from '@common-types/private-route.types'

const CreateUserPage: NextPageAuth = () => {
	return <CreateUser />
}

CreateUserPage.isOnlyRoles = ['admin']

export default CreateUserPage
