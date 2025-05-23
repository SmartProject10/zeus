import { FC } from 'react'
import icons from '../icons-config/icons'
import { getLayoutFromLocalStorage } from '@zeus/classes/layoutprovider/classes'

type Props = {
  className?: string
  iconType?: 'duotone' | 'solid' | 'outline'
  iconName: KTIconsNames | undefined
}

export type KTIconsNames = keyof typeof icons

const KTIcon: FC<Props> = ({ className = '', iconType, iconName }) => {
  if (!iconType) {
    iconType = getLayoutFromLocalStorage().main?.iconType
  }

  return (
    <i className={`ki-${iconType} ki-${iconName}${className && ' ' + className}`}>
      {iconType === 'duotone' && iconName !== undefined &&
        [...Array(icons[iconName])].map((_e, i) => {
          return (
            <span
              key={`${iconType}-${iconName}-${className}-path-${i + 1}`}
              className={`path${i + 1}`}
            ></span>
          )
        })}
    </i>
  )
}

export { KTIcon }
