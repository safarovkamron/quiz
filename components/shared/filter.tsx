import { FilterIcon } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

function Filter() {
	return (
		<div className='cursor-pointer'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<FilterIcon />
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>Выберите фильт</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup>
						<DropdownMenuRadioItem value='top'>Мои квизыp</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='bottom'>Публичные</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default Filter
