/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
	publicRuntimeConfig: {
		REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT
	},
	env: {
		API_URL: `${process.env.REACT_APP_API_URL}/api`,
		STATIC_URL: process.env.REACT_APP_API_URL
	},
	images: {
		domains: ['sman_nestjs', 'localhost'],
		remotePatterns: [
			{
				port: '9000',
				protocol: 'http',
				hostname: 'sman_nestjs',
				pathname: '/uploads/**'
			}
		]
	},
	i18n: {
		locales: ['ru'],
		defaultLocale: 'ru'
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://sman_nestjs:9000/api/:path*'
			},
			{
				source: '/uploads/:path*',
				destination: 'http://sman_nestjs:9000/uploads/:path*'
			}
		]
	}
}

module.exports = nextConfig
