import { QueryClient, dehydrate } from '@tanstack/react-query'

import CheckRole from '@providers/CheckRole'

import { PromotionService } from '@services/promotion.service'

import { NextPageAuth } from '@common-types/private-route.types'

import Promotions from '../../../app/pages/admin/promotion/list/Promotions'

const PromotionsPage: NextPageAuth = () => {
	return (
		<CheckRole roles={['admin']}>
			<Promotions />
		</CheckRole>
	)
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['promotions'], () => PromotionService.all())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export default PromotionsPage
