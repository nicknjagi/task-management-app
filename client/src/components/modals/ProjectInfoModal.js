import { useState } from "react";
import { BadgeInfo, CircleX } from "lucide-react";

const ProjectInfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed rounded shadow overflow-hidden bottom-2 md:bottom-5 ${
        isOpen
          ? "left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-4 md:bottom-6  w-full md:w-auto"
          : "right-1"
      } transition-all duration-300`}
    >
      <div
        className={`flex gap-1 md:gap-2 items-start justify-end relative bg-white dark:bg-dark-grey sm:w-fit ml-auto ${
          isOpen ? "p-4" : "p-0"
        }`}
      >
        <button
          className={`p-2 hover:dark:bg-main-purple-hover hover:bg-main-purple hover:bg-opacity-10 hover:dark:bg-opacity-10 rounded-btn ${
            isOpen ? "order-2" : "order-1"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CircleX color="#635fc7" /> : <BadgeInfo color="#635fc7" />}
        </button>
        <p
          className={`${
            isOpen
              ? "relative translate-x-0 w-full md:max-w-[410px] lg:max-w-[600px]"
              : "absolute -translate-x-full"
          } `}
        >
          The backend server spins down when inactive, which can lead to a
          50-second delay during the initial load.
        </p>
      </div>
    </div>
  );
};
export default ProjectInfoModal;
