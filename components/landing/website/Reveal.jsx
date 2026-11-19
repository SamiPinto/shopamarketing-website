import { m } from 'framer-motion'
import { ease } from './config'

export function Reveal({ as = 'div', delay = 0, children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.45, ease: ease.out, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
