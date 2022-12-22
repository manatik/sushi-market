import { NextPageAuth } from '@common-types/private-route.types'
import Ingredients from '@components/pages/admin/ingredients/Ingredients'
import React from 'react'

const IngredientsPage: NextPageAuth = () => {
	return <Ingredients />
}

IngredientsPage.isOnlyRoles = ['admin']

export default IngredientsPage
