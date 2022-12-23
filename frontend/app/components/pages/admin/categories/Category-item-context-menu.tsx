import { ICategory } from '@common-types/category.types'
import { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import Link from '@components/ui/link/Link'
import Separator from '@components/ui/separator/Separator'
import useConfirm from '@hooks/useConfirm'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { CategoryService } from '@services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	CREATE_CATEGORY_PATH,
	CREATE_PRODUCT_PATH,
	CREATE_SUB_CATEGORY_PATH
} from '@utils/pages-paths'
import { AxiosError } from 'axios'
import { FC, PropsWithChildren } from 'react'
import styles from './categories.style.module.scss'

interface Props {
	category: ICategory
	confirm: () => Promise<boolean>
}

const CategoryItemContextMenu: FC<PropsWithChildren<Props>> = ({ children, category, confirm }) => {
	const queryClient = useQueryClient()
	const { mutate: removeCategory } = useMutation<IDefaultResponse, AxiosError, string>(
		['remove-category'],
		CategoryService.remove,
		{
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ['categories'] })
			}
		}
	)

	const onRemove = async () => {
		const isConfirmed = await confirm()

		if (isConfirmed) {
			removeCategory(category.id)
		}
	}

	return (
		<ContextMenu.Root>
			<ContextMenu.Trigger className='ContextMenuTrigger'>{children}</ContextMenu.Trigger>

			<ContextMenu.Portal>
				<ContextMenu.Content className={styles.contextMenu}>
					<ContextMenu.Item className={styles.contextMenu__item}>Подробнее</ContextMenu.Item>

					<ContextMenu.Item className={styles.contextMenu__item}>
						<Link href={CREATE_CATEGORY_PATH}>Создать категорию</Link>
					</ContextMenu.Item>

					<ContextMenu.Item className={styles.contextMenu__item}>
						<Link href={{ pathname: CREATE_SUB_CATEGORY_PATH, query: { categoryId: category.id } }}>
							Добавить подкатегорию
						</Link>
					</ContextMenu.Item>

					<ContextMenu.Item className={styles.contextMenu__item}>
						<Link href={{ pathname: CREATE_PRODUCT_PATH, query: { categoryId: category.id } }}>
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

export default CategoryItemContextMenu
