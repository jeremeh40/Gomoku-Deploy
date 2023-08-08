import React from 'react'
import style from './Square.module.css'

type SquareProps = {
  id: number
}

export default function Square(props: SquareProps) {
  return (
    <div className={style.square}>
      
    </div>
  )
}
