'use client'

import React, { HTMLProps, useState } from 'react'
import TextInput, { TextInputProps } from '../BaseInput/TextInput';
import Label, { LabelProps } from '../BaseInput/Label';
import { Control, Controller } from 'react-hook-form'
import { joinClass } from '@/utils/common';

interface FieldInput extends TextInputProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number'
}

export interface TextFormProps extends HTMLProps<HTMLDivElement> {
  fieldLabel: LabelProps
  fieldInput?: FieldInput
  control: Control<any>
  name: string
  prefix?: string
  suffix?: string
  regexReplace?: RegExp
  counter?: boolean
}

const TextForm: React.FC<TextFormProps> = ({
  fieldLabel,
  fieldInput,
  control,
  name,
  prefix,
  suffix,
  regexReplace,
  counter,
  ...props
}) => {
  return (
    <div {...props}>
      <Label {...fieldLabel} />
      <Controller
        defaultValue={''}
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <div
              className={joinClass(
                'flex items-center relative',
                prefix && 'input-prefix',
                suffix && 'input-suffix'
              )}
            >
              {prefix && <span>{prefix}</span>}
              <TextInput
                {...field}
                {...fieldInput}
                type={fieldInput?.type}
                onChange={e => {
                  if (!e.target.value?.replace(/\s/g, '').length) {
                    field.onChange(e.target.value?.trim())
                  } else if (regexReplace) {
                    field.onChange(e.target.value.replace(regexReplace, ''))
                  } else {
                    field.onChange(e)
                  }
                }}
                placeholder={
                  fieldInput?.placeholder ?? `Masukkan ${fieldLabel.children}`
                }
                // className={joinClass('mt-1')}
                className={joinClass(
                  `mt-1 ${fieldInput?.readOnly ? 'bg-gray-200 cursor-not-allowed' : ''
                  }`
                )}
                isInvalid={Boolean(errors?.[name]?.message)}
              />
              {suffix && <span>{suffix}</span>}
            </div>
            <div className="flex items-center justify-between mt-1">
              {errors?.[name]?.message ? (
                <span className="text-xs text-error">
                  {errors?.[name]?.message?.toString()}
                </span>
              ) : (
                <span />
              )}
              {counter && (
                <span className="text-xs text-[#929393]">
                  {field.value?.length ?? 0} / {fieldInput?.maxLength ?? '-'}
                </span>
              )}
            </div>
          </>
        )}
      />
    </div>
  )
}

export default TextForm
