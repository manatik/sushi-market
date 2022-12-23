import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import { forwardRef, ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from 'react'
import styles from './select.style.module.scss'

interface SelectProps {
	id?: string
	placeholder: string
	onChange?: (value: string) => void
	value?: string
	fullWidth?: boolean
}

const Select: ForwardRefExoticComponent<PropsWithChildren<SelectProps> & RefAttributes<any>> =
	forwardRef<any, PropsWithChildren<SelectProps>>(
		({ id, placeholder, children, onChange, value, fullWidth }, ref) => {
			const width = fullWidth ? 'auto' : '200px'

			return (
				<div style={{ width }}>
					<RadixSelect.Root onValueChange={onChange} value={value}>
						<RadixSelect.Trigger ref={ref} id={id} className={styles.selectTrigger}>
							<RadixSelect.Value placeholder={placeholder} />

							<RadixSelect.Icon>
								<ChevronDownIcon className={styles.selectTrigger__icon} />
							</RadixSelect.Icon>
						</RadixSelect.Trigger>

						<RadixSelect.Portal>
							<RadixSelect.Content className={styles.selectContent}>
								<RadixSelect.ScrollUpButton className={styles.selectContent__scrollButton}>
									<ChevronUpIcon />
								</RadixSelect.ScrollUpButton>
								<RadixSelect.Viewport>{children}</RadixSelect.Viewport>
								<RadixSelect.ScrollDownButton className={styles.selectContent__scrollButton}>
									<ChevronDownIcon />
								</RadixSelect.ScrollDownButton>
							</RadixSelect.Content>
						</RadixSelect.Portal>
					</RadixSelect.Root>
				</div>
			)
		}
	)

Select.displayName = 'Select'

export default Select
