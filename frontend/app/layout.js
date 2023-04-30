import './globals.css'
import { Raleway } from 'next/font/google'

export const metadata = {
  title: 'Fresh Mart',
  description: 'Fresh Mart',
}

const raleway = Raleway({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>{children}</body>
    </html>
  )
}
