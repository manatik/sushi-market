import Sidebar from '@components/ui/sidebar/Sidebar'
import SidebarItem from '@components/ui/sidebar/Sidebar-item'
import SidebarItemCollapsible from '@components/ui/sidebar/Sidebar-item-collapsible'
import { GearIcon } from '@radix-ui/react-icons'
import {
	ADMIN_CATEGORIES_PATH,
	ADMIN_DASHBOARD_PATH,
	ADMIN_DISTRICTS_PATH,
	ADMIN_INGREDIENTS_PATH,
	ADMIN_ORDERS_PATH,
	ADMIN_PRODUCTS_PATH,
	ADMIN_PROMOTIONS_PATH,
	ADMIN_ROLES_PATH,
	ADMIN_SUB_CATEGORIES_PATH,
	ADMIN_USERS_PATH,
	CREATE_CATEGORY_PATH,
	CREATE_DISTRICT_PATH,
	CREATE_INGREDIENT_PATH,
	CREATE_PRODUCT_PATH,
	CREATE_PROMOTION_PATH,
	CREATE_ROLE_PATH,
	CREATE_SUB_CATEGORY_PATH,
	CREATE_USER_PATH
} from '@utils/pages-paths'

const AdminSidebar = () => {
	return (
		<Sidebar>
			<SidebarItem path={ADMIN_DASHBOARD_PATH} Icon={GearIcon} label={'Дашборд'} />
			<SidebarItem path={ADMIN_CATEGORIES_PATH} Icon={GearIcon} label={'Категории'} />
			<SidebarItem path={ADMIN_SUB_CATEGORIES_PATH} Icon={GearIcon} label={'Подкатегории'} />
			<SidebarItem path={ADMIN_PRODUCTS_PATH} Icon={GearIcon} label={'Продукты'} />
			<SidebarItem path={ADMIN_INGREDIENTS_PATH} Icon={GearIcon} label={'Ингредиенты'} />
			<SidebarItem path={ADMIN_DISTRICTS_PATH} Icon={GearIcon} label={'Районы'} />
			<SidebarItem path={ADMIN_PROMOTIONS_PATH} Icon={GearIcon} label={'Акции'} />
			<SidebarItem path={ADMIN_ORDERS_PATH} Icon={GearIcon} label={'Заказы'} />
			<SidebarItem path={ADMIN_USERS_PATH} Icon={GearIcon} label={'Пользователи'} />
			<SidebarItem path={ADMIN_ROLES_PATH} Icon={GearIcon} label={'Роли'} />

			<SidebarItemCollapsible title={'Создать'}>
				<SidebarItem path={CREATE_CATEGORY_PATH} Icon={GearIcon} label={'Категория'} />
				<SidebarItem path={CREATE_SUB_CATEGORY_PATH} Icon={GearIcon} label={'Подкатегория'} />
				<SidebarItem path={CREATE_PRODUCT_PATH} Icon={GearIcon} label={'Продукт'} />
				<SidebarItem path={CREATE_INGREDIENT_PATH} Icon={GearIcon} label={'Ингредиент'} />
				<SidebarItem path={CREATE_PROMOTION_PATH} Icon={GearIcon} label={'Акция'} />
				<SidebarItem path={CREATE_DISTRICT_PATH} Icon={GearIcon} label={'Район'} />
				<SidebarItem path={CREATE_USER_PATH} Icon={GearIcon} label={'Пользователь'} />
				<SidebarItem path={CREATE_ROLE_PATH} Icon={GearIcon} label={'Роль'} />
			</SidebarItemCollapsible>
		</Sidebar>
	)
}

export default AdminSidebar
