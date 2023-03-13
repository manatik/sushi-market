import { MutableRefObject, useEffect, useRef } from 'react'

export const useClickOutside = <T = MutableRefObject<any>, V extends Function = Function>(callback?: V) => {
	const ref = useRef<T | null>(null)

	const handleClick = (e: any) => {
		// @ts-ignore
		if (ref.current && !ref.current.contains(e.target)) {
			callback?.()
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	})

	return ref
}
