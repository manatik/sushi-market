import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang={'ru'}>
			<Head title={'Sushiman'}>
				<link rel={'icon'} href={'/favicon.svg'} type={'image/svg+xml'} />

				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={''} />
				<link
					href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap'
					rel='stylesheet'
				/>
				<meta name={'theme-color'} content={'#ff7652'} />
				<meta name={'msapplication-navbutton-color'} content={'#ff7652'} />
				<meta name={'apple-mobile-web-app-status-bar-style'} content={'#ff7652'} />
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
