import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	swcMinify: true,
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
