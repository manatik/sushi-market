import { NextPage } from 'next'

import Layout from '@components/layout/Layout'

import Home from '../app/pages/home/Home'

const HomePage: NextPage = props => {
	return (
		<Layout>
			<Home {...props} />
		</Layout>
	)
}

export default HomePage
