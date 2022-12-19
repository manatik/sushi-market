/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
	env: {
		API_URL: process.env.REACT_APP_API_URL
	},
	images: {
		domains: ['nestjs']
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
