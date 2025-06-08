import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',

  variants: {
    variant: {
      primary:
        'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 ring-blue-500 shadow-lg hover:shadow-xl',
      secondary: 
        'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 ring-slate-700 border border-slate-700/50 hover:border-slate-600/50 backdrop-blur-sm',
    },

    size: {
      default: 'px-4 py-2.5',
      sm: 'px-3 py-1.5 text-xs',
      lg: 'px-6 py-3 text-base',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={button({ variant, size, className })}
      />
    )
  }
)

Button.displayName = 'Button'