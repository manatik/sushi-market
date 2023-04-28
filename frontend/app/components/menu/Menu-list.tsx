import { FC } from 'react'

import styles from './menu-list.style.module.scss'

interface Props {
	items: string[]
	onClick?: (name: string) => void
}

const MenuList: FC<Props> = ({ items, onClick }) => {
	if (!items.length) {
		return null
	}

	return (
		<div className={styles.main}>
			{items.map(item => (
				<div key={item} onClick={() => onClick?.(item)}>
					{item}
				</div>
			))}
		</div>
	)
}

export default MenuList
