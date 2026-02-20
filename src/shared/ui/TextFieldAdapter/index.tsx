import { Error as ErrorIcon } from '@mui/icons-material'
import type { InputBaseComponentProps, TextFieldProps } from '@mui/material'
import { Box, TextField } from '@mui/material'
import { MaskedInput } from '@shared/ui/MaskedInput'
import type { ComponentType } from 'react'
import type { FieldRenderProps } from 'react-final-form'

import { FIELD_UI } from '../constants'

type Props = TextFieldProps & FieldRenderProps<string, HTMLElement> & {
  mask?: string
}

export const TextFieldAdapter = ({ input, meta, helperText, mask, ...rest }: Props) => {
  const showError = meta.touched && Boolean(meta.error)

  const slotProps = rest.slotProps ?? {}

  const mergedSlotProps = mask
    ? {
      ...slotProps,
      input: {
        ...(slotProps.input ?? {}),
        inputComponent: MaskedInput as ComponentType<InputBaseComponentProps>,
      },
      htmlInput: {
        ...(slotProps.htmlInput ?? {}),
        mask,
      },
    }
    : slotProps

  return (
    <Box position="relative" width="100%" pb={FIELD_UI.errorSlotPaddingBottom}>
      <TextField
        {...input}
        {...rest}
        value={input.value ?? ''}
        error={showError}
        helperText=" "
        slotProps={mergedSlotProps}
        fullWidth={rest.fullWidth ?? true}
        size={rest.size ?? 'small'}
        variant={rest.variant ?? 'outlined'}
        sx={{
          ...rest.sx,
          '& .MuiFormHelperText-root': {
            margin: 0,
            minHeight: '20px',
            position: 'absolute',
            visibility: 'hidden',
          },
        }}
      />

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

      {!showError && helperText && (
        <Box
          position="absolute"
          bottom={0}
          left={FIELD_UI.errorOffsetLeft}
          right={0}
          fontSize="0.75rem"
          color="text.secondary"
          lineHeight={FIELD_UI.helperLineHeight}
        >
          {helperText}
        </Box>
      )}
    </Box>
  )
}
