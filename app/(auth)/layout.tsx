import React, { ReactNode } from 'react'
import { Toaster } from "react-hot-toast";

const AuthLayout = ({ children } : { children: ReactNode }) => {
    return (
        <main>
            <Toaster
                position="top-right"
                toastOptions={{
                style: {
                    background: "#191021", // Dark background
                    color: "#fff", // White text
                    border: "2px solid #8051B7", // Purple border
                    padding: "14px",
                    fontSize: "14px",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 15px rgba(156,64,255,0.3)",
                },
                }}
            />
            {children}
        </main>
    )
}

export default AuthLayout
