import Menu from '@components/menu/Menu'
import Products from '@components/products/Products'
import Loader from '@components/ui/loader/Loader'

import { useGetUser } from '@query-hooks/useUser'

import Header from '../header/Header'

import styles from './home.style.module.scss'

const Home = () => {
	const { data: user, isLoading } = useGetUser()

	if (isLoading) {
		return <Loader />
	}

	return (
		<div className={styles.main}>
			<Header user={user} />
			<div style={{ height: '200px' }}>промо карточки</div>
			<Menu />
			<Products />
		</div>
	)
}

export default Home
