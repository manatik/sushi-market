import { FC, PropsWithChildren } from 'react'

import ContextMenu from '@components/ui/context-menu/Context-menu'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'

import { useRemovePromotion, useUpdatePromotion } from '@query-hooks/usePromotion'

import { IPromotion } from '@common-types/promotion.types'

import useConfirm from '@hooks/useConfirm'
import { useContextMenu } from '@hooks/useContextMenu'

import { CREATE_CATEGORY_PATH, CREATE_PRODUCT_PATH, CREATE_SUB_CATEGORY_PATH } from '@utils/pages-paths'

import UpdatePromotion from '../update/Promotion'

interface Props extends PropsWithChildren {
	promotion: IPromotion
}

const PromotionContextMenu: FC<Props> = ({ children, promotion }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>Удалить акцию - {promotion.name}?</b>
			<p>Продукты затронуты не будут</p>
		</div>
	)

	const { ContextActions, action, handleAction, selectedItem } = useContextMenu<IPromotion>()
	const { mutate: removePromotion } = useRemovePromotion()
	const { mutate: updatePromotion } = useUpdatePromotion({ isShowToast: false })

	const isHiddenPromotion = !!promotion.dateDeleted

	const onRemove = async () => {
		const isConfirmed = await onConfirm()

		if (isConfirmed) {
			removePromotion(promotion.id)
		}
	}

	const onHide = (hidden: boolean) => {
		updatePromotion({ id: promotion.id, dto: { ...promotion, hidden: !hidden } })
	}

	return (
		<>
			<Dialog />

			{selectedItem && action === ContextActions.EDIT && (
				<UpdatePromotion promotion={selectedItem} isOpen={!!selectedItem} onClose={handleAction} />
			)}

			<ContextMenu>
				<ContextMenu.Title>{children}</ContextMenu.Title>

				<ContextMenu.Content>
					<ContextMenu.Item onClick={() => handleAction(promotion, ContextActions.DETAILS)}>Подробнее</ContextMenu.Item>

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

					<ContextMenu.Item onClick={() => handleAction(promotion, ContextActions.EDIT)}>
						Редактировать
					</ContextMenu.Item>

					<ContextMenu.Item onClick={() => onHide(isHiddenPromotion)}>
						{isHiddenPromotion ? 'Вернуть' : 'Скрыть'}
					</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Удалить</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default PromotionContextMenu
