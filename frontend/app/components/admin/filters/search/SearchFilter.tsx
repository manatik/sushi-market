import { useFilterContext } from '@components/admin/filters/Filters.context'
import Input from '@components/ui/input/Input'
import { useDebounce } from '@hooks/useDebounce'
import { ChangeEvent, FC, useEffect, useState } from 'react'

const SearchFilter: FC = () => {
	const [search, setSearch] = useState<string>('')

	const debouncedSearch = useDebounce(search, 500)

	const { setFilters } = useFilterContext()

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	useEffect(() => {
		setFilters(prev => ({ ...prev, search: debouncedSearch }))
	}, [debouncedSearch, setFilters])

	return <Input label={'Поиск'} color={'white'} onChange={handleSearch} value={search} />
}

export default SearchFilter
