import { useCallback, useRef } from 'react'

export const useDebouncedCallback = <T = Function>(func: T, delay: number) => {
	// Use a ref to store the timeout between renders
	// and prevent changes to it from causing re-renders
	const timeout = useRef<NodeJS.Timeout>()

	return useCallback(
		(...args: any) => {
			const later = () => {
				clearTimeout(timeout.current)
				// @ts-ignore
				func(...args)
			}

			clearTimeout(timeout.current)
			timeout.current = setTimeout(later, delay)
		},
		[func, delay]
	)
}
