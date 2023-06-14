import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataList from './list/DataList';
import { Button, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { IoCloseOutline } from 'react-icons/io5';
import InvoiceCss from './SinglePage.module.css'
import { BiLock } from 'react-icons/bi';
import Swal from 'sweetalert2';

const SinglePage = () => {
    let reload = '';
    const [load, setLoad] = useState({
        data : true,
        delete : false,
        submit : false,
        cancel : false,
    })
    const pageName = useParams().name;
    const navigate = useNavigate()
    const [data, setData] = useState({}) 
    const [button, setButton] = useState(false)   

    useEffect(() => {
        fetch(`http://excel_erpnext.localhost:8000/api/resource/Sales Invoice/${pageName}`, {
            headers: {
                Authorization: "token c0d774a0441927e:c6443d85b646cee"
            }
        }).then((res) => res.json()).then((data) => {
            setData(data.data)
        }).finally(() => {
            setLoad({...load, data : false})
        })
    }, [])

    console.log(data);
    

    // Create Total Function
    const total = data?.items?.reduce((acc, cur) => acc + (cur?.qty * cur?.rate), 0)

    // List Delete Handler
    const handleInvoiceDelete = (name: String) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "token c0d774a0441927e:c6443d85b646cee"
            },
        };
        if (name) {
            Swal.fire({
                title: 'Are you sure? ' + name,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoad({...load, delete : true})
                    fetch(`http://excel_erpnext.localhost:8000/api/resource/Sales Invoice/${name}`, options).then((res) => res.json()).then(() => {
                        Swal.fire({
                            title: 'Success',
                            text: 'Sales Invoice deleted Sucessfully',
                            icon: 'success',
                            timer : 1500,
                            timerProgressBar : true
                        })
                        setLoad({...load, delete : false})
                        navigate('/sales/list')
                    })
                }
            })
        }
    }

    // Invoice Submit Handler 
    const handleInvoiceSubmit = (name: String) => {
        setLoad({...load, submit : true})
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "token c0d774a0441927e:c6443d85b646cee"
            },
            body: JSON.stringify({
                ...data,
                docstatus : 1
            })
        };
        if(name){
            fetch(`http://excel_erpnext.localhost:8000/api/resource/Sales Invoice/${name}`, options).then((res) => res.json()).then(() => {
                reload = "submitted";
                Swal.fire({
                    title: 'Success',
                    text: 'Sales Invoice Submit Sucessfully',
                    icon: 'success',
                    timer: 1500,
                    timerProgressBar: true,
                })
            }).finally(() => {
                setLoad({...load, submit : false})
            })
        }
    }

        // Invoice Cancel Handler 
    const handleInvoiceCancel = (name: String) => {
        setLoad({...load , cancel : true})
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "token c0d774a0441927e:c6443d85b646cee"
            },
            body: JSON.stringify({
                ...data,
                docstatus : 2
            })
        };
        if(name){
            fetch(`http://excel_erpnext.localhost:8000/api/resource/Sales Invoice/${name}`, options).then((res) => res.json()).then(() => {
                reload = "cancel"
                Swal.fire({
                    title: 'Success',
                    text: 'Sales Invoice Cancel Sucessfully',
                    icon: 'success',
                    timer: 1500,
                    timerProgressBar: true,
                })
            }).finally(() => {
                setLoad({...load , cancel : false})
            })
        }
    }
    
    return (
        <>
            <div className='border rounded-md py-4 px-5' style={{backgroundColor : 'var(--bg)', borderColor : 'var(--border)'}}>
                <div className="flex items-center justify-between">
                    <h1 className='text-xl mb-2'>Details</h1>
                    <div className={`flex gap-5 items-center ${InvoiceCss.invoice_button}`}>
                        {data?.docstatus === 0 && (
                            <>
                                <div className={`flex gap-3 items-center ${InvoiceCss.button}`}
                                    style={{
                                        transform : button && 'translateX(0)',
                                        opacity : button && '1',
                                        visibility : button && 'visible',
                                    }}
                                >
                                    <Button colorScheme='green' onClick={() => handleInvoiceSubmit(data?.name)}>{load.submit ? "Loading.." : "Submit"}</Button>
                                    <Button colorScheme='yellow' onClick={() => navigate(`/sales/edit/${data?.name}`)}>Edit</Button>
                                    <Button colorScheme='red'>Reject</Button>
                                    <Button colorScheme='gray' onClick={() => handleInvoiceDelete(data?.name)} >{load.delete ? "Loading.." : "Delete"}</Button>
                                </div>
                                <button 
                                    className={`p-3 rounded-full border text-white ${InvoiceCss.default_button}`}
                                    style={{backgroundColor :'#2c4392'}}
                                    onClick={() => button ? setButton(false) : setButton(true)}
                                >
                                    {!button && <BiLock size={30} /> }
                                    {button && <IoCloseOutline size={30} />}
                                </button>
                            </>
                        )}
                        {data?.docstatus === 1 && <button
                            className={`rounded-full text-white ${InvoiceCss.default_button}`}
                            style={{backgroundColor :'#e77f67'}}
                            onClick={() => handleInvoiceCancel(data?.name)}
                        >
                            {load.cancel ? <Spinner size='md' /> : <IoCloseOutline size={30} />}

                        </button>}
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                    <DataList title="Customer" value={data?.name && `${data?.customer_name} (${data?.customer})`} />
                    <DataList title="Sales Invoice Number" value={data?.name} />
                    <DataList title="Posting Date" value={data?.posting_date} />
                    <DataList title="Remark" value={data?.remarks} />
                    <DataList title="Due Date" value={data?.due_date} />
                    <DataList title="Territory" value={data?.territory} />
                    <DataList title="Warehouse" value={data?.warehouse_name} />
                    <DataList title="Status" value={data?.docstatus === 0 && "Draft" || data?.docstatus === 1 && "Submitted" || data?.docstatus === 2 && "Cancelled" }  />
                    <DataList title="Address" value={data?.address_display} />
                </div>
            </div>
            <div className='border rounded-md py-4 px-5 mt-5' style={{backgroundColor : 'var(--bg)', borderColor : 'var(--border)'}}>
                <h1 className='text-xl mb-2' style={{color : 'var(--text)'}}>Items</h1>
                <Table variant='striped' colorScheme="gray" className='border'>
                    <Thead>
                        <Tr>                                                                                                                                                                                                                              
                            <Th>Item Name</Th>
                            <Th>Quantity</Th>
                            <Th>Rate</Th>
                            <Th>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.items?.map((d,i) => (
                                <Tr key={i}>
                                    <Td dangerouslySetInnerHTML={{__html: d?.description}} />
                                    <Td>{d?.qty}</Td>
                                    <Td>৳{d?.rate}</Td>
                                    <Td>৳{d?.qty * d?.rate}</Td>
                                </Tr>
                            ))
                        }
                        <Tr>
                            <Td></Td>
                            <Td></Td>
                            <Td><b>Total</b></Td>
                            <Td><b>৳{total}</b></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
        </>
    )
}

export default SinglePage