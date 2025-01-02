import {useState} from "react"
import { BadgeInfo, CircleX } from "lucide-react";

const ProjectInfoModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`fixed right-3 bottom-4 ml-auto rounded ${isOpen ? 'w-auto overflow-visible' : 'overflow-hidden'}`} >
      <div className={`flex items-center gap-2 p-2 max-w-[450px] text-sm text-dark-grey dark:text-light-grey transition duration-300 origin-right ${isOpen ? 'translate-x-0 shadow dark:shadow-lines-dark' : 'translate-x-[calc(100%-56px)]'}`}>
      <button              
          className="hover:dark:bg-main-purple-hover hover:bg-main-purple hover:bg-opacity-10 hover:dark:bg-opacity-10 p-2 flex justify-center items-center rounded"
          onClick={()=>setIsOpen(!isOpen)}
        >
          {isOpen ? <CircleX color="#635fc7" /> : <BadgeInfo color="#635fc7" />}
        </button>
        
        <p className={``}>
        The backend server is hosted on a free tier platform, causing it to spin down when inactive, which can lead to a 50-second delay during the initial load.
      </p>
      </div>
    </div>
  );
};
export default ProjectInfoModal;
