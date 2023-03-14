import { QueryClient, dehydrate } from '@tanstack/react-query'

import Districts from '@components/pages/admin/district/list/Districts'

import CheckRole from '@providers/CheckRole'

import { DistrictService } from '@services/district.service'

import { NextPageAuth } from '@common-types/private-route.types'

const DistrictsPage: NextPageAuth = () => {
	return (
		<CheckRole roles={['admin']}>
			<Districts />
		</CheckRole>
	)
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['districts'], () => DistrictService.all())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export default DistrictsPage
