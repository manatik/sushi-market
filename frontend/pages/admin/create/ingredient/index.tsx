import { NextPageAuth } from '@common-types/private-route.types'
import CreateIngredient from '@components/pages/admin/create/ingredient/Ingredient'

const CreateIngredientPage: NextPageAuth = () => {
	return <CreateIngredient />
}

CreateIngredientPage.isOnlyRoles = ['admin']

export default CreateIngredientPage
