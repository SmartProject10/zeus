
import { FC, useState, useEffect,ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface WithChildren {
  children: ReactNode;
}

/**
 * React portal based on https://stackoverflow.com/a/59154364
 * @param children Child elements
 * @param className CSS classname
 * @param el HTML element to create.  default: div
 */
export const Portal: FC<{ className?: string } & WithChildren> = ({ children, className = '' }) => {
  const [container] = useState(document.createElement('div'))

  if (className) container.classList.add(className)

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [container])

  return createPortal(children, container)
}
