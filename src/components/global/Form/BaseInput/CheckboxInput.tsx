import { joinClass } from "@/utils/common";
import React, { ComponentPropsWithRef, forwardRef } from 'react'

export interface CheckboxProps extends ComponentPropsWithRef<'input'> {
   checked?: boolean
   label?: React.ReactNode
   color?: string
   titleClassname?: string
}

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxProps>(
   (
      {
         className,
         label,
         color,
         titleClassname,
         ...props
      },
      ref
   ) => {
      return (
         <div className="form-control">
            <label className="flex items-start gap-3 cursor-pointer">
               <input
                  ref={ref}
                  {...{
                     ...props,
                     className: `checkbox checkbox-primary mt-[1px] rounded-sm w-4 h-4 ${className}`,
                  }}
                  type="checkbox"
                  autoComplete="off"
               />
               <span
                  className={joinClass(
                     'text-base',
                     titleClassname,
                     color && `text-${color}`
                  )}
               >
                  {label}
               </span>
            </label>
         </div>
      )
   }
)

CheckboxInput.displayName = 'CheckboxInput'

export default CheckboxInput
