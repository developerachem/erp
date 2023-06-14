import { Td, Tr } from '@chakra-ui/react'
import React from 'react'
import SkeletonList from './SkeletonList'

const ListSkeleton = () => {
  return (
    <Tr>
        <SkeletonList />
    </Tr>
  )
}

export default ListSkeleton