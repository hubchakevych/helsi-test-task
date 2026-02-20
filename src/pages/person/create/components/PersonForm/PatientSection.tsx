import { MenuItem } from '@mui/material'
import { FieldWithToggle } from '@shared/ui/FieldWithToggle'
import { FormCell } from '@shared/ui/FormCell'
import { FormRow } from '@shared/ui/FormRow'
import { FormSection } from '@shared/ui/FormSection'
import { SelectFieldAdapter } from '@shared/ui/SelectFieldAdapter'
import { TextFieldAdapter } from '@shared/ui/TextFieldAdapter'
import { DATE_MIN, todayInputDate } from '@shared/utils'
import { Field } from 'react-final-form'

import { DATE_TEXT, FIELD_LABELS, FIELD_NAMES, INPUT_MASKS, SECTION_TITLES, SELECT_OPTIONS } from '../../constants'

export const PatientSection = () => {
  const today = todayInputDate()

  return (
    <FormSection title={SECTION_TITLES.patient}>
      <FormRow>
        <FormCell>
          <Field
            name={FIELD_NAMES.lastName}
            render={(props) => <TextFieldAdapter {...props} label={FIELD_LABELS.lastName} />}
          />
        </FormCell>

        <FormCell>
          <Field
            name={FIELD_NAMES.firstName}
            render={(props) => <TextFieldAdapter {...props} label={FIELD_LABELS.firstName} />}
          />
        </FormCell>

        <FormCell>
          <FieldWithToggle
            fieldName={FIELD_NAMES.middleName}
            toggleName={FIELD_NAMES.noMiddleName}
            label={FIELD_LABELS.middleName}
          />
        </FormCell>
      </FormRow>

      <FormRow>
        <FormCell>
          <FieldWithToggle
            fieldName={FIELD_NAMES.taxId}
            toggleName={FIELD_NAMES.noTaxId}
            label={FIELD_LABELS.taxId}
            mask={INPUT_MASKS.taxId}
          />
        </FormCell>

        <FormCell>
          <Field
            name={FIELD_NAMES.birthDate}
            render={(props) => (
              <TextFieldAdapter
                {...props}
                type="date"
                label={FIELD_LABELS.birthDate}
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

        <FormCell>
          <Field
            name={FIELD_NAMES.sex}
            render={(props) => (
              <SelectFieldAdapter {...props} label={FIELD_LABELS.sex}>
                {SELECT_OPTIONS.sex.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
              </SelectFieldAdapter>
            )}
          />
        </FormCell>
      </FormRow>

      <FormRow>
        <FormCell half>
          <Field
            name={FIELD_NAMES.birthCountry}
            render={(props) => <TextFieldAdapter {...props} label={FIELD_LABELS.birthCountry} />}
          />
        </FormCell>

        <FormCell half>
          <Field
            name={FIELD_NAMES.birthPlace}
            render={(props) => <TextFieldAdapter {...props} label={FIELD_LABELS.birthPlace} />}
          />
        </FormCell>
      </FormRow>
    </FormSection>
  )
}
