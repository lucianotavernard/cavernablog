import { ReactElement, cloneElement } from 'react'

import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'

import clsx from 'clsx'

type ActiveLinkProps = LinkProps & {
  children: ReactElement
  activeClassName: string
}

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter()

  const className = asPath === rest.href ? activeClassName : ''

  return (
    <Link {...rest}>
      {cloneElement(children, {
        ...children.props,
        className: clsx(children.props.className, className)
      })}
    </Link>
  )
}
