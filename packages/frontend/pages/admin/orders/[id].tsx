import { NextPageAuth } from '@common-types/private-route.types'

const OrderPage: NextPageAuth = () => {
	return <div>order page</div>
}

OrderPage.isOnlyRoles = ['admin']

export default OrderPage
