import { QueryClient, dehydrate } from '@tanstack/react-query'

import CheckRole from '@providers/CheckRole'

import { PointOfSaleService } from '@services/point-of-sale.service'

import PointsOfSale from '../../../app/pages/admin/point-of-sale/list/Points-of-sale'

const PointOfSalesPage = () => {
	return (
		<CheckRole roles={['admin']}>
			<PointsOfSale />
		</CheckRole>
	)
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['points-of-sale'], () => PointOfSaleService.all())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export default PointOfSalesPage
