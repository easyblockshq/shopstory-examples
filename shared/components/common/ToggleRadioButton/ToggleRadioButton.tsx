import styles from './ToggleRadioButton.module.css'
import React, { FC, ReactNode } from 'react'

export const ToggleRadioButton: FC<React.HTMLProps<HTMLButtonElement> & { type?: 'submit' | 'reset' | 'button' }> = ({
  className,
  children,
  selected,
  ...restProps
}) => {
  let classes = [className, styles.radioButton]

  if (!selected) {
    classes.push(styles.inactive)
  }

  return (
    <button className={classes.join(' ')} aria-selected={selected} {...restProps}>
      {children}
    </button>
  )
}
