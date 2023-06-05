import { Skeleton, Stack, Tr } from '@chakra-ui/react'
import React from 'react'

const SkeletonList = () => {
  return (
    <Tr>
        <Stack>
            <Skeleton height='20px' width='100%' />
        </Stack>
    </Tr>
  )
}

export default SkeletonList