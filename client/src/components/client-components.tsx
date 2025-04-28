"use client"
import { GeistMono } from 'geist/font/mono'
import { Providers } from '../app/providers'
import { ProtectRoute } from '../components/auth/ProtectAuth'

export function ClientComponents({ children }: { children: React.ReactNode }) {
  return (
    <div className={GeistMono.className}>
      <Providers>
        <ProtectRoute>
          <main>{children}</main>
        </ProtectRoute>
      </Providers>
    </div>
  )
}
