import React from 'react'
import { cn } from "@/lib/utils"

const Background = () => {
  return (
      <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80" className="blobs">

      <path fill="#ade3e8" className="in-top " d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"></path>

      <path fill="#ade3e8" className="in-bottom " d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"></path>

      </svg>
  )
}

export default Background