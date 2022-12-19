import { CheckboxProps } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import React, { CSSProperties, FC, RefAttributes } from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import styles from './checkbox.style.module.scss'

interface Props extends CheckboxProps, RefAttributes<HTMLButtonElement> {
	size?: 'small' | 'medium' | 'large'
}

const Checkbox: FC<Props> = ({ className, size = 'medium', ...props }) => {
	const SIZES: Record<string, number> = {
		small: 10,
		medium: 15,
		large: 20
	}

	const style: CSSProperties = {
		width: SIZES[size],
		height: SIZES[size],
		...props.style
	}

	return (
		<RadixCheckbox.Root
			className={classNames(styles.CheckboxRoot, className)}
			style={style}
			{...props}
		>
			<RadixCheckbox.Indicator className={styles.CheckboxIndicator}>
				<CheckIcon />
			</RadixCheckbox.Indicator>
		</RadixCheckbox.Root>
	)
}

export default Checkbox
