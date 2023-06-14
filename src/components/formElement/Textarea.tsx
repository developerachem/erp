import { FormControl, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import textareaCss from './formElement.module.css'

const propps = {
    placeholder : String,
    name : String,
    handler : undefined,
    value : undefined,
    className : String
}

const CTextarea = ({placeholder, name, handler, value, className} = propps) => {
  const [label, setLabel] = useState(value ? value : '')
  console.log(value);
  

  return (
    <FormControl className={textareaCss.textarea}>
        <label className='w-full'>
            <Textarea 
                onKeyUp={(e) => setLabel(e.target.value)}
                onChange={handler} 
                name={name}  
                value={value} 
                className={className}
            />
            <span
                style={{
                    top : (label || value) && '-10%',
                    left : (label || value) && '0%',
                    fontSize : (label || value) && '12px',
                }}
            >{placeholder}</span>
        </label>
    </FormControl>
  )

}

export default CTextarea