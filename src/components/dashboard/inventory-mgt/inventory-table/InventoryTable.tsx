import React from 'react';

import styles from './InventoryTable.module.scss';

export default function InventoryTable() {

    const inventory = [
        {
            itemType: 'Electronics',
            name: 'HP Laptop',
            quantity: 3,
            location: 'Lagos',
            dateAcquired: '12/12/2021',
            costValue: 'N200,000'
        },
        {
            itemType: 'Electronics',
            name: 'HP Laptop',
            quantity: 3,
            location: 'Lagos',
            dateAcquired: '12/12/2021',
            costValue: 'N200,000'
        },
        {
            itemType: 'Electronics',
            name: 'HP Laptop',
            quantity: 3,
            location: 'Lagos',
            dateAcquired: '12/12/2021',
            costValue: 'N200,000'
        },
        {
            itemType: 'Electronics',
            name: 'HP Laptop',
            quantity: 3,
            location: 'Lagos',
            dateAcquired: '12/12/2021',
            costValue: 'N200,000'
        }
    ]

  return (
    <div>

        <div className='font-[Raleway] font-[500] text-[16px] leading-[18.78px] mb-4'>Current Inventory</div>

        <table>
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
                    inventory.map((item, index) => (
                    <tr key={index} className={`${styles.table_data_row}`}>
                    <td>{item.itemType}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.location}</td>
                    <td>{item.dateAcquired}</td>
                    <td>{item.costValue}</td>
                    </tr>
                    ))
                }
           </tbody>
        </table>

    </div>
  )
}

const thStyles = {
    border : '1px solid #000',
};
