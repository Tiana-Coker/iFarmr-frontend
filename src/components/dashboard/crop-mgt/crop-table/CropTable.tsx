import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CropTable.module.scss';

type cropType = {
    id:number;
    cropName:string;
    status:string;
    location:string;
    quantity:number;
    sowDate:string;
    harvestDate:string;
}

type cropsProp = {
    crops : cropType[];
}

export default function CropTable({crops}:cropsProp) {
    console.log("crops", crops);

  return (
    <div className='overflow-x-auto'>

        <div className='font-[Raleway] font-[500] text-[16px] leading-[18.78px] mb-4'>Current Crops</div>

        <table className='min-w-full '>
           <thead>
            <tr className={`${styles.table_head_row} bg-[#F9FAFB]`}>
                <th>Crop name</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Sow Date</th>
                <th>Harvest Date</th>
            </tr>
           </thead>
           <tbody>
                {
                    crops?.map((item:cropType) => (
                    <tr key={item.id} className={`${styles.table_data_row}`}>
                    <td>{item.cropName}</td>
                    <td>{item.status}</td>
                    <td>{item.quantity || 0}</td>
                    <td>{item.location}</td>
                    <td>{item.sowDate}</td>
                    <td>{item.harvestDate}</td>
                    </tr>
                    ))
                }
           </tbody>
        </table>

    </div>
  )
}