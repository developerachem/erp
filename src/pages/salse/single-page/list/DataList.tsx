import React from 'react'
import listCss from '../SinglePage.module.css';
import { Skeleton } from '@chakra-ui/react';

const propps = {
    title : String,
    value : String,
}

const DataList = ({title, value} = propps) => {
  return (
    <div className={listCss.list}>
        <span style={{color : 'var(--text)'}}>{title}</span>
        {!value && <h5><Skeleton height={5} /></h5> }
        {value && <h5 
          dangerouslySetInnerHTML={{__html: value || `No ${title}`}} 
          style={{
            color : title === "Status" && 'white' || 'var(--text)' ,
            padding : title === "Status" && '2px 10px',
            borderRadius : title === "Status" && '5px',
            display : title === "Status" && 'inline-block',
            fontSize : title === "Status" && '14px',
            backgroundColor : 
              (title === "Status" && value === "Draft" ) && '#ff7979' ||
              (title === "Status" && value === "Cancelled" ) && 'black' ||
              (title === "Status" && value === "Submitted" ) && 'green' 
          }}
        />}
    </div>
  )
}

export default DataList