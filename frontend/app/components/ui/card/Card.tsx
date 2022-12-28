import Separator from '@components/ui/separator/Separator'
import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import styles from './card.style.module.scss'

interface DotNotation {
	Title: typeof Title
	Header: typeof Header
	Content: typeof Content
	Item: typeof Item
}

const Card: FC<PropsWithChildren> & DotNotation = ({ children }) => {
	return <div className={styles.card}>{children}</div>
}

const Header: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<div className={styles.cardHeader}>{children}</div>
			<Separator />
		</>
	)
}

interface ITitleProps {
	title: string
	subTitle?: string
}

const Title: FC<ITitleProps> = ({ title, subTitle }) => {
	return (
		<div className={styles.cardTitles}>
			<span className={styles.cardTitles__title}>{title}</span>
			{subTitle && <span className={styles.cardTitles__subTitle}>{subTitle}</span>}
		</div>
	)
}

const Content: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.cardContent}>{children}</div>
}

interface IItemProps {
	justify?: 'start' | 'between' | 'end'
	type?: 'primary' | 'secondary'
}

const Item: FC<PropsWithChildren<IItemProps>> = ({ children, justify, type }) => {
	return (
		<div
			className={classNames(styles.cardContent__item, {
				[styles.cardContent__item_alignEnd]: justify === 'end',
				[styles.cardContent__item_alignStart]: justify === 'start',
				[styles.cardContent__item_small]: type === 'secondary'
			})}
		>
			{children}
		</div>
	)
}

Card.Header = Header
Card.Title = Title
Card.Content = Content
Card.Item = Item

export default Card
