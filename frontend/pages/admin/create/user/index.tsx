import { NextPageAuth } from '@common-types/private-route.types'

const CreateUserPage: NextPageAuth = () => {
	return <div>create user</div>
}

CreateUserPage.isOnlyRoles = ['admin']

export default CreateUserPage
