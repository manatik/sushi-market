import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import { PropsWithChildren, Ref, forwardRef } from 'react'

import SelectItem from '@components/ui/select/SelectItem'

import styles from './select.style.module.scss'

interface SelectProps extends PropsWithChildren {
	id?: string
	placeholder: string
	onChange?: (value: string) => void
	value?: string
	fullWidth?: boolean
	disabled?: boolean
	error?: string
	position?: 'popper' | 'item-aligned'
}

function SelectRef(props: SelectProps, ref: Ref<HTMLButtonElement>) {
	const { onChange, value, fullWidth, disabled, error, placeholder, children, id, position = 'popper' } = props
	const width = fullWidth ? 'auto' : '200px'

	return (
		<div style={{ width }}>
			<RadixSelect.Root onValueChange={onChange} value={value} disabled={disabled}>
				<RadixSelect.Trigger ref={ref} id={id} className={styles.selectTrigger}>
					<RadixSelect.Value placeholder={placeholder} />

					<RadixSelect.Icon>
						<ChevronDownIcon className={styles.selectTrigger__icon} />
					</RadixSelect.Icon>
				</RadixSelect.Trigger>

				<RadixSelect.Portal>
					<RadixSelect.Content className={styles.selectContent} position={position} sideOffset={5}>
						<RadixSelect.ScrollUpButton className={styles.selectContent__scrollButton}>
							<ChevronUpIcon />
						</RadixSelect.ScrollUpButton>

						<RadixSelect.Viewport>
							<SelectItem value={''}>Не выбрано</SelectItem>
							{children}
						</RadixSelect.Viewport>

						<RadixSelect.ScrollDownButton className={styles.selectContent__scrollButton}>
							<ChevronDownIcon />
						</RadixSelect.ScrollDownButton>
					</RadixSelect.Content>
				</RadixSelect.Portal>
			</RadixSelect.Root>

			{error && <span className={styles.error}>{error}</span>}
		</div>
	)
}

const Select = forwardRef(SelectRef)
Select.displayName = 'Select'

export default Select
