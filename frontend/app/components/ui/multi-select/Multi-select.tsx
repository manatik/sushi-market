import { FC } from 'react'
import Select, { ActionMeta, MultiValue } from 'react-select'

export type SelectOption = {
	value: string | number
	label: string | number
}

interface Props {
	className?: string
	options: SelectOption[]
	value: MultiValue<SelectOption>
	onChange: (newValue: MultiValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void
	placeholder?: string
}

const MultiSelect: FC<Props> = ({ className, ...props }) => {
	return (
		<div>
			<Select<SelectOption, true> {...props} isMulti />
		</div>
	)
}

export default MultiSelect
