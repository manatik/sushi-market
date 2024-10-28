import { QueryClient, dehydrate } from '@tanstack/react-query'

import CheckRole from '@providers/CheckRole'

import { UserService } from '@services/user.service'

import { NextPageAuth } from '@common-types/private-route.types'

import Users from '../../../app/pages/admin/user/list/Users'

const UsersPage: NextPageAuth = () => {
	return (
		<CheckRole roles={['admin']}>
			<Users />
		</CheckRole>
	)
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['users'], () => UserService.all())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export default UsersPage
