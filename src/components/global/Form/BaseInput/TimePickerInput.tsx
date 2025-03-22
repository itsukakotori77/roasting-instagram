import { MobileTimePicker, MobileTimePickerProps } from '@mui/x-date-pickers'
import React, { forwardRef, PropsWithRef } from 'react'

export interface TimePickerProps extends MobileTimePickerProps<any>, PropsWithRef<any> {
   isValid?: boolean 
   isInvalid?: boolean 
   propsExtra?: any 
   placeholder?: string
}

const TimePickerInput = forwardRef<HTMLInputElement, TimePickerProps>(
   ({isValid, isInvalid, propsExtra, placeholder, ...props}, ref) => {
      return (
         <MobileTimePicker
           inputRef={ref as any}
           {...props}
           closeOnSelect
           slotProps={{
             textField: {
               placeholder,
               error: isInvalid,
               size: 'small',
               className: 'custom-textfield',
             },
           }}
         />
       )
   }
)

TimePickerInput.displayName = 'TimePickerInput'

export default TimePickerInput
