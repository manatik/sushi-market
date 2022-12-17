import { SwitchProps } from '@radix-ui/react-switch'
import classNames from 'classnames'
import React, { FC } from 'react'
import * as RadixSwitch from '@radix-ui/react-switch'
import styles from './switch.style.module.scss'

const Switch: FC<SwitchProps & React.RefAttributes<HTMLButtonElement>> = ({
	className,
	...props
}) => {
	return (
		<RadixSwitch.Root className={classNames(styles.SwitchRoot, className)} {...props}>
			<RadixSwitch.Thumb className={styles.SwitchThumb} />
		</RadixSwitch.Root>
	)
}

export default Switch
