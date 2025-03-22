import { joinClass, calcHeight, typeTextArea } from "@/utils/common";
import React, { ComponentPropsWithRef, forwardRef, useState } from 'react'

export interface TextAreaInputProps extends ComponentPropsWithRef<'textarea'> {
   isLoading?: boolean
   isDisabled?: boolean
   isInvalid?: boolean
   isValid?: boolean
   isAutoHeight?: boolean
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
   ({ className, isDisabled, isInvalid, ...props }, ref) => {
      const [height, setHeight] = useState<string>('40px')

      return (
         <textarea
            ref={ref}
            disabled={isDisabled}
            className={joinClass(
               'w-full py-2 px-3 border rounded-lg outline-none focus:border-primary/60',
               'disabled:bg-gray-200 disabled:text-gray-400',
               isInvalid ? 'border-error' : 'border-gray-300',
               className
            )}
            rows={props.rows ?? 3}
            {...props}
            autoComplete="off"
            style={{
               height: props?.isAutoHeight ? height.toString() : 'auto',
               maxHeight: props?.isAutoHeight ? '150px' : 'none'
            }}
            onKeyUp={() => {
               if (props?.isAutoHeight) {
                  calcHeight(props.value!.toString()) == typeTextArea('chat') ? setHeight('40px')
                     : setHeight(`${calcHeight(props.value!.toString()).toString()}px`)
               }
            }}
         >
            {props.value}
         </textarea>
      )
   }
)

TextAreaInput.displayName = 'TextAreaInput'

export default TextAreaInput
