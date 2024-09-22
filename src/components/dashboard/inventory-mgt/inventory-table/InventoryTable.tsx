import React from 'react';

import styles from './InventoryTable.module.scss';

type inventoriesType = {
    cost : string;
    dateAcquired : string;
    id: number;
    itemType:string;
    location:string;
    name: string;
    photoUrl: string;
    quantity:string;
}

type inventoriesProp = {
    inventories : inventoriesType[];
}

export default function InventoryTable({inventories}:inventoriesProp) {

  return (
    <div className='overflow-x-auto'>

        <div className='font-[Raleway] font-[500] text-[16px] leading-[18.78px] mb-4'>Current Inventory</div>

        <table className='min-w-full '>
           <thead>
            <tr className={`${styles.table_head_row} bg-[#F9FAFB]`}>
                <th>Item Type</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Date Acquired</th>
                <th>Cost/Value </th>
            </tr>
           </thead>
           <tbody>
                {
                    inventories.map((item:inventoriesType) => (
                    <tr key={item.id} className={`${styles.table_data_row}`}>
                    <td>{item.itemType}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.location}</td>
                    <td>{item.dateAcquired}</td>
                    <td>{item.cost}</td>
                    </tr>
                    ))
                }
           </tbody>
        </table>

    </div>
  )
}