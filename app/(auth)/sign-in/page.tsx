import { cn } from '@/lib/utils'
import React from 'react'
import AuthFrom from '@/components/AuthForm'


const page = () => {
    return (
        <main>
            <div className="relative flex  w-full items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:60px_60px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                    )}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
                    <div className="w-full max-w-md">
                        <AuthFrom type="sign-in"/>
                    </div>
                </div>
        </main>
    )
}

export default page
