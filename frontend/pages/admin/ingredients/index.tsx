import { QueryClient, dehydrate } from '@tanstack/react-query'

import Ingredients from '@components/pages/admin/ingredient/list/Ingredients'

import CheckRole from '@providers/CheckRole'

import { IngredientService } from '@services/ingredient.service'

import { NextPageAuth } from '@common-types/private-route.types'

const IngredientsPage: NextPageAuth = () => {
	return (
		<CheckRole roles={['admin']}>
			<Ingredients />
		</CheckRole>
	)
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['ingredients'], () => IngredientService.all())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		} // will be passed to the page component as props
	}
}

export default IngredientsPage
