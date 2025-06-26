'use client'

import React, { useEffect, useState } from 'react'
import Card from '@/components/global/UI/Card'
import Form from './Form'
import { useGetUsername } from '@/services/instagram/query'
import LoadingProvider from '@/components/global/providers/LoadingProvides'

const Home = () => {

  const { mutate: getUsername, isPending } = useGetUsername()
  const [isLoading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data?: any) => {
    // getUsername(data.username as string, {
    //   onSuccess: (res) => {
    //     console.log(res)
    //   },
    //   onError: (err) => {
    //     console.log(err)
    //   }
    // })

    setLoading(true);
    console.log('start loading');

    let counter = 0;
    const maxCount = 3; // run 5 times and stop

    const interval = setInterval(() => {
      console.log('interval running', counter + 1);

      counter++;
      if (counter >= maxCount) {
        clearInterval(interval); // break the interval
        setLoading(false);
        console.log('done loading');
      }
    }, 300);
  }

  return (
    <>
      <LoadingProvider isLoading={isLoading} />
      <div className="w-full h-full">
        <div className="flex justify-center items-center h-full">
          <Card
            intent="primary"
            title="Roasting Dulu Boss !! 👀"
            className="w-1/2 h-72"
          >
            <div className="grid p-10 w-full">
              <Form onSubmit={onSubmit} isLoading={isLoading} />
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home 
