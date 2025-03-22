import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function joinClass(...args: Array<string | boolean | undefined>) {
  return twMerge(
    args
      .filter((str) => typeof str === 'string')
      .join(' ')
      .trim(),
  )
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const typeTextArea = (type: string): number => {
  switch (type) {
    case 'chat':
      return 34

    default:
      return 40
  }
}

export const calcHeight = (value: string) => {
  const numberOfLineBreaks = (String(value).match(/\n/g) || []).length
  const newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2
  return newHeight
}

export function convertTime(dt2: any, dt1: any, type: string): number {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000
  let val = 0
  switch (type) {
    case 'minutes':
      diff /= 60
      val = Math.abs(Math.round(diff))
      break

    case 'hours':
      diff /= 60 * 60
      val = Math.abs(Math.round(diff))
      break

    case 'days':
      diff /= 60 * 1440
      val = Math.abs(Math.round(diff))
      break
  }

  return val
}

export const checkTimeDay = (dt2: any, dt1: any): number => {
  return convertTime(dt2, dt1, 'days')
}

export const capitalizeCase = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
