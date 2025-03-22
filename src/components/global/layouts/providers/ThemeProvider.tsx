import React from 'react'
import { Attribute, ThemeProvider as NextThemeProvider } from 'next-themes'

interface IProps {
   children: React.ReactNode
   attribute: Attribute | Attribute[] | undefined
   theme: 'light' | 'dark'
   forceTheme: 'light' | 'dark'
}

export default function ThemeProvider({
   children,
   attribute,
   theme,
   forceTheme
}: IProps) {
   return (
      <NextThemeProvider
         attribute={attribute}
         defaultTheme={theme}
         forcedTheme={forceTheme}
      >
         {children}
      </NextThemeProvider>
   )
}
