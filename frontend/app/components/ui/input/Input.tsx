import classNames from 'classnames'
import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import styles from './input.style.module.scss'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	error?: string
	mask?: 'phone' | 'date'
	color?: 'white' | 'gray'
}

const Input = forwardRef<HTMLInputElement, Props>(
	({ className, label, error, mask, color = 'gray', ...props }, ref) => {
		return (
			<label className={styles.customField}>
				<input
					{...props}
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
)

Input.displayName = 'Input'

export default Input
