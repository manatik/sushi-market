import { CheckIcon } from '@radix-ui/react-icons'
import React, { ChangeEvent, Ref, forwardRef, useEffect, useRef, useState } from 'react'

import { MultiSelectOption } from '@components/ui/multi-select/types'

import { useClickOutside } from '@hooks/useClickOutside'
import { useDebounce } from '@hooks/useDebounce'

import styles from './multi-select.style.module.scss'

interface Props {
	options: MultiSelectOption[]
	onChange: (value: string[]) => void
	defaultValue?: string[]
	placeholder?: string
}

type SelectState = {
	selectOptions: MultiSelectOption[]
	searchTerm: string
	selectedOptions: MultiSelectOption[]
	isFocused: boolean
}

const MultiSelectRef = (
	{ options, onChange, defaultValue = [], placeholder }: Props,
	inputRef: Ref<HTMLInputElement>
) => {
	const selectedValuesRef = useRef<Set<string>>(new Set(defaultValue))
	const [selectState, setSelectState] = useState<SelectState>({
		selectOptions: options,
		searchTerm: '',
		selectedOptions: options.filter(opt => defaultValue?.includes(opt.value)),
		isFocused: false
	})

	const { selectOptions, selectedOptions, isFocused, searchTerm } = selectState

	const onClickOutside = () => {
		setSelectState(prev => ({
			...prev,
			isFocused: false
		}))
	}

	const ref = useClickOutside<HTMLDivElement, () => void>(onClickOutside)
	const debouncedValue = useDebounce(searchTerm, 300)

	const handleFocus = () => {
		setSelectState(prev => ({
			...prev,
			isFocused: true
		}))
	}

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectState(prev => ({
			...prev,
			searchTerm: e.target.value
		}))
	}

	const handleChange = (option: MultiSelectOption) => {
		if (!selectedOptions.some(opt => opt.value === option.value)) {
			selectedValuesRef.current.add(option.value)
			onChange(Array.from(selectedValuesRef.current))

			setSelectState(prev => ({
				...prev,
				selectedOptions: [...prev.selectedOptions, option],
				searchTerm: ''
			}))

			return
		}

		selectedValuesRef.current.delete(option.value)
		onChange(Array.from(selectedValuesRef.current))

		setSelectState(prev => ({
			...prev,
			selectedOptions: prev.selectedOptions.filter(opt => opt.value !== option.value),
			searchTerm: ''
		}))
	}

	useEffect(() => {
		setSelectState(prev => ({
			...prev,
			selectOptions: options.filter(option => option.label.toLowerCase().includes(debouncedValue.toLowerCase()))
		}))
	}, [debouncedValue, options])

	return (
		<div className={styles.select}>
			<div className={styles.badges}>
				{selectedOptions.map(option => (
					<div className={styles.badgesItem} key={option.value} title={'Убрать'}>
						<span onClick={() => handleChange(option)}>{option.label}</span>
					</div>
				))}
			</div>

			<div ref={ref} className={styles.control}>
				<input
					ref={inputRef}
					type='text'
					onFocus={handleFocus}
					onChange={handleSearch}
					value={searchTerm}
					placeholder={placeholder}
				/>

				{isFocused && (
					<div className={styles.list}>
						{selectOptions.map(option => (
							<div className={styles.list__item} key={option.value} onClick={() => handleChange(option)}>
								{selectedValuesRef.current.has(option.value) && <CheckIcon />}
								<span>{option.label}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

const MultiSelect = forwardRef(MultiSelectRef)
MultiSelect.displayName = 'Multi-select'

export default MultiSelect
