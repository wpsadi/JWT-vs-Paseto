
import { NavbarComponent } from '@/components/components-navbar'
import ZustWrapper from '@/store/ZustWrapper'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <ZustWrapper/>
      <NavbarComponent />
      <main>{children}</main>
    </>
        
  )
}