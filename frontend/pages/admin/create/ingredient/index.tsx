import { NextPageAuth } from '@common-types/private-route.types'
import React from 'react'

const CreateIngredientPage: NextPageAuth = () => {
	return <div>create ingredient</div>
}

CreateIngredientPage.isOnlyRoles = ['admin']

export default CreateIngredientPage
