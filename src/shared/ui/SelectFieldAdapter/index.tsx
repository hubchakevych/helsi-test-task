import { Error as ErrorIcon } from '@mui/icons-material'
import type { SelectProps } from '@mui/material'
import { Box, FormControl, InputLabel, Select } from '@mui/material'
import type { FieldRenderProps } from 'react-final-form'

import { FIELD_UI } from '../constants'

type Props = Omit<SelectProps, 'input'> & FieldRenderProps<string, HTMLElement> & { label: string }

export const SelectFieldAdapter = ({ input, meta, label, children, fullWidth, ...rest }: Props) => {
  const showError = meta.touched && Boolean(meta.error)

  return (
    <Box position="relative" width="100%" pb={FIELD_UI.errorSlotPaddingBottom}>
      <FormControl fullWidth={fullWidth ?? true} size="small" error={showError}>
        <InputLabel>{label}</InputLabel>
        <Select
          {...rest}
          label={label}
          value={input.value ?? ''}
          onChange={(e) => input.onChange(e.target.value)}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          name={input.name}
        >
          {children}
        </Select>
      </FormControl>

      {showError && (
        <Box
          position="absolute"
          bottom={0}
          left={FIELD_UI.errorOffsetLeft}
          right={0}
          display="flex"
          alignItems="center"
          gap={0.5}
          color="error.main"
          fontSize="0.75rem"
          lineHeight={FIELD_UI.helperLineHeight}
        >
          <ErrorIcon sx={{ fontSize: FIELD_UI.errorIconSize, flexShrink: 0 }} />
          <span>{meta.error}</span>
        </Box>
      )}
    </Box>
  )
}

