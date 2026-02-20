import { Box } from '@mui/material'
import { SwitchFieldAdapter } from '@shared/ui/SwitchFieldAdapter'
import { TextFieldAdapter } from '@shared/ui/TextFieldAdapter'
import { Field, useField, useForm } from 'react-final-form'

interface Props {
  fieldName: string
  toggleName: string
  label: string
  mask?: string
}

export const FieldWithToggle = ({ fieldName, toggleName, label, mask }: Props) => {
  const form = useForm()
  const { input: toggleInput } = useField<boolean>(toggleName, { subscription: { value: true } })
  const isDisabled = !toggleInput.value

  return (
    <Box position="relative">
      <Box flexGrow={1}>
        <Field
          name={fieldName}
          render={(props) => (
            <TextFieldAdapter {...props} label={label} disabled={isDisabled} mask={mask} />
          )}
        />
      </Box>
      <Box position="absolute" top="0" right="0">
        <Field
          type="checkbox"
          name={toggleName}
          render={({ input: switchInput, meta }) => (
            <SwitchFieldAdapter
              input={{
                ...switchInput,
                onChange: (checked: boolean) => {
                  switchInput.onChange(checked)
                  if (!checked) {
                    form.change(fieldName, undefined)
                    form.resetFieldState(fieldName)
                  }
                },
              }}
              meta={meta}
            />
          )}
        />
      </Box>
    </Box>
  )
}
