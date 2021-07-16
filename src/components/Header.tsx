import React from 'react'

interface HeaderProps {
  className: string
}

const Header:React.FC<HeaderProps> = ({ className, children }) => {
  return <header className={`se-ds-header ${className}`}>{children}</header>
}

export default Header
