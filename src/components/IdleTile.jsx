import React from 'react'

export default function IdleTile(props) {
  const { rowIndex, colIndex, hdlOnClick, baseClass } = props;
  return (
    <div
      onMouseDown={(e) => hdlOnClick(e, rowIndex, colIndex)}
      key={`${rowIndex}-${colIndex}`}
      className={`${baseClass} bg-gray-100 shadow-inner-lg`}
    ></div>
  )
}
