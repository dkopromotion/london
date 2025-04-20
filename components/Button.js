import Link from 'next/link'
import clsx from 'clsx'

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  )
}

const variantStyles = {
  primary: clsx(
    'rounded py-2 px-3 text-sm font-medium ring-1 ring-inset',
    // Light mode
    'bg-zinc-900 text-white ring-zinc-900/20',
    // Dark mode
    'dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20'
  ),
  secondary: clsx(
    'rounded py-2 px-3 text-sm font-medium ring-1 ring-inset',
    // Light mode
    'bg-zinc-100 text-zinc-900 ring-zinc-900/10',
    // Dark mode
    'dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-white/10'
  ),
  filled: clsx(
    'rounded py-2 px-3 text-sm font-medium ring-1 ring-inset',
    // Light mode
    'bg-zinc-900 text-white ring-zinc-900/20',
    // Dark mode
    'dark:bg-emerald-500 dark:text-white dark:ring-emerald-500/40'
  ),
  outline: clsx(
    'rounded py-1 px-3 text-sm font-medium ring-1 ring-inset',
    // Light mode
    'text-zinc-700 ring-zinc-900/10',
    // Dark mode
    'dark:text-zinc-400 dark:ring-white/10'
  ),
  text: clsx(
    'text-sm font-medium text-emerald-500',
    'dark:text-emerald-400'
  ),
}

export function Button({
  variant = 'primary',
  className,
  children,
  arrow,
  ...props
}) {
  className = clsx(
    'inline-flex gap-0.5 justify-center overflow-hidden transition-none',
    variantStyles[variant],
    className
  )

  let arrowIcon = (
    <ArrowIcon
      className={clsx(
        'mt-0.5 h-5 w-5',
        variant === 'text' && 'relative top-px',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '-mr-1'
      )}
    />
  )

  let inner = (
    <>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </>
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}