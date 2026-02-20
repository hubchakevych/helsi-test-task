import { CssBaseline, ThemeProvider } from '@mui/material'

import { PersonCreatePage } from './pages/person/create'
import { theme } from './theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <PersonCreatePage />
  </ThemeProvider>
)

export default App
