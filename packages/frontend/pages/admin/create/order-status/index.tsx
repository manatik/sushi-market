import { NextPageAuth } from '@common-types/private-route.types'

const CreateOrderStatusPage: NextPageAuth = () => {
	return <div>Создание статуса заказа</div>
}

CreateOrderStatusPage.isOnlyRoles = ['admin']

export default CreateOrderStatusPage
