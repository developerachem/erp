import React, { useState } from 'react'
import selectCss from './searchSelect.module.css';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { Input } from '@chakra-ui/react';

const propps = {
    docType : String,
    field : Array,
    filter : String,
    state : String,
    setState : Object,
    placeholder : String,
    optionName : String
}

const SearchSelect = ({docType, field, filter, state, setState, placeholder} = propps) => {
    const [option, setOption] = useState({
        open : false,
        filter : '',
    })    
        

    // Get Data 
    const {data, isLoading, error} = useFrappeGetDocList(docType, {
        fields: field,
        limit: 200,
        filters : option.filter && [[ filter, '<=' , option?.filter ]]
    })


    const handleOption = (e) => {
        setOption({...option , open : false})
        setState(e.target.textContent)
    }

  return (
    <div className={selectCss.search_select}>
        <Input type="text" placeholder={placeholder} value={state} onChange={(e) => setState(e.target.value)} className='w-full' onClick={() => option?.open ? setOption({...option, open : false}) : setOption({...option, open : true})} />
        <ul style={{visibility : option?.open && 'visible', opacity : option?.open && '1'}}>
            <input type="text" placeholder="Search..." onChange={(e) => setOption({...option, filter : e.target.value})} />
            {data?.map((opt, i) => {  
                return(
                    <>
                        <li key={i} onClick={(e) => handleOption(e)}>{
                            docType === 'Customer' && opt.customer_name ||
                            docType === 'Warehouse' && opt.company
                        }</li>
                    </>
                )
            })}
            {isLoading &&  <li>Loading...</li>}
        </ul>
    </div>
  )
}

export default SearchSelect