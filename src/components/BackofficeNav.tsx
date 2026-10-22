'use client'

import { useEffect, useId, useRef, useState } from 'react'

import type { SessionRole } from '@/services/session/session.types'
import { classNames } from '@/utils/class-name.handlers'
import { getInitials } from '@/utils/name.handlers'

import { Logo } from './Logo'
import { NavItem } from './NavItem'

interface BackofficeNavProps {
  role: SessionRole
  homePath: string
  name?: string
  companyName?: string
  activePath: string
  isLoggingOut: boolean
  onLogout: () => void
}

interface LogoutButtonProps {
  isLoggingOut: boolean
  onLogout: () => void
  className?: string
}

const isPathActive = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`)

function LogoutButton({ isLoggingOut, onLogout, className }: LogoutButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        'motion-color button-s min-h-11 min-w-11 shrink-0 cursor-pointer rounded-sm px-xs underline underline-offset-4',
        className,
      )}
      aria-disabled={isLoggingOut || undefined}
      onClick={isLoggingOut ? undefined : onLogout}
    >
      {isLoggingOut ? 'Saindo' : 'Sair'}
    </button>
  )
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  )
}

export function BackofficeNav({
  role,
  homePath,
  name,
  companyName,
  activePath,
  isLoggingOut,
  onLogout,
}: BackofficeNavProps) {
  const panelId = useId()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const displayName = name?.trim() || 'Conta'
  const initials = getInitials(displayName)
  const navLabel = role === 'admin' ? 'Organizadores' : 'Eventos'

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      buttonRef.current?.focus()
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return
      setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isMenuOpen])

  return (
    <>
      <aside className="sticky top-0 hidden h-dvh flex-col overflow-y-auto bg-bg-inverse px-md py-lg text-text-inverse md:flex">
        <div>
          <Logo variant="inverse" />
          <p className="mono-eyebrow mt-xs text-text-inverse-secondary">
            Backoffice · {role === 'admin' ? 'Administração' : 'Organizador'}
          </p>
        </div>
        {role === 'admin' && (
          <div className="mt-lg rounded-sm border border-border-inverse-strong p-md">
            <p className="mono-eyebrow text-text-inverse-secondary">Plataforma</p>
            <p className="title-s mt-xs">Administração PulsePass</p>
            <p className="mono-s mt-xs text-text-inverse-secondary">acesso total · auditado</p>
          </div>
        )}
        {role === 'organizer' && companyName && (
          <div className="mt-lg rounded-sm border border-border-inverse-strong p-md">
            <p className="mono-eyebrow text-text-inverse-secondary">Empresa</p>
            <p className="title-s mt-xs line-clamp-3 break-words">{companyName}</p>
          </div>
        )}
        <nav aria-label="Principal" className="mt-xl">
          <p className="mono-eyebrow text-text-inverse-secondary">Menu</p>
          <ul className="mt-sm flex flex-col gap-xs">
            <li>
              <NavItem
                href={homePath}
                label={navLabel}
                index={0}
                isActive={isPathActive(activePath, homePath)}
                device="desktop"
              />
            </li>
          </ul>
        </nav>
        <div className="mt-auto flex items-center gap-sm border-t border-border-inverse-strong pt-md">
          <span
            className="mono-s flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-selected text-text-primary"
            aria-hidden="true"
          >
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="label-m line-clamp-2 break-words">{displayName}</p>
            <p className="mono-s text-text-inverse-secondary">
              {role === 'admin' ? 'Administrador' : 'Organizador'}
            </p>
          </div>
          <LogoutButton
            isLoggingOut={isLoggingOut}
            onLogout={onLogout}
            className="text-text-inverse outline-text-inverse hover:bg-[color-mix(in_srgb,var(--color-bg-inverse)_88%,var(--color-bg-page))]"
          />
        </div>
      </aside>

      <div className="border-b border-border-subtle md:hidden">
        <div className="relative flex h-(--header-height) items-center justify-between gap-sm px-md">
          <Logo />
          <div className="flex items-center gap-xs">
            <span
              className="mono-s flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-selected text-text-primary"
              aria-hidden="true"
            >
              {initials}
            </span>
            <button
              ref={buttonRef}
              type="button"
              className="motion-color flex size-11 cursor-pointer items-center justify-center rounded-sm border border-border-strong hover:bg-fill-subtle"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls={panelId}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
          </div>
          <div
            ref={panelRef}
            id={panelId}
            data-open={isMenuOpen}
            className="motion-menu-panel data-[open=true]:motion-menu-panel-open absolute inset-x-md top-full z-10 mt-2xs flex items-center justify-between gap-md rounded-sm border border-border-strong bg-bg-surface p-md"
          >
            <div className="min-w-0">
              <p className="label-m line-clamp-2 break-words">{displayName}</p>
              <p className="mono-s text-text-secondary">
                {role === 'admin' ? 'Administrador' : 'Organizador'}
              </p>
            </div>
            <LogoutButton
              isLoggingOut={isLoggingOut}
              onLogout={onLogout}
              className="text-text-primary hover:bg-fill-subtle"
            />
          </div>
        </div>
        <nav aria-label="Principal" className="flex gap-xs overflow-x-auto px-md pt-xs pb-sm">
          <NavItem
            href={homePath}
            label={navLabel}
            index={0}
            isActive={isPathActive(activePath, homePath)}
            device="mobile"
          />
        </nav>
      </div>
    </>
  )
}
