"use client"

import Link from "next/link"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TimelineIcon from '@mui/icons-material/Timeline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

type SelectMenuProps = {
  userId: string;
};

const SelectMenu = ({ userId }: SelectMenuProps) => {

  return(
    <div className="menuContainer">
      <ul className="menuContent">
        <li className="menuLi"><Link href={`/timeline/${userId}`}><TimelineIcon sx={{fontSize:"26px"}}/></Link></li>
        <li className="menuLi"><Link href={`/myrecord/add/${userId}`}><AddCircleIcon sx={{fontSize:"26px"}}/></Link></li>
        <li className="menuLi"><Link href={`/myMaterial/${userId}`}><BookIcon sx={{fontSize:"26px"}}/></Link></li>
        <li className="menuLi"><Link href={`/myrecord/get/${userId}`}><AccountCircleIcon sx={{fontSize:"26px"}}/></Link></li>
        <li className="menuLi"><Link href={`/myrecord/monthlyRecord/${userId}`}><CalendarMonthIcon sx={{fontSize:"26px"}}/></Link></li>
      </ul>
    </div>
  )
}

export default SelectMenu
