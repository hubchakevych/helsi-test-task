import { Box, Container } from '@mui/material'

import { PersonForm } from './components/PersonForm'

export const PersonCreatePage = () => (
  <Box bgcolor="#f5f5f5" minHeight="100vh" py={4}>
    <Container maxWidth="lg">
      <PersonForm />
    </Container>
  </Box>
)
