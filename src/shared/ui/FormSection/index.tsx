import { Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

export const FormSection = ({ title, children }: Props) => (
  <Box>
    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
      {title}
    </Typography>
    <Box display="flex" flexDirection="column" gap={2}>
      {children}
    </Box>
  </Box>
)
