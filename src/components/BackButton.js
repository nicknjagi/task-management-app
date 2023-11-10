import React from 'react'
import { NavLink } from 'react-router-dom'
import backIcon from '../assets/images/chevron-back-outline.svg'

export default function BackButton() {
  return (
    <NavLink to="/" className="flex items-center gap-1">
      <img src={backIcon} alt="" className="w-4 inline" /> Back
    </NavLink>
  )
}
