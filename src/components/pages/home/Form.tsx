'use client'

import React from 'react'
import { Instagram, Rocket } from 'lucide-react'
import TextForm from '@/components/global/Form/Input/TextForm'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import Button from '@/components/global/UI/Button'
import { motion } from 'framer-motion'
import { joinClass } from '@/utils/common'
import { useGetUsername } from '@/services/instagram/query'
import { yupResolver } from '@hookform/resolvers/yup';

interface IProps {
   className?: string,
   onSubmit: (data?: any) => void,
   isLoading?: boolean
}

export default function Form({ className, onSubmit, isLoading }: IProps) {

   const {
      setValue,
      handleSubmit,
      control
   } = useForm<any>({
      mode: 'onChange',
      resolver: yupResolver(Yup.object().shape({
         username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(30, 'Username must be at most 30 characters')
            .matches(/^[a-zA-Z0-9_.]+$/, 'Username can only contain letters, numbers, and underscores'),
      })),
   })

   return (
      <form
         className={joinClass('flex flex-col gap-4', className)}
         noValidate
         autoCapitalize="off"
         autoComplete="off"
         onSubmit={handleSubmit(onSubmit)}
      >
         <TextForm
            fieldLabel={{
               children: (
                  <div className="flex gap-1 items-center">
                     <Instagram size={25} />
                     <span className="font-bold text-lg">Instagram</span>
                  </div>
               ), required: false
            }}
            fieldInput={{ placeholder: 'Username' }}
            control={control}
            name="username"
         />
         <Button
            type="submit"
            className="h-12"
            isLoading={isLoading}
         >
            <span className="font-extrabold text-lg flex gap-1">
               Go Roasting!
               <motion.div
                  animate={{
                     y: [-5, 0, -5],
                     transition: { duration: 1.5, repeat: Infinity, repeatType: 'loop' }
                  }}
               >
                  🚀
               </motion.div>
            </span>
         </Button>
      </form>
   )
}
