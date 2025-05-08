import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
