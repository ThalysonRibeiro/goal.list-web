import { forwardRef, type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        'flex h-12 w-full rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm transition-all duration-200',
        props.className
      )}
    />
  )
})

Input.displayName = 'Input'