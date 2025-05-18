import React from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'

function Search() {
	return (
		<div className='w-full relative'>
			<Input placeholder='Search quiz...' type='text'/>
			<SearchIcon className='absolute right-1 top-1 max-sm:hidden'/>
		</div>
	)
}

export default Search