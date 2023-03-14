import { QueryClient, dehydrate } from '@tanstack/react-query'

import SubCategories from '@components/pages/admin/sub-category/list/Sub-categories'

import CheckRole from '@providers/CheckRole'

import { SubCategoryService } from '@services/sub-category.service'

import { NextPageAuth } from '@common-types/private-route.types'

const SubCategoriesPage: NextPageAuth = () => {
	return (
		<CheckRole roles={['admin']}>
			<SubCategories />
		</CheckRole>
	)
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['sub-categories'], () => SubCategoryService.all())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		} // will be passed to the page component as props
	}
}

export default SubCategoriesPage
