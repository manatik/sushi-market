import { FC, PropsWithChildren } from 'react'

import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'

import { useRemoveDistrict } from '@query-hooks/useDistricts'

import { IDistrict } from '@common-types/district.types'

import useConfirm from '@hooks/useConfirm'
import { useContextMenu } from '@hooks/useContextMenu'

import {
	CREATE_CATEGORY_PATH,
	CREATE_POINT_OF_SALE_PATH,
	CREATE_PRODUCT_PATH,
	CREATE_SUB_CATEGORY_PATH
} from '@utils/pages-paths'

import UpdateDistrict from '../update/District'

interface Props extends PropsWithChildren {
	district: IDistrict
}

const DistrictContextMenu: FC<Props> = ({ children, district }) => {
	const { Dialog: RemoveDialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>Удалить район - {district.name}?</b>
			<p>Точки продаж затронуты не будут</p>
		</div>
	)

	const { ContextActions, action, handleAction, selectedItem } = useContextMenu<IDistrict>()
	const { mutate: removeDistrict } = useRemoveDistrict()

	const onRemove = async () => {
		const isConfirmed = await onConfirm()

		if (isConfirmed) {
			removeDistrict(district.id)
		}
	}

	return (
		<>
			<RemoveDialog />

			{selectedItem && action === ContextActions.EDIT && (
				<UpdateDistrict district={selectedItem} isOpen={!!selectedItem} onClose={handleAction} />
			)}

			<ContextMenu>
				<ContextMenu.Title>{children}</ContextMenu.Title>

				<ContextMenu.Content>
					<ContextMenu.Item onClick={() => handleAction(district, ContextActions.DETAILS)}>Подробнее</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item>
						<Link href={CREATE_POINT_OF_SALE_PATH}>Создать точку продаж</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_POINT_OF_SALE_PATH}>Добавить район</Link>
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item>
						<Link href={CREATE_CATEGORY_PATH}>Создать категорию</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_SUB_CATEGORY_PATH}>Создать подкатегорию</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_PRODUCT_PATH}>Создать продукт</Link>
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={() => handleAction(district, ContextActions.EDIT)}>Редактировать</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Удалить</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default DistrictContextMenu
