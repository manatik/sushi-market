import { FC, PropsWithChildren } from 'react'

import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'

import { useRemovePointOfSale } from '@query-hooks/usePointsOfSale'

import { IPointOfSale } from '@common-types/point-of-sale.types'

import useConfirm from '@hooks/useConfirm'
import { useContextMenu } from '@hooks/useContextMenu'

import { CREATE_DISTRICT_PATH, CREATE_PRODUCT_PATH } from '@utils/pages-paths'

import UpdatePointOfSale from '../update/Point-of-sale'

interface Props extends PropsWithChildren {
	pointOfSale: IPointOfSale
}

const PointOfSaleContextMenu: FC<Props> = ({ children, pointOfSale }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>Удалить точку продаж - {pointOfSale.addressPointSale}?</b>
		</div>
	)

	const { ContextActions, action, handleAction, selectedItem } = useContextMenu<IPointOfSale>()
	const { mutate: removePointOfSale } = useRemovePointOfSale()

	const onRemove = async () => {
		const isConfirmed = await onConfirm()

		if (isConfirmed) {
			removePointOfSale(pointOfSale.id)
		}
	}

	return (
		<>
			<Dialog />

			{selectedItem && action === ContextActions.EDIT && (
				<UpdatePointOfSale pointOfSale={selectedItem} isOpen={!!selectedItem} onClose={handleAction} />
			)}

			<ContextMenu>
				<ContextMenu.Title>{children}</ContextMenu.Title>

				<ContextMenu.Content>
					<ContextMenu.Item onClick={() => handleAction(pointOfSale, ContextActions.DETAILS)}>
						Подробнее
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link href={CREATE_PRODUCT_PATH}>Добавить продукт</Link>
					</ContextMenu.Item>

					<ContextMenu.Item>
						<Link
							href={{
								pathname: CREATE_DISTRICT_PATH,
								query: { pointOfSaleId: pointOfSale.id }
							}}
						>
							Добавить район
						</Link>
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={() => handleAction(pointOfSale, ContextActions.EDIT)}>
						Редактировать
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Удалить</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default PointOfSaleContextMenu
