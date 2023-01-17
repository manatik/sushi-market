import { NextPageAuth } from '@common-types/private-route.types'
import Ingredients from '@components/pages/admin/ingredient/list/Ingredients'
import { IngredientService } from '@services/ingredient.service'
import { dehydrate, QueryClient } from '@tanstack/react-query'

const IngredientsPage: NextPageAuth = () => {
	return <Ingredients />
}

IngredientsPage.isOnlyRoles = ['admin']

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
