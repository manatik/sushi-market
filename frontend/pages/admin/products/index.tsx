import { QueryClient, dehydrate } from '@tanstack/react-query'

import CheckRole from '@providers/CheckRole'

import { ProductService } from '@services/product.service'

import { NextPageAuth } from '@common-types/private-route.types'

import Products from '../../../app/pages/admin/product/list/Products'

const ProductsPage: NextPageAuth = () => {
	return (
		<CheckRole roles={['admin']}>
			<Products />
		</CheckRole>
	)
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['products'], () => ProductService.all())

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

export default ProductsPage
