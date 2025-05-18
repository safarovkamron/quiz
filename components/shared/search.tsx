import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'
import { useQuizStore } from '@/stores/quiz.store'

function Search() {
	const { quizzes, setFilteredQuizzes } = useQuizStore()
	const [value, setValue] = useState('')

	useEffect(() => {
		const term = value.toLowerCase()
		const filtered = quizzes.filter(quiz =>
			quiz.title.toLowerCase().includes(term)
		)
		setFilteredQuizzes(filtered)
	}, [value, quizzes, setFilteredQuizzes])

	return (
		<div className='w-full relative'>
			<Input placeholder='Search quiz...' type='text' onChange={(e) => setValue(e.target.value)}/>
			<SearchIcon className='absolute right-2 top-1 max-sm:hidden'/>
		</div>
	)
}

export default Search