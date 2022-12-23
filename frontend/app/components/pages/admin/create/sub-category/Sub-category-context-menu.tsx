import { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import { ISubCategory } from '@common-types/sub-category.types'
import styles from '@components/pages/admin/categories/categories.style.module.scss'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { SubCategoryService } from '@services/sub-category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	CREATE_CATEGORY_PATH,
	CREATE_PRODUCT_PATH,
	CREATE_SUB_CATEGORY_PATH
} from '@utils/pages-paths'
import { AxiosError } from 'axios'
import { FC, PropsWithChildren } from 'react'

interface Props {
	subCategory: ISubCategory
	confirm: () => Promise<boolean>
}

const SubCategoryContextMenu: FC<PropsWithChildren<Props>> = ({
	subCategory,
	confirm,
	children
}) => {
	const queryClient = useQueryClient()

	const { mutate: removeSubCategory } = useMutation<IDefaultResponse, AxiosError, string>(
		['remove-sub-category'],
		SubCategoryService.remove,
		{
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
			}
		}
	)

	const onRemove = async () => {
		const isConfirmed = await confirm()

		if (isConfirmed) {
			removeSubCategory(subCategory.id)
		}
	}

	return (
		<ContextMenu.Root>
			<ContextMenu.Trigger className='ContextMenuTrigger'>{children}</ContextMenu.Trigger>

			<ContextMenu.Portal>
				<ContextMenu.Content className={styles.contextMenu}>
					<ContextMenu.Item className={styles.contextMenu__item}>Подробнее</ContextMenu.Item>

					<ContextMenu.Item className={styles.contextMenu__item}>
						<Link href={CREATE_SUB_CATEGORY_PATH}>Создать подкатегорию</Link>
					</ContextMenu.Item>

					<ContextMenu.Item className={styles.contextMenu__item}>
						<Link href={CREATE_CATEGORY_PATH}>Создать категорию</Link>
					</ContextMenu.Item>

					<ContextMenu.Item className={styles.contextMenu__item}>
						<Link
							href={{
								pathname: CREATE_PRODUCT_PATH,
								query: { categoryId: subCategory.categoryId, subCategoryId: subCategory.id }
							}}
						>
							Добавить продукт
						</Link>
					</ContextMenu.Item>

					<ContextMenu.Item className={styles.contextMenu__item}>Редактировать</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item className={styles.contextMenu__item} onClick={onRemove}>
						Удалить
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
	)
}

export default SubCategoryContextMenu
