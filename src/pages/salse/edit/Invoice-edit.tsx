import { Box, Button, FormControl, Input, ListItem, Modal, ModalBody, ModalContent, ModalOverlay, Spinner, Table, Tbody, Td, Textarea, Th, Thead, Tr, UnorderedList, chakra, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { nextId } from '../../../utils/idGenerator'
import { useFrappeCreateDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import { useForm } from 'react-hook-form';
import SearchSelect from '../../../components/searchSelect/searchSelect';
import { generator } from "../../../utils/idGenerator"
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const init = {
  customer: "ETL-0001",
  isCampaign: false,
  company: "Excel Technologies Ltd.",
  posting_date: "",
  posting_time: "10:57:37",
  set_posting_time: 1,
  due_date: "",
  territory: "",
  update_stock: true,
  total_qty: 1,
  total: 2000,
  contact_email: "farid@excelbd.com",
  customer_name: "",
  status: "Draft",
  remarks: "",
  delivery_warehouse: "",
}
const InvoiceEdit = () => {

  const [items, setItems] = useState([])
  const [wareHouse, setWareHouse] = useState([])
  const [data, setData] = useState([])
  const [loadItems, setLoandItems] = useState([])
  const [modalId, setModalId] = useState('')

  // console.log(data);

  // load all needed data
  useEffect(() => {
    fetch("http://excel_erpnext.localhost:8000/api/resource/Item?fields=%5B%22name%22%2C%22standard_rate%22%2C%22item_name%22%2C%22item_code%22%5D&limit=200", {
      headers: {
        Authorization: "token c0d774a0441927e:0a39da4a71b6144"
      }
    }).then((res) => res.json()).then((data) => {
      // console.log(data)
      setLoandItems(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  // Create Total Function
  const total = items.reduce((acc, cur) => acc + (cur?.qty * cur?.rate), 0)
  // Item Add Handler 
  const handleItemAdd = () => {
    setItems((prev) => ([...prev, {
      tempId: generator.next().value,
      item_name: "",
      qty: 1,
      rate: 0,
      item_code: ""
    }]))
  }

  const [customer, setCustomer] = useState('This Is Toyed')
  const [territory, setTerritory] = useState("")

  // // Get Data 
  // const { data } = useFrappeGetDocList('Customer', {
  //   fields: ['customer_name', 'naming_series', 'primary_address', 'excel_remaining_balance'],
  //   limit: 200,
  // })
  const remainingBalance = data?.filter((d) => d.customer_name === customer)[0]?.excel_remaining_balance;

  // Item Delete Handler
  const handleItemDelete = (id) => {
    const newData = items.filter((item) => item.id !== id)
    setItems(newData)
  }

  // Item Input Change Handler 
  const handleInputChange = (e, id) => {

    const selectedItem = items.map(el => {
      if (el.tempId === id) return { ...el, qty: +e.target.value }
      else return el
    })
    setItems(selectedItem)
  }

  // Date Generator
  const date = new Date()
  const postingDate = date.getFullYear() + "-" + ((date.getMonth() + 2) < 9 ? '0' + (date.getMonth() + 2) : (date.getMonth() + 2)) + "-" + (date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
  const dueDate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + ((date.getDate() - 1) < 9 ? '0' + (date.getDate() - 1) : (date.getDate() - 1));

  // Input Form State Managment 
  const [form, setForm] = useState(init)

  const handleInvoiceInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // Form Field Handler 
  const handleSubmitEditInvoice = (e) => {
    e.preventDefault()

    const submitObj = {
      ...form,
      customer_name: customer,
      delivery_warehouse: wareHouse,
      territory: territory,
      items
    }

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "token c0d774a0441927e:0a39da4a71b6144"
      },
      body: JSON.stringify(submitObj),
    };

    fetch(`http://excel_erpnext.localhost:8000/api/resource/Sales Invoice`, options).then((res) => res.json()).then(() => Swal.fire({
        title: 'Success',
        text : 'Sales Invoice Edited Sucessfully',
        icon : 'success'
      })
    )
    console.log(submitObj);
  }

  const handleItemClick = (sitem, itemId) => {
    const selectItem = items.find(el => el.tempId === itemId)
    selectItem.item_name = sitem?.item_name
    selectItem.qty = sitem?.qty || selectItem.qty
    selectItem.rate = sitem?.standard_rate
    selectItem.item_code = sitem?.item_code

    // close the modal
    setModalId('')
    // console.log(selectItem);
  }

  return (
    <>
      <chakra.form onSubmit={handleSubmitEditInvoice}>
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
                field={['name', 'customer_name', 'naming_series', 'primary_address', 'excel_remaining_balance']}
                filter='customer_name'
                state={customer}
                setState={setCustomer}
                placeholder="Selected Customar"
              />
            </FormControl>
            <FormControl>
              <Input type='date' name='posting_date' onChange={(e) => setForm((prev) => ({ ...prev, posting_date: e.target.value }))} value={form.posting_date} />
            </FormControl>

          </div>
          <div className="flex gap-5 mb-5">
            <FormControl>
              <Input type='date' name="due_date" onChange={(e) => setForm((prev) => ({ ...prev, due_date: e.target.value }))} value={form.due_date} />
            </FormControl>
            <FormControl>
              <SearchSelect
                docType="Warehouse"
                field={["warehouse_name", "company"]}
                filter='warehouse_name'
                state={wareHouse}
                setState={setWareHouse}
                placeholder="Ware House"
              />
            </FormControl>
            <FormControl>
              <Input type='text' onChange={handleInvoiceInput} name="total" placeholder='Net Total' value={remainingBalance} />
            </FormControl>
            <FormControl>
              {/* <Input type='text' onChange={handleInvoiceInput} name="territory" placeholder='Select Territory' /> */}
              <SearchSelect
                docType="Territory"
                field={["territory_name", "parent_territory"]}
                filter='warehouse_name'
                state={territory}
                setState={setTerritory}
                placeholder="Territory"
              />
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
              items?.map((data) => (
                <Tr key={data?.tempId}>
                  <Td className='relative'>
                    <Input type="text" name="description" onClick={() => setModalId(data?.tempId)} value={data.item_name} onChange={(e) => handleInputChange(e, index)} placeholder='Add an item' />
                    {data.tempId === modalId &&
                      <Box className='absolute bg-slate-100 w-[93.5%] h-48 overflow-y-auto'>
                        <div >
                          <ul className='item-box !list-none flex flex-col border-l border-r border-b mt-2 rounded'>
                            {loadItems?.length > 0 && loadItems?.map((el) => (<li className='py-1.5 border-t px-3 cursor-pointer' onClick={() => handleItemClick(el, data?.tempId)}>{el?.item_name}</li>))}
                          </ul>
                        </div>
                      </Box>}

                  </Td>
                  <Td>
                    Selected Item
                  </Td>
                  <Td>
                    <Input style={{ width: '150px' }} value={data.qty} onChange={(e) => handleInputChange(e, data?.tempId)} name="qty" placeholder='0' type="text" />
                  </Td>
                  <Td><Input style={{ width: '150px' }} value={data.rate} onChange={(e) => handleInputChange(e, data?.tempId)} name="rate" placeholder='0' type="text" /></Td>
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

export default InvoiceEdit