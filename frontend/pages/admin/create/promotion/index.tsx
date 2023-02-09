import CreatePromotion from '@components/pages/admin/promotion/create/Promotion'

import { NextPageAuth } from '@common-types/private-route.types'

const CreatePromotionPage: NextPageAuth = () => {
	return <CreatePromotion />
}

CreatePromotionPage.isOnlyRoles = ['admin']

export default CreatePromotionPage
