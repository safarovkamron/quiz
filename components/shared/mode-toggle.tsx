'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

function ModeToggle() {
	const [mount, setMount] = useState(false)
	const { setTheme, resolvedTheme } = useTheme()

	useEffect(() => setMount(true), [])

	return mount && resolvedTheme === 'dark' ? (
		<Button
			className='cursor-pointer'
			size={'icon'}
			variant={'ghost'}
			onClick={() => setTheme('light')}
			aria-label='mode-toggle-to-light'
		>
			<Sun />
		</Button>
	) : (
		<Button
			className='cursor-pointer'
			size={'icon'}
			onClick={() => setTheme('dark')}
			variant={'ghost'}
			aria-label='mode-toggle-to-dark'
		>
			<Moon />
		</Button>
	)
}

export default ModeToggle
