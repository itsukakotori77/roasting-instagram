import { joinClass } from "@/utils/common";
import React, { ComponentPropsWithRef, forwardRef } from 'react'

export interface RadioProps extends ComponentPropsWithRef<'input'>{
   checked?: boolean 
   label?: React.ReactNode 
   isInvalid?: boolean 
   isValid?: boolean 
   labelClassName?: string 
}

const RadioInput = forwardRef<HTMLInputElement, RadioProps>(
   ({className, label, isValid, isInvalid, labelClassName, ...props}, ref) => {
      return (
         <div className="form-control mt-1">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            ref={ref}
            className={joinClass(
              'peer checked:bg-primary radio radio-xs rounded-full w-6 h-6',
              isInvalid ? 'border-error' : isValid ? 'border-success' : '',
              className
            )}
            type="radio"
            autoComplete="off"
            {...props}
          />
          <span
            className={joinClass(
              'text-base font-nunito peer-checked:text-primary',
              labelClassName
            )}
          >
            {label}
          </span>
        </label>
      </div>
      )
   }
)

RadioInput.displayName = 'RadioInput'

export default RadioInput