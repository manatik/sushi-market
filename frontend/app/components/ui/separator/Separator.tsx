import { SeparatorProps } from '@radix-ui/react-separator'
import * as RadixSeparator from '@radix-ui/react-separator'
import classNames from 'classnames'
import { FC } from 'react'
import styles from './separator.style.module.scss'

const Separator: FC<SeparatorProps> = ({ className, ...props }) => {
	return <RadixSeparator.Root {...props} className={classNames(styles.SeparatorRoot, className)} />
}

export default Separator
