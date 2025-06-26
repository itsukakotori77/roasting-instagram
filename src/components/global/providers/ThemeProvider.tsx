"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Attribute, ThemeProvider as NextThemeProvider } from "next-themes";
import { joinClass } from "@/utils/common";

interface IProps {
   children: React.ReactNode;
   attribute: Attribute | Attribute[] | undefined;
   theme: "light" | "dark";
   forceTheme: "light" | "dark";
}

export default function ThemeProvider({
   children,
   attribute,
   theme,
   forceTheme,
}: IProps) {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   const renderedChildren = useMemo(() => mounted ? children : null, [mounted]);

   return (
      <NextThemeProvider 
         attribute={attribute} 
         defaultTheme={theme} 
         forcedTheme={forceTheme}
      >
         {renderedChildren} 
      </NextThemeProvider>
   );
}
