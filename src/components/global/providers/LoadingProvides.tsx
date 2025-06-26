import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useScrollLock } from 'usehooks-ts';
import { AnimatePresence, motion } from 'framer-motion';

interface LoadingProps {
   isLoading: boolean;
}

const LoadingProvider: React.FC<LoadingProps> = ({ isLoading }) => {
   const { lock, unlock } = useScrollLock({
      autoLock: false,
   });

   const [progress, setProgress] = useState(0);
   const text: string[] = 'Loading'.split('');

   useEffect(() => {
      let interval: NodeJS.Timeout;

      if (isLoading) {
         interval = setInterval(() => {
            setProgress((prevProgress) => {
               if (prevProgress < 100) {
                  return prevProgress + 5;
               }
               clearInterval(interval);
               return 100;
            });
         }, 100);
         lock();
      } else {
         unlock();
         setProgress(0);
      }

      return () => {
         if (interval) clearInterval(interval);
      };
   }, [isLoading]);

   return (

      
      <AnimatePresence>
         {isLoading && (
            <motion.div
               key="loading-overlay"
               className="absolute top-0 bg-black w-full h-screen overflow-auto z-[999] flex justify-center items-center"
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.85 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5 }}
            >
               <div className="flex flex-col justify-center space-y-4">
                  {/* <DotLottieReact
                     src="/loader/Loading.json"
                     loop
                     autoplay
                     className="z-[999]"
                  /> */}
                  <motion.div
                     className="w-full h-4 bg-[#F37600] rounded-md opacity-100"
                     initial={{ width: '0%' }}
                     animate={{ width: `${progress}%` }}
                     transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 50,
                     }}
                  />
                  <div className="flex justify-center mt-4">
                     {text.map((char, index) => (
                        <motion.span
                           key={index}
                           className="text-2xl text-white inline-block"
                           initial={{ opacity: 0, y: -30 }}
                           animate={{
                              opacity: 1,
                              y: 0,
                              transition: {
                                 type: 'spring',
                                 stiffness: 100,
                                 damping: 30,
                                 delay: index * 0.1,
                                 repeat: Infinity,
                              },
                           }}
                        >
                           {char}
                        </motion.span>
                     ))}
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default LoadingProvider;
