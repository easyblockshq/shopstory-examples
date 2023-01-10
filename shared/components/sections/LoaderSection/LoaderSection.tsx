import styles from './loaderSection.module.css'
import React, { FC } from 'react'
import { Loader } from '../../common/Loader/Loader'

const LoaderSection: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  )
}

export default LoaderSection
