import {
	HoverCardContentProps,
	HoverCardProps,
	HoverCardTriggerProps
} from '@radix-ui/react-hover-card'
import * as RadixHoverCard from '@radix-ui/react-hover-card'
import classNames from 'classnames'
import { FC, PropsWithChildren, RefAttributes } from 'react'
import styles from './hover-card.style.module.scss'

interface DotNotation {
	Title: typeof Title
	Content: typeof Content
}

const HoverCard: FC<PropsWithChildren<HoverCardProps>> & DotNotation = ({ children, ...props }) => {
	return <RadixHoverCard.Root {...props}>{children}</RadixHoverCard.Root>
}

const Title: FC<PropsWithChildren<HoverCardTriggerProps>> = ({ children, className, ...props }) => {
	return (
		<RadixHoverCard.Trigger className={classNames(styles.hoverCard__title, className)} {...props}>
			{children}
		</RadixHoverCard.Trigger>
	)
}

const Content: FC<PropsWithChildren<HoverCardContentProps & RefAttributes<HTMLDivElement>>> = ({
	children,
	className,
	...props
}) => {
	return (
		<RadixHoverCard.Portal>
			<RadixHoverCard.Content
				sideOffset={5}
				className={classNames(styles.hoverCard__content, className)}
				{...props}
			>
				{children}
			</RadixHoverCard.Content>
		</RadixHoverCard.Portal>
	)
}

HoverCard.Title = Title
HoverCard.Content = Content

export default HoverCard
