'use client'
import { useQuizStore } from '@/stores/quiz.store'
import { useUserState } from '@/stores/user.store'
import { FilterIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

function Filter() {
	const { user } = useUserState()
	const { quizzes, setFilteredQuizzes } = useQuizStore()
	const [filter, setFilter] = useState('')
	const currentId = user?.uid

	useEffect(() => {
		const filtered = quizzes.filter(quiz => {
			if (filter === 'my') {
				return quiz.userId === currentId
			}
			if (filter === 'all') {
				return true
			}
			return true
		})
		setFilteredQuizzes(filtered)
	}, [filter, currentId])

	return (
		<div className='cursor-pointer'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<FilterIcon />
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>Выберите фильтр</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
						<DropdownMenuRadioItem value='my'>Мои квизы</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='all'>Публичные</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default Filter
