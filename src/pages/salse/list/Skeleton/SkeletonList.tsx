import { Skeleton, Stack, Td, Tr } from '@chakra-ui/react'
import React from 'react'

const SkeletonList = () => {
  return (
    <Tr>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
        <Td>
          <Stack>
              <Skeleton height='20px' width='100%' />
          </Stack>
        </Td>
    </Tr>
  )
}

export default SkeletonList