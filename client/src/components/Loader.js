import React from 'react'
import loader from '../assets/images/Dual Ring.svg'

export default function Loader() {
  return (
    <div className="w-full max-w-[240px] lg:max-w-[300px] text-neutral-400 mt-24 mx-auto flex flex-col items-center">
      <h2>Loading..</h2>
      <img className="mx-auto w-10" src={loader} alt="" />
    </div>
  )
}
