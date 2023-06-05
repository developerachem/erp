import { Button, FormControl, Input, Select } from '@chakra-ui/react'
import React from 'react'

const SalseFilter = () => {
  return (
    <div className='my-5'>
        <div className="flex gap-5 mb-3">
        <FormControl>
            <Input type='text' placeholder='Invoice Number' />
        </FormControl>
        <FormControl>
            <Input type='text' placeholder='Invoice Number' />
        </FormControl>
        <Select placeholder='Status'>
            <option value="">Open</option>
            <option value="">Cancel</option>
        </Select>
        <FormControl>
            <Input type='text' placeholder='Invoice Number' />
        </FormControl>
        <FormControl>
            <Input type='date' placeholder='Invoice Number' />
        </FormControl>
        </div>
        <div className="flex gap-5 mb-3">
        <FormControl>
            <Input type='text' placeholder='Invoice Number' />
        </FormControl>
        <FormControl>
            <Input type='text' placeholder='Invoice Number' />
        </FormControl>
        <FormControl>
            <Input type='text' placeholder='Invoice Number' />
        </FormControl>
        <FormControl>
            <Input type='text' placeholder='Invoice Number' />
        </FormControl>
        <FormControl>
            <Input type='text' placeholder='Invoice Number' />
        </FormControl>
        </div>
        <div className='flex justify-end gap-2'>
        <Button variant="outline" colorScheme="facebook" size='sm' >Clear</Button>
        <Button variant="outline" colorScheme="facebook" size='sm' >Sync data</Button>
        </div>
    </div>
  )
}

export default SalseFilter