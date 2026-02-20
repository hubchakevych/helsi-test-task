import { MenuItem } from '@mui/material'
import { FormCell } from '@shared/ui/FormCell'
import { FormRow } from '@shared/ui/FormRow'
import { FormSection } from '@shared/ui/FormSection'
import { SelectFieldAdapter } from '@shared/ui/SelectFieldAdapter'
import { TextFieldAdapter } from '@shared/ui/TextFieldAdapter'
import { Field, useFormState } from 'react-final-form'

import { CONTACT_METHODS, FIELD_LABELS, FIELD_NAMES, FIELD_PLACEHOLDERS, INPUT_MASKS, SECTION_TITLES, SELECT_OPTIONS } from '../../constants'
import type { PersonFormValues } from '../../types'

export const ContactSection = () => {
  const { values } = useFormState<PersonFormValues>({ subscription: { values: true } })
  const showPhone = values?.contactMethod === CONTACT_METHODS.phone
  const showEmail = values?.contactMethod === CONTACT_METHODS.email

  return (
    <FormSection title={SECTION_TITLES.contact}>
      <FormRow>
        <FormCell half>
          <Field
            name={FIELD_NAMES.contactMethod}
            render={(props) => (
              <SelectFieldAdapter {...props} label={FIELD_LABELS.contactMethod}>
                {SELECT_OPTIONS.contactMethod.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
              </SelectFieldAdapter>
            )}
          />
        </FormCell>

        <FormCell half>
          <Field
            name={FIELD_NAMES.secretWord}
            render={(props) => <TextFieldAdapter {...props} label={FIELD_LABELS.secretWord} />}
          />
        </FormCell>
      </FormRow>

      {(showPhone || showEmail) && (
        <FormRow>
          {showPhone && (
            <FormCell half>
              <Field
                name={FIELD_NAMES.phone}
                render={(props) => (
                  <TextFieldAdapter
                    {...props}
                    label={FIELD_LABELS.phone}
                    placeholder={FIELD_PLACEHOLDERS.phone}
                    mask={INPUT_MASKS.phone}
                  />
                )}
              />
            </FormCell>
          )}

          {showEmail && (
            <FormCell half>
              <Field
                name={FIELD_NAMES.email}
                render={(props) => (
                  <TextFieldAdapter
                    {...props}
                    label={FIELD_LABELS.email}
                    placeholder={FIELD_PLACEHOLDERS.email}
                  />
                )}
              />
            </FormCell>
          )}
        </FormRow>
      )}
    </FormSection>
  )
}
