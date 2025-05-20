'use client'
import { motion } from 'framer-motion'
import React from 'react'

interface IProps {
	icon: React.ReactNode
	title: string
}

function FetureCard({ icon, title }: IProps) {
	return (
		<motion.div
		variants={{
			hidden: { opacity: 0, y: 20 },
			visible: { opacity: 1, y: 0 },
		}}
		className='flex flex-col gap-2 justify-center items-center border-x-2 py-6 max-md:py-3 text-center'
	>
		<div>
			{icon}
			</div>
		<h3 className="mt-4 text-lg max-md:text-sm  font-semibold">{title}</h3>
		
	</motion.div>
	)
}

export default FetureCard
