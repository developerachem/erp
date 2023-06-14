import React, { useEffect, useState } from 'react'
import selectCss from './searchSelect.module.css';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { Input } from '@chakra-ui/react';

const propps = {
    docType: String,
    field: Array,
    filter: String,
    state: String,
    setState: Object,
    placeholder: String,
    optionName: String,
    edit : undefined
}

const SearchSelect = ({ docType, field, filter, state, setState, placeholder ,  edit} = propps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [option, setOption] = useState({
        open: false,
        filter: '',
    })

    const query = field.map((el) => `%22${el}%22`)

    console.log(data);
    


    // // Get Data 
    // const {data, isLoading, error} = useFrappeGetDocList(docType, {
    //     fields: field,
    //     limit: 200,
    //     filters : option.filter && [[ filter, '<=' , option?.filter ]]
    // })

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://excel_erpnext.localhost:8000/api/resource/${docType}${field.length > 0 ? `?fields=[${query}]` : ""}`, {
            headers: {
                Authorization: "token c0d774a0441927e:c6443d85b646cee"
            }
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setData(data.data)
        }).catch((err) => console.log(err)).finally(() => setIsLoading(false))
    }, [])

    
    // Label Handler Staten Managment 
    const [label, setLabel] = useState(edit ? 'true' : '')

    const handleOption = (val) => {
        setOption({ ...option, open: false })
        setState(val)
        setLabel(val)
    }

    console.log(label);
    

    return (
        <div className={selectCss.search_select}>
            <div className={selectCss.input}>
                <label className='w-full'>
                    <Input 
                        onKeyUp={(e) => setLabel(e.target.value)}
                        type="text" 
                        value={state} 
                        onChange={(e) => setState(e.target.value)} 
                        className='w-full'
                        onClick={() => option?.open ? setOption({ ...option, open: false }) : setOption({ ...option, open: true })} 
                        />
                    <span style={{
                        top : label && '-25%',
                        left : label && '0%',
                        fontSize : label && '12px',
                    }}>{placeholder}</span>
                </label>
            </div>
            <ul style={{ visibility: option?.open && 'visible', opacity: option?.open && '1' }}>
                <input type="text" placeholder="Search..." onChange={(e) => setOption({ ...option, filter: e.target.value })} />
                {data?.map((opt, i) => {
                    return (
                        <>
                            <li key={i} onClick={() => handleOption(docType === 'Customer' ? opt.customer_name
                                : docType === 'Warehouse' ? opt.warehouse_name : opt.territory_name)}>{
                                    docType === 'Customer' ? opt.customer_name
                                        : docType === 'Warehouse' ? opt.warehouse_name : opt.territory_name
                                }</li>
                        </>
                    )
                })}
                {isLoading && <li>Loading...</li>}
            </ul>
        </div>
    )
}

export default SearchSelect