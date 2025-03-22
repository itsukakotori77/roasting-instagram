import React, { forwardRef } from 'react'
import { MobileDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers'
import { joinClass } from '@/utils/common'

export interface DatePickerProps extends MobileDatePickerProps<any> {
   isValid?: boolean
   isInvalid?: boolean
   propsExtra?: any
   placeholder?: string
}

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerProps>(
   (
      {
         isInvalid,
         className,
         placeholder,
         ...props
      },
      ref
   ) => {
      return (
         <MobileDatePicker
            inputRef={ref as any}
            {...props}
            closeOnSelect
            onClose={() => {
               setTimeout(() => {
                  if (document.activeElement instanceof HTMLElement) {
                     document.activeElement.blur()
                  }
               }, 0)
            }}
            slotProps={{
               textField: {
                  onFocus: () => {
                     setTimeout(() => {
                        if (document.activeElement instanceof HTMLElement) {
                           document.activeElement.blur()
                        }
                     }, 0)
                  },
                  placeholder,
                  error: isInvalid,
                  size: 'small',
                  className: joinClass('custom-textfield', className as string),
               },
            }}
         />
      )
   }
)

DatePickerInput.displayName = 'DatePickerInput'

export default DatePickerInput