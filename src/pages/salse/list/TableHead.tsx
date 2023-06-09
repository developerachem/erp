import { Th, Thead, Tr } from '@chakra-ui/react'
const TableHead = () => {
  return (
    <Thead>
        <Tr>
            <Th>#</Th>
            <Th>Invoice</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Customer Name</Th>
            <Th>Invoice Amount</Th>
            <Th>Net Total</Th>
            <Th>Due Amount</Th>
            <Th>Remarks</Th>
            <Th>Action</Th>
        </Tr>
    </Thead>
  )
}

export default TableHead