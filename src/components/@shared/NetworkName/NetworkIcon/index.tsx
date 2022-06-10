import React, { ReactElement } from 'react'
import EthIcon from '@images/eth.svg'
import PolygonIcon from '@images/polygon.svg'
import MoonbeamIcon from '@images/moonbeam.svg'
import BscIcon from '@images/bsc.svg'
import EnergywebIcon from '@images/energyweb.svg'
import styles from '../index.module.css'

export interface NetworkIconProps {
  name: string
}

export function NetworkIcon({ name }: NetworkIconProps): ReactElement {
  const IconMapped = name.includes('ETH')
    ? EthIcon
    : name.includes('Polygon')
    ? PolygonIcon
    : name.includes('Moon')
    ? MoonbeamIcon
    : name.includes('BSC')
    ? BscIcon
    : name.includes('Energy Web')
    ? EnergywebIcon
    : EthIcon // ETH icon as fallback

  return IconMapped ? <IconMapped className={styles.icon} /> : null
}