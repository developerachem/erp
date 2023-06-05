import { Progress, Td, Tr } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const propps ={
  data : Object, 
  id : Number
}

const TableBody = ({data, id} = propps) => {
  // console.log(data);
  
  return (
    <>
        <Tr>
            <Td>{id}</Td>
            <Td>
                <Link to="/">{data?.name}</Link>
            </Td>
            <Td
              style={{
                color : (data?.status === 'Draft') && 'red' || 
                (data?.status === 'Completed') && 'green' || 
                (data?.status === 'To Deliver	') && 'gray'
              }}
            >{data?.status}</Td>
            <Td>{data?.posting_date}</Td>
            <Td>{data?.posting_time}</Td>
            <Td>{data?.customer_name}</Td>
            <Td>৳{data?.paid_amount}</Td>
            <Td>{data?.net_total}</Td>
            <Td>৳6,375.00</Td>
            <Td>{data?.remarks}</Td>
        </Tr>
    </>
  )
}

export default TableBody