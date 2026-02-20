import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

interface Props {
  mask?: string
  name?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (event: { target: { name: string; value: string } }) => void
}

export const MaskedInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, name, mask, ...props }, ref) => (
    <IMaskInput
      {...props}
      mask={mask ?? ''}
      inputRef={ref}
      onAccept={(value) =>
        onChange?.({ target: { name: name ?? '', value: String(value) } })
      }
      overwrite
    />
  ),
)

