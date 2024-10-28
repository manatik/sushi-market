import { NextPageAuth } from '@common-types/private-route.types'

const CreateOrderPage: NextPageAuth = () => {
	return <div>Создание заказа</div>
}

CreateOrderPage.isOnlyRoles = ['admin']

export default CreateOrderPage
