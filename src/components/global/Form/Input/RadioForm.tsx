import React, { HTMLProps } from 'react'
import { joinClass } from '@/utils/common'
import RadioInput, { RadioProps } from '../BaseInput/RadioInput'
import { Control, Controller } from 'react-hook-form'
import Label, { LabelProps } from '../BaseInput/Label'

interface FieldInput extends RadioProps {
   label: string
   value: string | number
   checked?: boolean
}

interface IProps extends HTMLProps<HTMLDivElement> {
   fieldLabel: LabelProps
   fieldInput: FieldInput[]
   control: Control<any>
   name: string
   labelClassName?: string
   classNameWrapper?: string
   labelTitleClassname?: string
}

const RadioForm: React.FC<IProps> = ({
   fieldLabel,
   fieldInput,
   control,
   name,
   classNameWrapper,
   labelTitleClassname,
   ...props
}) => {
   return (
      <div {...props}>
         <Label {...fieldLabel} className={joinClass('', labelTitleClassname as string)} />
         <Controller
            control={control}
            name={name}
            render={({ field, formState: { errors } }) => (
               <>
                  <div
                     // className={joinClass(
                     //   `flex flex-col gap-1 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-7 lg:gap-y-3 mt-1`
                     // )}
                     className={joinClass(`grid md:grid-cols-3 mt-1 gap-y-3 gap-1`,
                        classNameWrapper
                     )}
                  >
                     {fieldInput.map((item, index) => (
                        <label
                           key={`radio-item-${index}-${item.value}`}
                           className="flex flex-row gap-1 items-center cursor-pointer"
                        >
                           <RadioInput
                              {...field}
                              {...item}
                              checked={field.value === item.value}
                              className={joinClass('max-h-[16px] max-w-[16px]')}
                              labelClassName={props.labelClassName}
                              isInvalid={Boolean(errors?.[name]?.message)}
                           />
                        </label>
                     ))}
                  </div>
                  {errors?.[name]?.message && (
                     <span className="text-xs text-error">
                        {errors?.[name]?.message?.toString()}
                     </span>
                  )}
               </>
            )}
         />
      </div>
   )
}

export default RadioForm

