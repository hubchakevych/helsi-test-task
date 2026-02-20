import type { SwitchProps } from '@mui/material'
import { FormControlLabel, Switch } from '@mui/material'
import type { FieldRenderProps } from 'react-final-form'

type Props = SwitchProps & FieldRenderProps<boolean, HTMLInputElement> & { label?: string }

export const SwitchFieldAdapter = ({ input, meta: _meta, label, ...rest }: Props) => (
  <FormControlLabel
    label={label ?? ''}
    control={
      <Switch
        {...rest}
        checked={Boolean(input.value)}
        onChange={(_, checked) => input.onChange(checked)}
        onBlur={() => input.onBlur()}
        onFocus={() => input.onFocus()}
        name={input.name}
      />
    }
    sx={{ m: 0 }}
  />
)
