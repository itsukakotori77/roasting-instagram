import { joinClass } from "@/utils/common";
import React, { ComponentPropsWithRef, FC, forwardRef, useMemo } from 'react'

export interface LabelProps extends ComponentPropsWithRef<'label'> {
   required?: boolean
   help?: string
   tooltipClassname?: string
   helpType?: 'info' | 'question' | 'info-fill'
   optional?: boolean
}

const Label: FC<LabelProps> = ({
   className,
   children,
   required = false,
   optional = false,
   ...props
}) => {
   const star = useMemo(() => {
      if (required) return <span className="text-red-600">*</span>
      return null
   }, [required])

   const opt = useMemo(() => {
      if (optional)
         return <span className="italic text-stone-400">&nbsp;(optional)</span>
      return null
   }, [optional])

   return (
      <label
         className={joinClass('font-medium text-xs flex items-center', className)}
         {...props}
      >
         {children}
         {star || opt}
      </label>
   )
}
Label.displayName = 'Label'

export default Label