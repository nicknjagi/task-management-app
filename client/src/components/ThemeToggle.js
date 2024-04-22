import light from '../assets/icon-light-theme.svg'
import dark from '../assets/icon-dark-theme.svg'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [lightTheme, setLightTheme] = useState(false)

    useEffect(()=>{
        if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme:dark)').matches)){
          document.documentElement.classList.add('dark')
          setLightTheme(false)
        }else {
          document.documentElement.classList.remove('dark')
          setLightTheme(true)
        }
    }, [lightTheme])

    function setTheme(){
        if(lightTheme){
            localStorage.setItem('theme', 'dark')
            setLightTheme(false)
        }
        else{
            localStorage.setItem('theme', 'light')
            setLightTheme(true)
        }
    }
    
  return (
    <div className='bg-light-grey dark:bg-very-dark-grey flex justify-center gap-6 py-4  rounded-md'>
        <img className='w-5 h-5' src={light} alt="" />
        <button onClick={setTheme} className='flex items-center bg-main-purple hover:bg-main-purple-hover w-10 h-5 p-1 rounded-xl transition'>
            <span className={`block w-[14px] h-[14px] rounded-full bg-white transition ${lightTheme ? 'mr-auto' : 'ml-auto'}`}></span>
        </button>
        <img className='w-5 h-5' src={dark} alt="" />
    </div>
  )
}
export default ThemeToggle