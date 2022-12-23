import { NextPageAuth } from '@common-types/private-route.types'
import SubCategories from '@components/pages/admin/sub-categories/Sub-categories'
import { SubCategoryService } from '@services/sub-category.service'
import { dehydrate, QueryClient } from '@tanstack/react-query'

const SubCategoriesPage: NextPageAuth = () => {
	return <SubCategories />
}

SubCategoriesPage.isOnlyRoles = ['admin']

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['sub-categories'], SubCategoryService.all)

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		} // will be passed to the page component as props
	}
}

export default SubCategoriesPage
