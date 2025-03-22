import React, { HTMLProps } from 'react'
import { joinClass } from '@/utils/common'
import { Control, Controller } from 'react-hook-form'
import Label, {LabelProps} from '../BaseInput/Label'
import TextAreaInput, { TextAreaInputProps } from '../BaseInput/TextAreaInput'

interface FieldInput extends TextAreaInputProps {
   type?: 'text' | 'email' | 'tel'
}

export interface TextAreaFormProps extends HTMLProps<HTMLDivElement> {
   fieldLabel: LabelProps 
   fieldInput?: FieldInput 
   control: Control<any>
   name: string 
   onChangeValue?: (val: string) => void 
   regexReplace?: RegExp 
   disableEnter?: boolean 
}

const TextAreaForm: React.FC<TextAreaFormProps> = ({
   fieldLabel,
   fieldInput,
   control,
   name,
   regexReplace,
   disableEnter,
   ...props 
}) => {
   return (
      <div {...props}>
        <Label {...fieldLabel} />
        <Controller
          defaultValue={''}
          control={control}
          name={name}
          render={({field, formState: {errors}}) => (
            <>
              <TextAreaInput
                {...field}
                {...fieldInput}
                placeholder={
                  fieldInput?.placeholder ?? `Masukkan ${fieldLabel.children}`
                }
                // className={joinClass('mt-1 -mb-2')}
                className={joinClass(
                  `mt-1 -mb-2 ${
                    fieldInput?.readOnly ? 'bg-gray-200 cursor-not-allowed' : ''
                  }`
                )}
                isInvalid={Boolean(errors?.[name]?.message)}
                onChange={e => {
                  if (!e.target.value?.replace(/\s/g, '').length) {
                    field.onChange(e.target.value?.trim())
                  } else if (regexReplace) {
                    field.onChange(e.target.value.replace(regexReplace, ''))
                  } else {
                    field.onChange(e)
                  }
                }}
                onKeyDown={e => {
                  if (disableEnter) {
                    if (e.keyCode === 13) {
                      e.preventDefault()
                    }
                  }
                }}
              />
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

export default TextAreaForm
