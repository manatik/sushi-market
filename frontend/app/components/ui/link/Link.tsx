import classNames from 'classnames'
import { useRouter } from 'next/router'
import NextLink, { LinkProps } from 'next/link'
import { PropsWithChildren, useState, useEffect } from 'react'
import styles from './link.style.module.scss'

type ActiveLinkProps = LinkProps & {
	className?: string
	activeClassName?: string
}

const Link = ({
	children,
	activeClassName,
	className,
	...props
}: PropsWithChildren<ActiveLinkProps>) => {
	const { asPath, isReady } = useRouter()
	const [computedClassName, setComputedClassName] = useState(className)

	useEffect(() => {
		// Check if the router fields are updated client-side
		if (isReady) {
			// Dynamic route will be matched via props.as
			// Static route will be matched via props.href
			const linkPathname = new URL((props.as || props.href) as string, location.href).pathname

			// Using URL().pathname to get rid of query and hash
			const activePathname = new URL(asPath, location.href).pathname

			const newClassName =
				linkPathname === activePathname ? `${className} ${activeClassName}`.trim() : className

			if (newClassName !== computedClassName) {
				setComputedClassName(newClassName)
			}
		}
	}, [asPath, isReady, props.as, props.href, activeClassName, className, computedClassName])

	return (
		<NextLink className={classNames(styles.a, computedClassName)} {...props}>
			{children}
		</NextLink>
	)
}

export default Link
