import { NextPage } from 'next'

import Layout from '@components/layout/Layout'
import Home from '@components/pages/home/Home'

const HomePage: NextPage = props => {
	return (
		<Layout>
			<Home {...props} />
		</Layout>
	)
}

export default HomePage
