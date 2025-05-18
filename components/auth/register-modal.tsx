'use client'
import { useAuthState } from '@/stores/auth.store'
import { useUserState } from '@/stores/user.store'
import { useEffect, useState } from 'react'
import SignInForm from './signIn-form'
import SignUpForm from './signUp-form'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'
import Social from './social'

function RegisterModal() {
	const { authState } = useAuthState()
	const { user } = useUserState()
	const [open, setOpen] = useState(false)
	useEffect(() => {
		if (!user) setOpen(true)
			else setOpen(false)
	}, [user])
	return (
		<Dialog open={open}>
			<DialogContent
				onPointerDownOutside={e => e.preventDefault()}
				onInteractOutside={e => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<div className='flex flex-col gap-4'>

				{authState == 'login' ? <SignInForm /> : <SignUpForm />}
				<Social />
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default RegisterModal
