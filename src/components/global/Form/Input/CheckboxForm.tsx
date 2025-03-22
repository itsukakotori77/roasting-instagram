import React, { Fragment, HTMLProps } from 'react'
import { joinClass } from '@/utils/common'
import CheckboxInput, { CheckboxProps } from '../BaseInput/CheckboxInput'
import Label, { LabelProps } from '../BaseInput/Label'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface FieldInput extends CheckboxProps {
   label: string | any
   value: string | any
   checked?: any
}

export interface CheckboxFormProps extends HTMLProps<HTMLDivElement> {
   fieldLabel?: LabelProps
   fieldInput: FieldInput[]
   name: string
   register: UseFormRegister<any>
   classNameWrapper?: string
   titleClassName?: string
   labelTitleClassName?: string
   errors?: FieldErrors<any>
}

const CheckboxForm: React.FC<CheckboxFormProps> = ({
   fieldLabel,
   fieldInput,
   register,
   errors,
   name,
   classNameWrapper,
   titleClassName,
   labelTitleClassName,
   ...props
}) => {
   return (
      <div {...props}>
         {fieldLabel && fieldInput.length > 0 && (
            <Label
               {...fieldLabel}
               className={joinClass('', labelTitleClassName as string)}
            />
         )}
         <div
            className={joinClass(
               'flex flex-col gap-1 lg:flex-row flex-wrap lg:items-center lg:gap-4 mt-1',
               classNameWrapper as string
            )}
         >
            {fieldInput.map((item, index) =>
               item.value == 'Clean & Clear' ? (
                  <Fragment key={`radio-item-${index}-${item.value}`}>
                     {/* <Tooltip anchorSelect=".clean-clear" className="z-40" place="top">
                     <p>
                        Clean & Clear : Agunan dalam posisi tidak ada sengketa/gugatan
                        hukum,
                     </p>
                     <p>debitur yang dilelang beriktikad baik dan koperatif</p>
                  </Tooltip> */}
                     <a className="clean-clear">
                        <label className="flex flex-row gap-1 items-center cursor-pointer">
                           <CheckboxInput
                              className="max-h-[16px] max-w-[16px]"
                              titleClassname={titleClassName}
                              {...item}
                              {...register(name)}
                           />
                        </label>
                     </a>
                  </Fragment>
               ) : (
                  <Fragment key={`radio-item-${index}-${item.value}`}>
                     <label className="flex flex-row gap-1 items-center cursor-pointer">
                        <CheckboxInput
                           className="max-h-[16px] max-w-[16px]"
                           titleClassname={titleClassName}
                           {...item}
                           {...register(name)}
                        />
                     </label>
                  </Fragment>
               )
            )}
         </div>
         {errors?.[name]?.message && (
            <span className="text-xs text-error">
               {errors?.[name]?.message?.toString()}
            </span>
         )}
      </div>
   )
}

export default CheckboxForm

