import React from 'react'

type Props = {
  checked: boolean
  onChange: (val: boolean) => void
  className?: string
  disabled?: boolean
}

export const Switch = ({ checked, onChange, className = '', disabled = false }: Props) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      data-state={checked ? 'checked' : 'unchecked'}
    >
      <span className="sr-only">{checked ? 'On' : 'Off'}</span>
      <span
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? 'translate-x-5' : ''
        }`}
      />
    </button>
  )
}