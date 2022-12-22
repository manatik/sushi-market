import { NextPageAuth } from '@common-types/private-route.types'
import Dashboard from '@components/pages/admin/dashboard/Dashboard'

const DashboardPage: NextPageAuth = () => {
	return <Dashboard />
}

DashboardPage.isOnlyRoles = ['admin']

export default DashboardPage
