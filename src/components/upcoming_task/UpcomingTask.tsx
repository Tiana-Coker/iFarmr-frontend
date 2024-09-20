// import React from 'react'
import IMAGES from "../../assets/dashboard/upcoming_task/"

export default function UpcomingTask() {

  const upcoming = [
    {
      task_icon : IMAGES.UPCOMING_TASK,
      task_duedate: 'due tomorrow',
      task_title:'Tractors - Oil Change',
      task_desc:'Scheduled for tomorrow in Equipment Shed.'
    },
    {
      task_icon : IMAGES.UPCOMING_TASK,
      task_duedate: 'due tomorrow',
      task_title:'Tractors - Oil Change',
      task_desc:'Scheduled for tomorrow in Equipment Shed.'
    },
    {
      task_icon : IMAGES.UPCOMING_TASK,
      task_duedate: 'due tomorrow',
      task_title:'Tractors - Oil Change',
      task_desc:'Scheduled for tomorrow in Equipment Shed.'
    },
    {
      task_icon : IMAGES.UPCOMING_TASK,
      task_duedate: 'due tomorrow',
      task_title:'Tractors - Oil Change',
      task_desc:'Scheduled for tomorrow in Equipment Shed.'
    }
  ]
  return (
    <div className='border font-[Raleway]'>

        <div className='flex justify-between mb-6'>
            <div className=" font-[500] text-[16px] leading-[18.78px]">Upcoming Tasks</div>
            <div className=" text-[12px] leading-[14.09px]"> + New Task</div>
        </div>

        <div className="flex flex-col gap-6">
            {
              upcoming.map((task, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <div><img src={task.task_icon} alt={task.task_title} /></div>
                    <div>
                        <div className="flex justify-between mb-1">
                           <div className="font-[500] text-[14px] leading-[16.44px] text-[#333333]">{task.task_title}</div>
                           <div className="text-[10px] leading-[11.74px] text-[#666666]">{task.task_duedate}</div>
                        </div>
                        <div className=" text-[12px] leading-[14.09px] text-[#666666]">{task.task_desc}</div>
                    </div>
                  </div> 
                 
                )
              })
            }
        </div>
      
      </div>
  )
}
