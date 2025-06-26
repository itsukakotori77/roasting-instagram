import React from "react";
import Header from "./Header";
import ThemeProvider from "../providers/ThemeProvider";

interface IProps {
   title?: string;
   children: React.ReactNode;
}

const Layout = ({ title, children }: IProps) => {
   return (
      <ThemeProvider
         attribute="class"
         theme="light"
         forceTheme="light"
      >
         <div className="w-full h-screen">
            <div className="relative h-full">
               <div className="flex flex-col h-full">
                  <Header />
                  {children}
               </div>
            </div>
         </div>
      </ThemeProvider>
   );
};

export default Layout;
