'use client'
import React from 'react'
import { InlineWidget } from 'react-calendly'

function Calendly({ url }) {
  return (
    <>
      <InlineWidget
        url={url}
      />
    </>

  )
}

export default Calendly
