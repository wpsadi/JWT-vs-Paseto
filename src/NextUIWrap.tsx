"use client";
import React  from 'react'
import { NextUIProvider } from "@nextui-org/react";
function NextUIWrap({children}:{
    children: React.ReactNode
}) {
  return (
    <NextUIProvider>
{children}
    </NextUIProvider>

  )
}

export default NextUIWrap