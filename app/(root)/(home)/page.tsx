'use client'
import RegisterModal from '@/components/auth/register-modal'
import { Features } from '@/constants'
import { motion } from 'framer-motion'
import FetureCard from './_components/FetureCard'
import Hero from './_components/Hero'

function Page() {
	return (
		<>
			<section className='flex flex-col gap-10 h-[100%]'>
				<div className='flex-1'>
					<Hero />
				</div>
				<motion.section
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.3 }}
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.2,
							},
						},
					}}
					className='grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-lg:gap-y-10'
				>
					{Features.map(i => (
						<FetureCard icon={<i.icon />} title={i.title} key={i.title} />
					))}
				</motion.section>
			</section>
			<RegisterModal />
		</>
	)
}

export default Page
