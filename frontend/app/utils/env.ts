import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const appEnvironment = publicRuntimeConfig?.REACT_APP_ENVIRONMENT
export const isProduction = appEnvironment === 'production'
export const isDev = appEnvironment === 'development'
