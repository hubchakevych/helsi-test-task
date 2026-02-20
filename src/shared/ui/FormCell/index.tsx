import { Box } from '@mui/material'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  half?: boolean
}

export const FormCell = ({ children, half = false }: Props) => (
  <Box
    flex={{ xs: '1 1 100%', md: half ? '1 1 calc(50% - 8px)' : '1 1 calc(33.333% - 11px)' }}
    minWidth={0}
  >
    {children}
  </Box>
)
