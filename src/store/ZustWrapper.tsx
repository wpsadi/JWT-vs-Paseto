"use client";
import React, { useEffect } from 'react'
import { useAuthStore } from './authStore'

function ZustWrapper() {
    const {autoLogin} = useAuthStore();
    useEffect(()=>{
        autoLogin();
    },[])
  return null
}

export default ZustWrapper