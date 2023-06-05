import {Button, FormControl, Input, Spinner, Table, Tbody, Td, Textarea, Th, Thead, Tr, chakra } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import {nextId} from '../../../utils/idGenerator'
import { useFrappeCreateDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import { useForm } from 'react-hook-form';
import SearchSelect from '../../../components/searchSelect/searchSelect';


const SalseAdd = () => {
  const [items, setItems] = useState([])
  
  // Create Total Function
  const total =  items.reduce((acc, cur) => acc + (cur?.quantity * cur?.rate ), 0 )
  // Item Add Handler 
  const handleItemAdd = () => {
    setItems([
      ...items,
      {
        id:nextId(items?.id || 0),
        description : '',
        stock : '',
        qty : '',
        rate : '',
      }
    ])
  }  

  const [customer, setCustomer] = useState('')
  const [test, setTest] = useState('')

      // Get Data 
    const {data} = useFrappeGetDocList('Customer', {
      fields: ['customer_name', 'naming_series', 'primary_address', 'excel_remaining_balance'],
      limit: 200,
    })
    const remainingBalance = data?.filter((d) => d.customer_name === customer)[0]?.excel_remaining_balance;
        

  // Item Delete Handler
  const handleItemDelete = (id) => {
    const newData = items.filter((item) => item.id !== id)    
    setItems(newData)  
  }

  // Item Input Change Handler 
  const handleInputChange = (e, index) => {
    const newData = [...items];
    newData[index][e.target.name] = e.target.value
    setItems(newData)  
  }


  // Date Generator
  const date = new Date()
  const postingDate = date.getFullYear() + "-" + ((date.getMonth() + 2) < 9 ? '0' + (date.getMonth() + 2) : (date.getMonth() + 2)) + "-" + (date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
  const dueDate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + ((date.getDate() - 1) < 9 ? '0' + (date.getDate() - 1) : (date.getDate() - 1));

  // Input Form State Managment 
  const [form, setForm] = useState({
    customer : '',
    company : '',
    posting_date : postingDate,
    due_date : dueDate,
    territory : '',
    total : '',
    customer_name : customer,
    status : '',
    delivery_warehouse : '',
    remarks : '',
    items : items,
  })

  console.log(form);

  const handleInvoiceInput = (e) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      })
  }
  
  // Form Field Handler 
  const handleSubmitInvoice = (e) => {
    e.preventDefault()


  }

  
  return (
    <>
      <chakra.form onSubmit={handleSubmitInvoice}>
        <div className="flex justify-between border mb-3 rounded-md p-4">
          <h1 className='text-xl'>Add New Invoice</h1>
          <Button variant="outline" colorScheme="facebook" type='submit' size='sm' >Submit</Button>
        </div>
        <div className="border rounded-md mb-3 p-5">
          <h1>Details</h1>
          <div className="flex gap-5 mb-5">
            <FormControl>
              <Input type='text' placeholder='Invoice Name' name='customer' onChange={handleInvoiceInput} value="SINV-####" />
            </FormControl>
             <FormControl>
              <Input type='text' placeholder='Company' name="company" onChange={handleInvoiceInput} value="Excel Technologies Ltd." />
            </FormControl>
            <FormControl>
              <SearchSelect 
                docType="Customer" 
                field={['customer_name', 'naming_series', 'primary_address', 'excel_remaining_balance']} 
                filter='customer_name'
                state={customer}
                setState={setCustomer}
                placeholder="Selected Customar"
              />
            </FormControl>
            <FormControl>
              <Input type='date' name='posting_date' onChange={handleInvoiceInput} value={form.posting_date} />
            </FormControl>
           
          </div>
          <div className="flex gap-5 mb-5">
            <FormControl>
              <Input type='date' name="due_date" onChange={handleInvoiceInput}  value={form.due_date} />
            </FormControl>
            <FormControl>
              <SearchSelect 
                docType="Warehouse" 
                field={['warehouse_name', 'company']} 
                filter='warehouse_name'
                state={test}
                setState={setTest}
                placeholder="Ware House"
              />
            </FormControl>
            <FormControl>
              <Input type='text' onChange={handleInvoiceInput} name="total" placeholder='Net Total' value={remainingBalance} />
            </FormControl>
            <FormControl>
              <Input type='text' onChange={handleInvoiceInput} name="territory" placeholder='Select Territory'  />
            </FormControl>
          </div>
          <div className="flex gap-5 mb-5">
            <FormControl>
              <Textarea placeholder='Remark' name="remarks" onChange={handleInvoiceInput} />
            </FormControl>
          </div>
        </div>
      </chakra.form>
      <div className="border rounded-md p-5">
        <div className="flex justify-between mb-3">
           <h1>Item</h1>
           <Button onClick={handleItemAdd}>Add Item</Button>
        </div>
        <Table>
          <Thead>
            <Tr>
              <Th>
                Item
              </Th>
              <Th>
                Available Stock
              </Th>
              <Th>
                Quantity
              </Th>
              <Th>
                Rate
              </Th>
              <Th>
                Total
              </Th>
              <Th>
                
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              items?.map((data, index) =>(
                  <Tr key={index}>
                    <Td>
                      <Input type="text" name="description" value={data.description} onChange={(e) => handleInputChange(e, index)}  placeholder='Add an item' />
                    </Td>
                    <Td>
                      Selected Item
                    </Td>
                    <Td>
                      <Input style={{width : '150px'}} value={data.qty} onChange={(e) => handleInputChange(e, index)} name="qty" placeholder='0' type="text" />
                    </Td>
                    <Td><Input style={{width : '150px'}} value={data.rate} onChange={(e) => handleInputChange(e, index)} name="rate" placeholder='0' type="text" /></Td>
                    <Td>৳{(data.rate * data.qty) || 0}</Td>
                    <Td>
                      <MdOutlineDeleteOutline size={25} onClick={() => handleItemDelete(data.id)} className="cursor-pointer" color="red" />
                    </Td>
                  </Tr>
                )
              )
            }
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>Total</Td>
              <Td>৳{total || "0"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </>
  )
}

export default SalseAdd