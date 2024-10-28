import {
	AccordionContentProps,
	AccordionHeaderProps,
	AccordionItemProps,
	AccordionMultipleProps,
	AccordionSingleProps,
	AccordionTriggerProps
} from '@radix-ui/react-accordion'
import * as RadixAccordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import React, { FC } from 'react'

import styles from './accordion.style.module.scss'

interface DotNotation {
	Item: typeof Item
	Header: typeof Header
	Trigger: typeof Trigger
	Content: typeof Content
}

const Item: FC<AccordionItemProps> = ({ className, children, ...props }) => {
	return (
		<RadixAccordion.Item className={classNames(className, styles['accordion-item'])} {...props}>
			{children}
		</RadixAccordion.Item>
	)
}

const Header: FC<AccordionHeaderProps> = ({ className, children, ...props }) => {
	return (
		<RadixAccordion.Header className={classNames(className, styles['accordion-header'])} {...props}>
			{children}
		</RadixAccordion.Header>
	)
}

const Trigger: FC<AccordionTriggerProps> = ({ className, children, ...props }) => {
	return (
		<RadixAccordion.Trigger className={classNames(className, styles['accordion-trigger'])} {...props}>
			{children}
		</RadixAccordion.Trigger>
	)
}

const Content: FC<AccordionContentProps> = ({ className, children, ...props }) => {
	return (
		<RadixAccordion.Content className={classNames(className, styles['accordion-content'])} {...props}>
			{children}
		</RadixAccordion.Content>
	)
}

export const Accordion: FC<AccordionSingleProps | AccordionMultipleProps> & DotNotation = ({
	className,
	children,
	...props
}) => {
	return (
		<RadixAccordion.Root className={classNames(className, styles['accordion'])} {...props}>
			{children}
		</RadixAccordion.Root>
	)
}

Accordion.Item = Item
Accordion.Header = Header
Accordion.Trigger = Trigger
Accordion.Content = Content

export default Accordion
