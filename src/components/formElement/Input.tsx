import { FormControl, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import inputCss from './formElement.module.css'

const propps = {
    type : String,
    placeholder : String,
    name : String,
    handler : undefined,
    value : undefined,
    className : String
}

const CInput = ({type, placeholder, name, handler, value, className} = propps) => {
    const [label, setLabel] = useState(value ? value : '')
    
  return (
    <FormControl className={inputCss.input}>
        <label className='w-full'>
            <Input 
                onKeyUp={(e) => setLabel(e.target.value)}
                type={type} 
                onChange={handler} 
                name={name}  
                value={value} 
                className={className}
            />
            <span
                style={{
                    top : label && '-25%',
                    left : label && '0%',
                    fontSize : label && '12px',
                }}
            >{placeholder}</span>
        </label>
    </FormControl>
  )
}

export default CInput