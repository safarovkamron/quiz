import Navbar from '@/app/(root)/_components/Navbar'
import { Separator } from '@/components/ui/separator'
import { IChildProps } from '@/types/index'

function Layout({ children }: IChildProps) {
	return (
		<div className='h-[85vh]'>
			<Navbar />
			<Separator />
			<main className='px-10 h-full'>{children}</main>
		</div>
	)
}

export default Layout
