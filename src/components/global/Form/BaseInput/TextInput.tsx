'use client'

import { joinClass } from "@/utils/common";
import React, { ComponentPropsWithRef, forwardRef } from "react";

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
         <input
            ref={ref}
            disabled={isDisabled}
            className={joinClass(
               "w-full bg-white border-3 border-[#0000] py-2 px-3 rounded-lg outline-none focus:border-primary/60",
               "disabled:bg-gray-200 disabled:text-gray-400",
               isInvalid ? "border-error" : isValid ? "border-success" : "border-gray-300",
               className
            )}
            autoComplete="off"
            {...props}
         />
      );
   }
);

TextInput.displayName = "TextInput";

export default TextInput;
