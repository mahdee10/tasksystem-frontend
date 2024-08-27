import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import FilterListIcon from '@mui/icons-material/FilterList';
export default function TaskFilterDropdown({ setFilterTasks }) {
    return (
        <Menu>
            <MenuButton className={"mr-3"}>
                <FilterListIcon className="cursor-pointer  text-white "></FilterListIcon>

            </MenuButton>
            <MenuItems anchor="bottom" className={"bg-green-600 rounded-xl"}>
                <MenuItem className="border-b-2 border-white p-2 cursor-pointer">
                    <span onClick={() => setFilterTasks("done")} className="block data-[focus]:bg-blue-100">Done Tasks</span>
                </MenuItem>
                <MenuItem className="border-b-2 border-white p-2 cursor-pointer" >
                    <span onClick={() => setFilterTasks("pending")} className="block data-[focus]:bg-blue-100">Pending Tasks</span>
                </MenuItem>
                <MenuItem className=" border-white p-2 cursor-pointer">
                    <span onClick={() => setFilterTasks("all")} className="block data-[focus]:bg-blue-100">All Tasks</span>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}