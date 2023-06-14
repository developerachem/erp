import { Box, Button, FormControl, Input, Spinner, Table, Tbody, Td, Th, Thead, Tr, chakra } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { nextId } from '../../../utils/idGenerator'
import { useForm } from 'react-hook-form';
import SearchSelect from '../../../components/searchSelect/searchSelect';
import { generator } from "../../../utils/idGenerator"
import Swal from 'sweetalert2';
import CInput from '../../../components/formElement/Input';
import CTextarea from '../../../components/formElement/Textarea';
import { useNavigate } from 'react-router-dom';
import salseAddCss from './salseAdd.module.css';
import { HiPlus } from 'react-icons/hi';

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
}

const SalseAdd = () => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [wareHouse, setWareHouse] = useState([])
  const [data, setData] = useState([])
  const [loadItems, setLoandItems] = useState([])
  const [modalId, setModalId] = useState('')

  const Navigate = useNavigate()

  // console.log(items);

  // load all needed data
  useEffect(() => {
    fetch("http://excel_erpnext.localhost:8000/api/resource/Item?fields=%5B%22name%22%2C%22standard_rate%22%2C%22item_name%22%2C%22item_code%22%5D&limit=200", {
      headers: {
        Authorization: "token c0d774a0441927e:c6443d85b646cee"
      }
    }).then((res) => res.json()).then((data) => {
      console.log(data)
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

  const [customer, setCustomer] = useState('')
  const [territory, setTerritory] = useState("")

  // // Get Data 
  // const { data } = useFrappeGetDocList('Customer', {
  //   fields: ['customer_name', 'naming_series', 'primary_address', 'excel_remaining_balance'],
  //   limit: 200,
  // })
  const remainingBalance = data?.filter((d) => d.customer_name === customer)[0]?.excel_remaining_balance;


  // Item Delete Handler
  const handleItemDelete = (id) => {
    const newData = items.filter((item) => item.tempId !== id)
    setItems(newData)
  }
  console.log(items);

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
  const handleSubmitInvoice = (e) => {
    e.preventDefault()
    setLoading(true)

    const submitObj = {
      ...form,
      customer: customer,
      delivery_warehouse: wareHouse,
      territory: territory,
      items
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "token c0d774a0441927e:c6443d85b646cee"
      },
      body: JSON.stringify(submitObj),
    };

    fetch(`http://excel_erpnext.localhost:8000/api/resource/Sales Invoice`, options).then((res) => res.json()).then(() => Swal.fire({
      title: 'Success',
      text: 'Sales Invoice Crated Sucessfully',
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
    })).finally(() => {
      Navigate('/sales/list')
      setLoading(false)
    })
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
    console.log(selectItem);
  }
  return (
    <>
      <chakra.form onSubmit={handleSubmitInvoice}>
        <div className="flex justify-between items-center border mb-3 rounded-md p-4 m-3" style={{backgroundColor : 'var(--bg)', borderColor : 'var(--border)'}}>
          <h1 className='text-xl' style={{color : 'var(--text)'}}>Add New Invoice</h1>
          <Button 
            // variant="outline" 
            // colorScheme="facebook" 
            type='submit' 
            className={salseAddCss.submit}
          >{loading ? <Spinner size='xs' /> : "Create" } </Button>
        </div>
        <div className="border rounded-md mb-3 p-5 m-3 mt-5"  style={{backgroundColor : 'var(--bg)', borderColor : 'var(--border)'}}>
          <h1>Details</h1>
          <div className="flex gap-5 mb-5 mt-3">
            {/* <FormControl>
              <Input type='text' placeholder='Invoice Name' name='customer' onChange={handleInvoiceInput} value="SINV-####" />
            </FormControl> */}
            <CInput 
              type="text" 
              placeholder="Invoice Name" 
              name="customer" 
              handler={handleInvoiceInput} 
              value="SINV-####" 
            />

            {/* <FormControl>Navigate
              <Input type='text' placeholder='Company' name="company" onChange={handleInvoiceInput} value="Excel Technologies Ltd." />
            </FormControl> */}
            <CInput 
              type="text" 
              placeholder="Company" 
              name="company" 
              handler={handleInvoiceInput} 
              value="Excel Technologies Ltd." 
            />
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
              <label className={salseAddCss.label} >
                <span>Posting Date</span>
                <Input type='date' name='posting_date' onChange={(e) => setForm((prev) => ({ ...prev, posting_date: e.target.value }))} value={form.posting_date} />
              </label>
            </FormControl>

          </div>
          <div className="flex gap-5 mb-5">
            <FormControl>
              <label className={salseAddCss.label} >
                <span>Due Date</span>
                <Input type='date' name="due_date" onChange={(e) => setForm((prev) => ({ ...prev, due_date: e.target.value }))} value={form.due_date} />
              </label>
            </FormControl>
            
            <FormControl>
              <SearchSelect
                docType="Warehouse"
                field={["warehouse_name", "company"]}
                filter='warehouse_name'
                state={wareHouse}
                setState={setWareHouse}
                placeholder="Warehouse"
              />
            </FormControl>
            {/* <FormControl>
              <Input type='text' onChange={handleInvoiceInput} name="total" placeholder='Net Total' value={remainingBalance} />
            </FormControl> */}
              <CInput 
                type="text" 
                placeholder='Net Total'
                name="total" 
                handler={handleInvoiceInput} 
                value={remainingBalance} 
              />
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
            {/* <FormControl>
              <Textarea placeholder='Remark' name="remarks" onChange={handleInvoiceInput} />
            </FormControl> */}
            <CTextarea 
              placeholder='Remark'
              name="remarks" 
              handler={handleInvoiceInput} 
            />
          </div>
        </div>
      </chakra.form>
      <div className="border rounded-md p-5 m-3 mt-5"  style={{backgroundColor : 'var(--bg)', borderColor : 'var(--border)'}}>
        <div className="flex justify-between mb-3">
          <h1>Items</h1>
          <Button 
            onClick={handleItemAdd} 
            className={salseAddCss.add_item}
          > 
            <HiPlus /> 
            Add Item
          </Button>
        </div>
        <Table>
          <Thead>
            <Tr>
              <Th>
                Item Name
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
                    0
                  </Td>
                  <Td>
                    <Input style={{ width: '150px' }} value={data.qty} onChange={(e) => handleInputChange(e, data?.tempId)} name="qty" placeholder='0' type="text" />
                  </Td>
                  <Td><Input style={{ width: '150px' }} value={data.rate} onChange={(e) => handleInputChange(e, data?.tempId)} name="rate" placeholder='0' type="text" /></Td>
                  <Td>৳{(data.rate * data.qty) || 0}</Td>
                  <Td>
                    <RiDeleteBin6Line size={20} onClick={() => handleItemDelete(data?.tempId)} className="cursor-pointer" color="red" />
                  </Td>
                </Tr>
              )
              )
            }
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td style={{color : 'var(--text)'}}>Total</Td>
              <Td style={{color : 'var(--text)'}}>
                 <b>৳{total || "0"}</b>
              </Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </>
  )
}

export default SalseAdd