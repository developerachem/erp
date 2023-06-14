import { Td, Tr } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import ListSkeleton from './Skeleton/ListSkeleton';

const propps ={
  data : Object, 
  id : Number,
  loading: Boolean
}
const TableBody = ({data, id, loading} = propps) => {
  // Invoice Delete Handler
  const handleInvoiceDelete = (name = String) => {
    const documentToBeDeleted = {
      doctype : 'Sales Invoice',
      name : name
    }
    if(name){
      Swal.fire({
        title: 'Are you sure?'  + name,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            {
              title : 'Deleted Success!',
              text : 'Invoice has been deleted.',
              icon : 'success',
              timer: 1500,
              timerProgressBar: true,
            }
          )
        }
      })
    }
  }  
  
  return (
    <>
        {data && (
          <Tr>
            <Td>{id}</Td>
            <Td>
                <Link to={`/sales/${data?.name}`} className='underline'>{data?.name}</Link>
            </Td>
            <Td
              style={{
                color : (data?.docstatus === 0) && 'red' || 
                (data?.docstatus === 1) && 'green' || 
                (data?.docstatus === 2) && 'gray'
              }}
            >{data?.docstatus === 0 && "Draft" || data?.docstatus === 1 && "Submitted" || data?.docstatus === 2 && "Cancelled" }</Td>
            <Td>{data?.posting_date}</Td>
            <Td>{data?.posting_time}</Td>
            <Td>{data?.customer_name}</Td>
            <Td>৳{data?.paid_amount}</Td>
            <Td>{data?.net_total}</Td>
            <Td>৳6,375.00</Td>
            <Td>{data?.remarks}</Td>
            {/* <Td className={listCss.actions}>
              <div className={listCss.action_btn}>
                <HiOutlineDotsVertical size={20} />
                <ul>
                  <li><Link to="/">View</Link></li>
                  {data?.status === 'Draft' && <li><Link to={`/sales/edit/${data?.name}`}>Edit</Link></li>}
                  <li><button onClick={() => handleInvoiceDelete(data?.name)}>Delete</button></li>
                </ul>
              </div>
            </Td> */}
          </Tr>
        )}
        {loading && (
          <ListSkeleton />
        )}
    </>
  )
}

export default TableBody