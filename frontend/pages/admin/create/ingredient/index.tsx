import CreateIngredient from '@components/pages/admin/ingredient/create/Ingredient'

import { NextPageAuth } from '@common-types/private-route.types'

const CreateIngredientPage: NextPageAuth = () => {
	return <CreateIngredient />
}

CreateIngredientPage.isOnlyRoles = ['admin']

export default CreateIngredientPage
