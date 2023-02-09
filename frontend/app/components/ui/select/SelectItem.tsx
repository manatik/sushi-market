import { CheckIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import classNames from 'classnames'
import { PropsWithChildren, forwardRef } from 'react'

import styles from '@components/ui/select/select.style.module.scss'

interface SelectItemProps {
	className?: string
	value: string
}

const SelectItem = forwardRef<any, PropsWithChildren<SelectItemProps>>(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<RadixSelect.Item {...props} ref={forwardedRef} className={classNames(styles.selectItem, className)}>
				<RadixSelect.ItemText>{children}</RadixSelect.ItemText>

				<RadixSelect.ItemIndicator className={styles.selectItem__indicator}>
					<CheckIcon />
				</RadixSelect.ItemIndicator>
			</RadixSelect.Item>
		)
	}
)

SelectItem.displayName = 'SelectItem'

export default SelectItem
