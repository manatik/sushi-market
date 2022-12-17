import SidebarItem from '@components/ui/sidebar/Sidebar-item'
import SidebarItemCollapsible from '@components/ui/sidebar/Sidebar-item-collapsible'
import { GearIcon, PlusIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React from 'react'
import styles from './sidebar.style.module.scss'
import logo from 'assets/logo.png'

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebar__logo}>
				<Image src={logo} width={120} height={30} />
			</div>

			<div className={styles.sidebar__items}>
				<SidebarItem path={'/admin/dashboard'} Icon={GearIcon} label={'Дашборд'} />
				<SidebarItem path={'/admin/categories'} Icon={GearIcon} label={'Категории'} />
				<SidebarItem path={'/admin/products'} Icon={GearIcon} label={'Продукты'} />
				<SidebarItem path={'/admin/ingredients'} Icon={GearIcon} label={'Ингредиенты'} />
				<SidebarItem path={'/admin/promotions'} Icon={GearIcon} label={'Акции'} />
				<SidebarItem path={'/admin/orders'} Icon={GearIcon} label={'Заказы'} />
				<SidebarItem path={'/admin/users'} Icon={GearIcon} label={'Пользователи'} />
				<SidebarItem path={'/admin/roles'} Icon={GearIcon} label={'Роли'} />

				<SidebarItemCollapsible title={'Создать'}>
					<SidebarItem path={'/admin/create/category'} Icon={GearIcon} label={'Категория'} />
					<SidebarItem path={'/admin/create/product'} Icon={GearIcon} label={'Продукт'} />
					<SidebarItem path={'/admin/create/ingredient'} Icon={GearIcon} label={'Ингредиент'} />
					<SidebarItem path={'/admin/create/district'} Icon={GearIcon} label={'Район'} />
					<SidebarItem path={'/admin/create/promotion'} Icon={GearIcon} label={'Акция'} />
					<SidebarItem path={'/admin/create/role'} Icon={GearIcon} label={'Роль'} />
					<SidebarItem path={'/admin/create/user'} Icon={GearIcon} label={'Пользователь'} />
				</SidebarItemCollapsible>
			</div>
		</div>
	)
}

export default Sidebar
