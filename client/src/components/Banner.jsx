import React, { Children } from 'react'

const Banner = (props) => {
  const {message, className, children} = props
  
  return (
    <div className={className}>
      <span>{message}</span>
      {children}
    </div>
  )
}

export default Banner