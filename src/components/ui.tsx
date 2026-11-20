import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE } from '../ease'


type BtnProps = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline' | 'ghost'
  className?: string
  onClick?: () => void
  external?: boolean
}

const isHttp = (href: string) => /^https?:\/\//i.test(href)
// Tombol pill dengan ring gradient di belakang saat hover (pola dari referensi)
export function PillLink({ href, children, variant = 'outline', className = '', onClick, external}: BtnProps) {
  const isExternal = external ?? isHttp(href)
  const base =
    'group relative isolate inline-flex items-center justify-center gap-2 rounded-full text-sm px-7 py-3.5 transition-all duration-300 hover:scale-105'
  const look =
    variant === 'solid'
      ? 'bg-text-primary text-bg hover:bg-bg hover:text-text-primary'
      : variant === 'outline'
        ? 'border-2 border-stroke bg-bg text-text-primary hover:border-transparent'
        : 'border border-stroke bg-surface text-text-primary hover:border-transparent'
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${look} ${className}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <span aria-hidden className="ring-hover accent-gradient" />
      {children}
    </a>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`h-3.5 w-3.5 ${className}`}>
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type HeaderProps = {
  eyebrow: string
  title: ReactNode
  sub?: string
  action?: { label: string; href: string }
  align?: 'left' | 'center'
}

export function SectionHeader({ eyebrow, title, sub, action, align = 'left' }: HeaderProps) {
  const center = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: EASE }}
      className={`mb-10 flex flex-col gap-6 md:mb-14 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}
    >
      <div className={center ? 'flex flex-col items-center' : ''}>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
          {center && <span className="h-px w-8 bg-stroke" />}
        </div>
        <h2 className="text-4xl font-light tracking-tight text-text-primary md:text-5xl lg:text-6xl">{title}</h2>
        {sub && <p className={`mt-4 max-w-md text-sm text-muted md:text-base ${center ? 'mx-auto' : ''}`}>{sub}</p>}
      </div>
      {action && (
        <PillLink href={action.href} variant="ghost" className="hidden shrink-0 md:inline-flex">
          {action.label}
          <Arrow />
        </PillLink>
      )}
    </motion.div>
  )
}

export function Italic({ children }: { children: ReactNode }) {
  return <span className="font-display italic">{children}</span>
}

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16 ${className}`}>{children}</div>
)
