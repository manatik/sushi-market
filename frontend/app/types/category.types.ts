export interface ICreateCategory {
	name: string
	article: string
	code: string
	orderBy?: number
	hidden?: boolean
}

export interface IUpdateCategory extends Partial<ICreateCategory> {}
