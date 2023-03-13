import { CheckIcon } from '@radix-ui/react-icons'
import React, { ChangeEvent, Ref, forwardRef, useEffect, useState } from 'react'

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
	selectedValues: Set<string>
	selectedOptions: MultiSelectOption[]
	isFocused: boolean
}

const MultiSelectRef = (
	{ options, onChange, defaultValue = [], placeholder }: Props,
	inputRef: Ref<HTMLInputElement>
) => {
	const [selectState, setSelectState] = useState<SelectState>({
		selectOptions: options,
		searchTerm: '',
		selectedValues: new Set(defaultValue),
		selectedOptions: options.filter(opt => defaultValue?.includes(opt.value)),
		isFocused: false
	})

	const { selectOptions, selectedValues, selectedOptions, isFocused, searchTerm } = selectState

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
			setSelectState(prev => {
				prev.selectedValues.add(option.value)

				return {
					...prev,
					selectedOptions: [...prev.selectedOptions, option],
					searchTerm: ''
				}
			})

			return
		}

		setSelectState(prev => {
			prev.selectedValues.delete(option.value)

			return {
				...prev,
				selectedOptions: prev.selectedOptions.filter(opt => opt.value !== option.value),
				searchTerm: ''
			}
		})
	}

	useEffect(() => {
		setSelectState(prev => ({
			...prev,
			selectOptions: options.filter(option => option.label.includes(debouncedValue))
		}))
	}, [debouncedValue, options])

	useEffect(() => {
		onChange(Array.from(selectedValues))
	}, [onChange, selectedValues])

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
								{selectedValues.has(option.value) && <CheckIcon />}
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
