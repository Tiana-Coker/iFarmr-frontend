import UPCOMING_TASK from '../../assets/dashboard/upcoming_task1.svg';
import TaskModal from '../modals/TaskModal';
import ADD_ICON from '../../assets/dashboard/add_icon1.svg';

import  { useState, useEffect } from 'react';

type Task = {
  category: string;
  description: string;
  dueDate: string;
  location: string;
  title: string;
};


export default function UpcomingTask({taskType}: {taskType: string}){

  const [upcomingTask, setUpcomingTask] = useState<Task[]>([]);
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');

  // Tasks Useeffect
  useEffect(() => {
    fetch(`${baseApiUrl}/api/v1/tasks/upcoming`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const inventoryTasks = data.filter((task: Task) => task.category === 'INVENTORY');
        setUpcomingTask(inventoryTasks);
      });
  }, [baseApiUrl, token]);

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
              <span className="text-[20px]"><img src={ADD_ICON} alt="" /></span>
              <span>New Task</span>
            </button>
            {isModalOpen && <TaskModal 
           onClose={closeModal} 
           setUpcomingTask={setUpcomingTask}
           taskType={taskType}
            
            />}
        </div>

        <div className="flex flex-col gap-6">
            {
              upcomingTask.map((task, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <div><img src={UPCOMING_TASK} alt={task.title} /></div>
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