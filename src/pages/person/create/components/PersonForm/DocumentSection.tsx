import { MenuItem } from '@mui/material'
import { FormCell } from '@shared/ui/FormCell'
import { FormRow } from '@shared/ui/FormRow'
import { FormSection } from '@shared/ui/FormSection'
import { SelectFieldAdapter } from '@shared/ui/SelectFieldAdapter'
import { TextFieldAdapter } from '@shared/ui/TextFieldAdapter'
import { addDays, DATE_MIN, todayInputDate } from '@shared/utils'
import { Field, useFormState } from 'react-final-form'

import { DATE_TEXT, FIELD_HELPER_TEXTS, FIELD_LABELS, FIELD_NAMES, FIELD_PLACEHOLDERS, INPUT_MASKS, SECTION_TITLES, SELECT_OPTIONS } from '../../constants'
import type { PersonFormValues } from '../../types'

export const DocumentSection = () => {
  const { values } = useFormState<PersonFormValues>({ subscription: { values: true } })
  const today = todayInputDate()
  const validUntilMin = values?.documentIssuedAt ? addDays(values.documentIssuedAt, 1) : undefined

  return (
    <FormSection title={SECTION_TITLES.document}>
      <FormRow>
        <FormCell half>
          <Field
            name={FIELD_NAMES.documentType}
            render={(props) => (
              <SelectFieldAdapter {...props} label={FIELD_LABELS.documentType}>
                {SELECT_OPTIONS.documentType.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
              </SelectFieldAdapter>
            )}
          />
        </FormCell>

        <FormCell half>
          <Field
            name={FIELD_NAMES.documentNumber}
            render={(props) => <TextFieldAdapter {...props} label={FIELD_LABELS.documentNumber} />}
          />
        </FormCell>
      </FormRow>

      <FormRow>
        <FormCell half>
          <Field
            name={FIELD_NAMES.documentIssuedAt}
            render={(props) => (
              <TextFieldAdapter
                {...props}
                type="date"
                label={FIELD_LABELS.documentIssuedAt}
                slotProps={{
                  inputLabel: { shrink: true },
                  htmlInput: {
                    min: DATE_MIN,
                    max: today,
                    lang: DATE_TEXT.locale,
                    placeholder: DATE_TEXT.placeholder,
                  },
                }}
              />
            )}
          />
        </FormCell>

        <FormCell half>
          <Field
            name={FIELD_NAMES.documentValidUntil}
            render={(props) => (
              <TextFieldAdapter
                {...props}
                type="date"
                label={FIELD_LABELS.documentValidUntil}
                slotProps={{
                  inputLabel: { shrink: true },
                  htmlInput: {
                    min: validUntilMin,
                    lang: DATE_TEXT.locale,
                    placeholder: DATE_TEXT.placeholder,
                  },
                }}
              />
            )}
          />
        </FormCell>
      </FormRow>

      <FormRow>
        <FormCell half>
          <Field
            name={FIELD_NAMES.documentIssuedBy}
            render={(props) => <TextFieldAdapter {...props} label={FIELD_LABELS.documentIssuedBy} />}
          />
        </FormCell>

        <FormCell half>
          <Field
            name={FIELD_NAMES.demographicRegisterRecord}
            render={(props) => (
              <TextFieldAdapter
                {...props}
                label={FIELD_LABELS.demographicRegisterRecord}
                placeholder={FIELD_PLACEHOLDERS.demographicRegisterRecord}
                helperText={FIELD_HELPER_TEXTS.demographicRegisterRecord}
                mask={INPUT_MASKS.demographicRegisterRecord}
              />
            )}
          />
        </FormCell>
      </FormRow>
    </FormSection>
  )
}
