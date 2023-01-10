import styles from './ToggleButton.module.css'
import React, { FC, ReactNode } from 'react'

export const ToggleButton: FC<React.HTMLProps<HTMLButtonElement> & { type?: 'submit' | 'reset' | 'button' }> = ({
  className,
  children,
  selected,
  ...restProps
}) => {
  let classes = [className, styles.ToggleButton]

  if (!selected) {
    classes.push(styles.inactive)
  }

  return (
    <button className={classes.join(' ')} aria-selected={selected} {...restProps}>
      {children}
    </button>
  )
}
