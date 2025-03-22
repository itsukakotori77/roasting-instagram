'use client'

import React from 'react'
import Card from '@/components/global/UI/Card'
import { Instagram } from 'lucide-react'
import TextForm from '@/components/global/Form/Input/TextForm'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'

const Home = () => {

  const {
    setValue,
    handleSubmit,
    control
  } = useForm<any>({
    mode: 'onChange'
  })


  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <Card
          intent="primary"
          title="Form Roasting"
        >
          <div className="grid p-10">
            <div className="flex gap-1">
              <Instagram size={20} />
              <span className="font-bold">Instagram</span>
            </div>
            <form
              className="w-full grid"
              noValidate
              autoCapitalize="off"
              autoComplete="off"
            >
              <TextForm
                fieldLabel={{ children: '', required: false }}
                control={control}
                name="username"
              />
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home 
