import ModeToggle from '@/components/shared/mode-toggle'
import UserBox from '@/components/shared/user-box'
import Link from 'next/link'

function Navbar() {
	return (
		<div className='bg-background font-bold w-full flex items-center justify-between px-10 py-5'>
			<Link href={'/'} className='text-3xl/[30px] font-[900] font-playfair'>
				Quiz
			</Link>

			<div className='flex gap-4 items-center'>
				<ModeToggle />
				<UserBox />
			</div>
		</div>
	)
}

export default Navbar
