import { NextPageAuth } from '@common-types/private-route.types'
import CreatePromotion from '@components/pages/admin/promotion/create/Promotion'

const CreatePromotionPage: NextPageAuth = () => {
	return <CreatePromotion />
}

CreatePromotionPage.isOnlyRoles = ['admin']

export default CreatePromotionPage
