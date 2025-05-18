'use client'
import { auth } from '@/firebase'
import { useUserState } from '@/stores/user.store'
import { Edit2Icon, Loader2, LogOutIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

function UserBox() {
	const router = useRouter()
	const { user, setUser } = useUserState()
	if (!user) return <Loader2 className='animate-spin opacity-45' />

	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null)
			router.push('/')
		})
	}

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className='cursor-pointer'>
						<AvatarImage src={'../../public/globe.svg'} />
						<AvatarFallback className='uppercase'>
							{user.email![0]}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className='w-80'
					align='start'
					alignOffset={11}
					forceMount
				>
					<div className='flex flex-col space-y-4 p-2 '>
						<p className='text-xs font-medium leading-none text-muted-foreground'>
							{user.email}
						</p>

						<div className='flex items-center gap-x-2'>
							<div className='rounded-md bg-secondary p-1'>
								<Avatar>
									<AvatarImage src={user.photoURL!} />
									<AvatarFallback className='uppercase'>
										{user.email![0]} 
									</AvatarFallback>
								</Avatar>
							</div>

							<div className='space-y-1'>
								<p className='line-clamp-1'>
									{user.displayName ?? user.email}
									
								</p>
							</div>
						</div>
					</div>
					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<DropdownMenuItem className='cursor-pointer my-2'>
							<Link href={'profile'} className='flex gap-2 items-center'>
								<User2Icon className='w-4 h-4 mr-2' />
								<span className=''>Profile</span>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem className='cursor-pointer  my-2'>
							<Link href={'create'} className='flex gap-2 items-center'>
								<Edit2Icon className='w-4 h-4 mr-2' />
								<span className=''>Create Quiz</span>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem
							className='cursor-pointer bg-destructive my-2 '
							onClick={onLogout}
						>
							<LogOutIcon className='w-4 h-4 mr-2 text-white' />
							<span className='text-white'>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default UserBox
