import { QueryClient, dehydrate } from '@tanstack/react-query'

import Users from '@components/pages/admin/user/list/Users'

import CheckRole from '@providers/CheckRole'

import { UserService } from '@services/user.service'

import { NextPageAuth } from '@common-types/private-route.types'

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
