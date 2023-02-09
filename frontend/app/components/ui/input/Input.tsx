import classNames from 'classnames'
import React, { DetailedHTMLProps, InputHTMLAttributes, Ref, forwardRef } from 'react'

import styles from './input.style.module.scss'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	error?: string
	mask?: 'phone' | 'date'
	color?: 'white' | 'gray'
}

function InputRef(props: Props, ref: Ref<HTMLInputElement>) {
	const { className, label, error, mask, color = 'gray', ...otherProps } = props
	return (
		<label className={styles.customField}>
			<input
				{...otherProps}
				className={classNames(
					styles.input,
					{
						[styles.input_gray]: color === 'gray',
						[styles.input_white]: color === 'white'
					},
					className
				)}
				placeholder='&nbsp;'
				ref={ref}
			/>

			<span className={styles.placeholder}>{label}</span>

			{error && <span className={styles.errorMessage}>{error}</span>}
		</label>
	)
}

const Input = forwardRef(InputRef)
Input.displayName = 'Input'

export default Input
