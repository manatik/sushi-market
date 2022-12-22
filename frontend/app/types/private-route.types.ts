import { NextPage } from 'next'

export type TypeRoles = {
	isOnlyRoles?: string[]
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthFields = { Component: TypeRoles }
