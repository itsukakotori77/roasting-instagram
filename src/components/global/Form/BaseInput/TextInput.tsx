'use client'

import { joinClass } from "@/utils/common";
import React, { ComponentPropsWithRef, forwardRef } from "react";
import { AtSign } from 'lucide-react';
import { motion } from "framer-motion";

export interface TextInputProps extends ComponentPropsWithRef<"input"> {
   isLoading?: boolean;
   type?: "text" | "tel" | "email" | "number" | "password";
   isDisabled?: boolean;
   isInvalid?: boolean;
   isValid?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
   ({ className, isDisabled, isInvalid, isValid, ...props }, ref) => {
      return (
         <div className="relative w-full">
            <motion.div
               animate={{
                  x: [5, 0, 5],
                  transition: {duration: 1.5, repeat: Infinity, repeatType: 'loop'}
               }}
            >
               <AtSign className="absolute top-3 left-1.5" />
            </motion.div>
            <input
               ref={ref}
               disabled={isDisabled}
               className={joinClass(
                  "w-full bg-white border-3 py-2 px-3 rounded-lg outline-none focus:border-primary/60 ",
                  "disabled:bg-gray-200 disabled:text-gray-400",
                  "pl-10",
                  isInvalid ? "border-error" : isValid ? "border-success" : "border-[#000]",
                  className
               )}
               autoComplete="off"
               {...props}
            />
         </div>
      );
   }
);

TextInput.displayName = "TextInput";

export default TextInput;
