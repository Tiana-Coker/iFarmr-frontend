import {useState} from 'react'
import IMAGES from "../../assets/dashboard/upcoming_task/";
import TaskModal from '../modals/TaskModal';

type Task = {
  category: string;
  description: string;
  dueDate: string;
  location: string;
  title: string;
};

type UpcomingTaskProps = {
  upcomingTask: Task[];
};

export default function UpcomingTask({upcomingTask}: UpcomingTaskProps) {

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal for adding new task

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className='font-[Raleway]'>

        <div className='flex justify-between mb-6'>
            <div className=" font-[500] text-[16px] leading-[18.78px]">Upcoming Tasks</div>
            <button onClick={openModal} className="flex gap-2 items-center text-[12px] leading-[14.09px]">
              <span className="text-[20px]"><img src={IMAGES.ADD_ICON} alt="" /></span>
              <span>New Task</span>
            </button>
            {isModalOpen && <TaskModal onClose={closeModal} />}
        </div>

        <div className="flex flex-col gap-6">
            {
              upcomingTask.map((task, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <div><img src={IMAGES.UPCOMING_TASK} alt={task.title} /></div>
                    <div>
                        <div className="flex justify-between mb-1">
                           <div className="font-[500] text-[14px] leading-[16.44px] text-[#333333]">{task.title}</div>
                           <div className="text-[11px] leading-[11.74px] text-[#666666]">{task.dueDate}</div>
                        </div>
                        <div className=" text-[12px] leading-[14.09px] text-[#666666]">{task.description}</div>
                    </div>
                  </div> 
                 
                )
              })
            }
        </div>
      
      </div>
  )
}
