import { NextPageAuth } from '@common-types/private-route.types'
import Categories from '@components/pages/admin/category/list/Categories'
import { CategoryService } from '@services/category.service'
import { dehydrate, QueryClient } from '@tanstack/react-query'

const CategoriesPage: NextPageAuth = props => {
	return <Categories />
}

CategoriesPage.isOnlyRoles = ['admin']

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['categories'], () => CategoryService.all())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		} // will be passed to the page component as props
	}
}

export default CategoriesPage
