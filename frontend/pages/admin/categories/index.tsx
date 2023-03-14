import { QueryClient, dehydrate } from '@tanstack/react-query'

import Categories from '@components/pages/admin/category/list/Categories'

import CheckRole from '@providers/CheckRole'

import { CategoryService } from '@services/category.service'

import { NextPageAuth } from '@common-types/private-route.types'

const CategoriesPage: NextPageAuth = props => {
	return (
		<CheckRole roles={['admin']}>
			<Categories />
		</CheckRole>
	)
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['categories'], () => CategoryService.all())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export default CategoriesPage
