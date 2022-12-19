import classNames from 'classnames'
import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import styles from './input.style.module.scss'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	error?: string
	mask?: 'phone' | 'date'
}

const Input = forwardRef<HTMLInputElement, Props>(
	({ className, label, error, mask, ...props }, ref) => {
		return (
			<label className={styles.customField}>
				<input
					ref={ref}
					placeholder='&nbsp;'
					className={classNames(styles.input, className)}
					{...props}
				/>

				<span className={styles.placeholder}>{label}</span>

				{error && <span className={styles.errorMessage}>{error}</span>}
			</label>
		)
	}
)

Input.displayName = 'Input'

export default Input
