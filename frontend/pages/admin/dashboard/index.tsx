import Dashboard from '@components/pages/admin/dashboard/Dashboard'

import { NextPageAuth } from '@common-types/private-route.types'

const DashboardPage: NextPageAuth = () => {
	return <Dashboard />
}

DashboardPage.isOnlyRoles = ['admin']

export default DashboardPage
