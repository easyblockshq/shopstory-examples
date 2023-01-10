import styles from './Toast.module.css'
import React, { FC, useState } from 'react'

export const Toast: FC<{ message: String; isVisible: boolean }> = ({ message, isVisible }) => {
  let classes = [styles.Toast]

  if (isVisible) {
    classes.push(styles.active)
  }

  return <div className={classes.join(' ')}>{message}</div>
}
