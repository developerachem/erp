import { Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
const propps = {
  data : Object,
  filterLimit : Number
}

const TableFooter = ({data, filterLimit} = propps) => {
  

  return (
    <div className='w-full text-white py-3 px-5 justify-between flex items-center' style={{backgroundColor : '#2c4392'}}>
        <div className="flex gap-5">
          <p className='text-xl'>Total Invoice Amount</p>
          <p className='text-xl'>৳</p>
        </div>

        <div className="flex gap-5">
          <p className='text-xl'>Total Due Amount</p>
          <p className='text-xl'>৳55875269</p>
        </div>

        <div>
          <Select
            onChange={e => filterLimit(e.target.value)}
            style={{width : '65px'}}
          >
            <option style={{color : 'black'}} value="20">20</option>
            <option style={{color : 'black'}} value="50">50</option>
            <option style={{color : 'black'}} value="100">100</option>
            <option style={{color : 'black'}} value="150">150</option>
          </Select>
        </div>
    </div>
  )
}

export default TableFooter