import {
	ClipboardIcon,
	ClockIcon,
	CookieIcon,
	DashboardIcon,
	GearIcon,
	HobbyKnifeIcon,
	LayersIcon,
	PersonIcon,
	StackIcon
} from '@radix-ui/react-icons'
import logo from 'assets/logo.png'

import Sidebar from '@components/ui/sidebar/Sidebar'
import SidebarItem from '@components/ui/sidebar/Sidebar-item'
import SidebarItemCollapsible from '@components/ui/sidebar/Sidebar-item-collapsible'

import {
	ADMIN_CATEGORIES_PATH,
	ADMIN_DASHBOARD_PATH,
	ADMIN_DISTRICTS_PATH,
	ADMIN_INGREDIENTS_PATH,
	ADMIN_ORDERS_PATH,
	ADMIN_POINT_OF_SALES_PATH,
	ADMIN_PRODUCTS_PATH,
	ADMIN_PROMOTIONS_PATH,
	ADMIN_SUB_CATEGORIES_PATH,
	ADMIN_USERS_PATH,
	CREATE_CATEGORY_PATH,
	CREATE_DISTRICT_PATH,
	CREATE_INGREDIENT_PATH,
	CREATE_ORDER_PATH,
	CREATE_ORDER_STATUS_PATH,
	CREATE_POINT_OF_SALE_PATH,
	CREATE_PRODUCT_PATH,
	CREATE_PROMOTION_PATH,
	CREATE_SUB_CATEGORY_PATH,
	CREATE_USER_PATH
} from '@utils/pages-paths'

const AdminSidebar = () => {
	return (
		<Sidebar icon={logo}>
			<SidebarItem path={ADMIN_DASHBOARD_PATH} Icon={DashboardIcon} label={'Дашборд'} />
			<SidebarItem path={ADMIN_CATEGORIES_PATH} Icon={StackIcon} label={'Категории'} />
			<SidebarItem path={ADMIN_SUB_CATEGORIES_PATH} Icon={LayersIcon} label={'Подкатегории'} />
			<SidebarItem path={ADMIN_PRODUCTS_PATH} Icon={CookieIcon} label={'Продукты'} />
			<SidebarItem path={ADMIN_INGREDIENTS_PATH} Icon={HobbyKnifeIcon} label={'Ингредиенты'} />
			<SidebarItem path={ADMIN_PROMOTIONS_PATH} Icon={ClockIcon} label={'Акции'} />
			<SidebarItem path={ADMIN_ORDERS_PATH} Icon={ClipboardIcon} label={'Заказы'} />
			<SidebarItem path={ADMIN_DISTRICTS_PATH} Icon={GearIcon} label={'Районы'} />
			<SidebarItem path={ADMIN_POINT_OF_SALES_PATH} Icon={GearIcon} label={'Точки продаж'} />
			<SidebarItem path={ADMIN_USERS_PATH} Icon={PersonIcon} label={'Пользователи'} />

			<SidebarItemCollapsible title={'Создать'}>
				<SidebarItem path={CREATE_CATEGORY_PATH} Icon={StackIcon} label={'Категория'} />
				<SidebarItem path={CREATE_SUB_CATEGORY_PATH} Icon={LayersIcon} label={'Подкатегория'} />
				<SidebarItem path={CREATE_PRODUCT_PATH} Icon={CookieIcon} label={'Продукт'} />
				<SidebarItem path={CREATE_INGREDIENT_PATH} Icon={HobbyKnifeIcon} label={'Ингредиент'} />
				<SidebarItem path={CREATE_PROMOTION_PATH} Icon={ClockIcon} label={'Акция'} />
				<SidebarItem path={CREATE_ORDER_PATH} Icon={ClipboardIcon} label={'Заказ'} />
				<SidebarItem path={CREATE_DISTRICT_PATH} Icon={GearIcon} label={'Район'} />
				<SidebarItem path={CREATE_POINT_OF_SALE_PATH} Icon={GearIcon} label={'Точка продаж'} />
				<SidebarItem path={CREATE_ORDER_STATUS_PATH} Icon={GearIcon} label={'Статус заказа'} />
				<SidebarItem path={CREATE_USER_PATH} Icon={PersonIcon} label={'Пользователь'} />
			</SidebarItemCollapsible>
		</Sidebar>
	)
}

export default AdminSidebar
