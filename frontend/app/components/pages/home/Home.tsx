import Link from 'next/link'

const Home = () => {
	return (
		<div>
			<Link href={'/admin/dashboard'}>Админка</Link>
		</div>
	)
}

export default Home
