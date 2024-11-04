
import { NavbarComponent } from '@/components/components-navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarComponent />
      <main>{children}</main>
    </>
        
  )
}