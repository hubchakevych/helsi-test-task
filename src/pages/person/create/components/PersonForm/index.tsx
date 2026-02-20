import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { yupToFormErrors } from '@shared/utils'
import { Form } from 'react-final-form'

import { FORM_TEXTS } from '../../constants'
import type { PersonFormValues } from '../../types'
import { ContactSection } from './ContactSection'
import { DocumentSection } from './DocumentSection'
import { PatientSection } from './PatientSection'
import { personValidationSchema } from './schema'

const INITIAL_VALUES: Partial<PersonFormValues> = {
  noMiddleName: true,
  noTaxId: true,
}

const validate = async (values: PersonFormValues) => {
  try {
    await personValidationSchema.validate(values, { abortEarly: false })
    return {}
  } catch (err) {
    return yupToFormErrors(err)
  }
}

export const PersonForm = () => (
  <Form<PersonFormValues>
    onSubmit={() => undefined}
    initialValues={INITIAL_VALUES}
    validate={validate}
    render={({ handleSubmit, submitting, values }) => (
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Paper elevation={1}>
          <Box px={3} py={2} borderBottom={1} borderColor="divider">
            <Typography variant="h6">{FORM_TEXTS.title}</Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={4} p={3}>
            <PatientSection />
            <Divider />
            <ContactSection />
            <Divider />
            <DocumentSection />
          </Box>

          <Box px={3} pb={3}>
            <Button type="submit" variant="contained" disabled={submitting}>
              {FORM_TEXTS.submit}
            </Button>
          </Box>
        </Paper>

        <Box mt={3}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {FORM_TEXTS.jsonPreviewTitle}
          </Typography>
          <Paper
            variant="outlined"
            component="pre"
            sx={{
              p: 2,
              bgcolor: '#fafafa',
              fontFamily: 'monospace',
              fontSize: 12,
              overflowX: 'auto',
              margin: 0,
            }}
          >
            {JSON.stringify(values, null, 2)}
          </Paper>
        </Box>
      </Box>
    )}
  />
)
