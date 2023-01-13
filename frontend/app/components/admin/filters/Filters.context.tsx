import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export type FiltersObject = {
	search?: string
	categoryId?: string
	subCategoryId?: string
	onlyHidden?: boolean
}

interface IFilterContext {
	filters: FiltersObject
	setFilters: Dispatch<SetStateAction<FiltersObject>>
}

export const FiltersContext = createContext<IFilterContext | undefined>(undefined)

export const useFilterContext = () => {
	const context = useContext(FiltersContext)

	if (!context) {
		throw new Error('use this component inside Filters component')
	}

	return context
}
