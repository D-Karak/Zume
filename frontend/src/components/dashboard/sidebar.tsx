// components/sidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Resume", href: "/dashboard/resume" },
  { label: "Job Apply", href: "/dashboard/job-apply" },
  { label: "Job Tracker", href: "/dashboard/job-tracker" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={clsx(
            "block py-2 px-4 rounded hover:bg-gray-700",
            pathname === item.href && "bg-gray-700"
          )}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  )
}
