"use client"
import { auth } from '@/firebase'
import { useUserState } from '@/stores/user.store'
import { ReactNode, useEffect, useState } from 'react'
import FillLoading from '../shared/fill-loading'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true)

	const { setUser } = useUserState()

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) setUser(user)
			setIsLoading(false)
		})
	}, [])

	return isLoading ? <FillLoading /> : <>{children}</>
}

export default AuthProvider
