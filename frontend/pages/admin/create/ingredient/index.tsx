import { NextPageAuth } from '@common-types/private-route.types'

import CreateIngredient from '../../../../app/pages/admin/ingredient/create/Ingredient'

const CreateIngredientPage: NextPageAuth = () => {
	return <CreateIngredient />
}

CreateIngredientPage.isOnlyRoles = ['admin']

export default CreateIngredientPage
