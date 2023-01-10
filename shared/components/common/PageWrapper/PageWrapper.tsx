import styles from './pageWrapper.module.css'

export const PageWrapper: React.FC<{}> = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>
}
