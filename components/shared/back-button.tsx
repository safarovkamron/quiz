'use client'

import Link from 'next/link'

function BackButton() {
	return (
		<Link href={'/'} className='p-4  rounded-lg cursor-pointer transition'>
			<svg
				width='10'
				height='14'
				viewBox='0 0 10 14'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M7 13L1 7L7 1'
					stroke='#303030'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</Link>
	)
}

export default BackButton
