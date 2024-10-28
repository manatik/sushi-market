import CheckRole from '@providers/CheckRole'

import { NextPageAuth } from '@common-types/private-route.types'

const OrdersPage: NextPageAuth = () => {
	return <CheckRole roles={['admin']}>orders</CheckRole>
}

export default OrdersPage
