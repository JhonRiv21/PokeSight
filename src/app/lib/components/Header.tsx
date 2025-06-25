import { useState } from "react"

export const Header = () => {
  const [view, setView] = useState('grid');

  return (
    <header>
      <h2>PokeSight</h2>
    </header>
  )
}