import { CheckboxProps } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import React, { FC } from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import styles from './checkbox.style.module.scss'

const Checkbox: FC<CheckboxProps & React.RefAttributes<HTMLButtonElement>> = ({
	className,
	...props
}) => {
	return (
		<RadixCheckbox.Root className={styles.CheckboxRoot} {...props}>
			<RadixCheckbox.Indicator className={classNames(styles.CheckboxIndicator, className)}>
				<CheckIcon />
			</RadixCheckbox.Indicator>
		</RadixCheckbox.Root>
	)
}

export default Checkbox
