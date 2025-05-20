'use client'
import { useQuizStore } from '@/stores/quiz.store'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'

function Search() {
	const { quizzes, setFilteredQuizzes } = useQuizStore()
	const [value, setValue] = useState('')

	useEffect(() => {
		const term = value.toLowerCase()
		const filtered = quizzes.filter(quiz =>
			quiz.title.toLowerCase().includes(term)
		)
		setFilteredQuizzes(filtered)
	}, [value])

	return (
		<div className='w-full relative'>
			<Input
				placeholder='Search quiz...'
				type='text'
				onChange={e => setValue(e.target.value)}
			/>
			<SearchIcon className='absolute right-2 top-1 max-sm:hidden' />
		</div>
	)
}

export default Search
