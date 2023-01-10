import styles from './ToggleColorButton.module.css'
import React, { FC, ReactNode } from 'react'
import Tick from '../../icons/Tick'

export const ToggleColorButton: FC<
  React.HTMLProps<HTMLButtonElement> & { type?: 'submit' | 'reset' | 'button'; color: string }
> = ({ className, children, selected, color, ...restProps }) => {
  let classes = [className, styles.colorButton]

  if (!selected) {
    classes.push(styles.inactive)
  }

  return (
    <button className={classes.join(' ')} aria-selected={selected} {...restProps}>
      <span className={styles.colorInfo} style={{ backgroundColor: color }}>
        <Tick />
      </span>
      {children}
    </button>
  )
}
