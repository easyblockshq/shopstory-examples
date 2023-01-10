import React, { FC } from 'react'
import ReactModal from 'react-modal'
import styles from './modal.module.css'

export type ModalOverlayStyle = 'transparent' | 'blur' | 'blur-mobile' | 'light' | 'dark'
export type ModalContentPosition = 'center' | 'bottom' | 'left' | 'right'
export type ModalContentVariant = 'default' | 'transparent' | 'white-rounded'
export type ModalContentSize = 'intrinsic' | 'stretch' | 'stretch-x' | 'stretch-y'

export type ModalProps = ReactModal.Props & {
  // Content
  variant?: ModalContentVariant
  position?: ModalContentPosition
  size?: ModalContentSize
  // Overlay
  overlayCloseButton?: boolean
  overlayCloseButtonLabel?: string
  // Animations
  enterAnimation?: 'fade-in'
  exitAnimation?: 'fade-out'
}

export const Modal: FC<ModalProps> = ({
  variant = 'default',
  position = 'center',
  size = 'intrinsic',
  overlayCloseButton,
  overlayCloseButtonLabel,
  isOpen,
  onRequestClose,
  children,
  ...reactModalProps
}) => {
  const transitionTime = 200

  const parsedOverlayCloseButtonLabel = overlayCloseButtonLabel ?? 'Close'

  const contentProps = { variant, position, size }

  let contentClasses = [styles.content]
  let overlayClasses = [styles.overlay]

  if (position) {
    switch (position) {
      case 'center':
        contentClasses.push(styles.contentPosition_center)
        break
      case 'bottom':
        contentClasses.push(styles.contentPosition_bottom)
        break
      case 'right':
        contentClasses.push(styles.contentPosition_right)
        break
      case 'left':
        contentClasses.push(styles.contentPosition_left)
        break
    }
  }

  if (size) {
    switch (size) {
      case 'stretch':
        contentClasses.push(styles.contentSize_stretch)
        break
      case 'stretch-x':
        contentClasses.push(styles.contentSize_stretchx)
        break
      case 'stretch-y':
        contentClasses.push(styles.contentSize_stretchy)
        break
    }
  }

  return (
    <ReactModal
      {...reactModalProps}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayElement={(props, contentElement) => (
        <div {...props} style={{ transition: `opacity 0ms linear ${isOpen ? 0 : transitionTime}ms` }}>
          {contentElement}
        </div>
      )}
      contentElement={(props, children) => (
        <div {...props} {...contentProps}>
          {children}
        </div>
      )}
      className={contentClasses.join(' ')}
      overlayClassName={overlayClasses.join(' ')}
      closeTimeoutMS={2 * transitionTime}
    >
      {children}
    </ReactModal>
  )
}
