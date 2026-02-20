import { Box } from '@mui/material'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const FormRow = ({ children }: Props) => (
  <Box display="flex" gap={2} flexWrap="wrap">
    {children}
  </Box>
)

