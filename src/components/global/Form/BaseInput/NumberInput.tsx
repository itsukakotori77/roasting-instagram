import { joinClass } from "@/utils/common";
import React, { forwardRef, PropsWithRef } from 'react'
import {NumericFormat, NumericFormatProps} from 'react-number-format'

export interface NumberInputProps extends NumericFormatProps, PropsWithRef<any> {
   isInvalid?: boolean 
   isValid?: boolean 
   allowNegative?: boolean
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
   (
      {
         className, 
         isInvalid,
         isValid,
         allowNegative = null,
         thousandSeparator = '.',
         decimalSeparator = ',',
         ...props
      }, 
      ref
   ) => {
      return (
         <div className="price-input">
           <NumericFormat
             getInputRef={ref}
             className={joinClass(
               'w-full py-2 px-3 border rounded-lg outline-none focus:border-primary/60',
               'disabled:bg-gray-200 disabled:text-gray-400',
               isInvalid
                 ? 'border-error'
                 : isValid
                 ? 'border-success'
                 : 'border-gray-300',
               className
             )}
             autoComplete="off"
             allowNegative={allowNegative}
             thousandSeparator={thousandSeparator}
             decimalSeparator={decimalSeparator}
             {...props}
           />
         </div>
       )
   }
)

NumberInput.displayName = 'NumberInput'

export default NumberInput
