import React from 'react'
import loader from '../assets/images/Dual Ring.svg'

export default function Loader() {
  return (
    <div className="text-neutral-400 w-10 mt-24 mx-auto flex flex-col items-center">
      <h2>Loading..</h2>
      <img className="mx-auto" src={loader} alt="" />
    </div>
  )
}
