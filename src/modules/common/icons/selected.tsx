import React from "react"
import { IconProps } from "types/icon"

const Selected: React.FC<IconProps> = ({
  size = "16",
  color = "#000",
  ...attributes
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...attributes}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  )
}

export default Selected
