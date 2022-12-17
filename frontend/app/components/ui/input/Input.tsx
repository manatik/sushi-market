import classNames from 'classnames'
import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import styles from './input.style.module.scss'

interface ExtraProps {
	label: string
	error?: string
}

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & ExtraProps

const Input = forwardRef<HTMLInputElement, Props>(({ className, label, error, ...props }, ref) => {
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
})

Input.displayName = 'Input'

export default Input
