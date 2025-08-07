import Link from "next/link"
import { Linkedin, Instagram, Facebook, Globe } from "lucide-react"

export default function FooterSection() {
  const socialLinks = [
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
    },
    {
      icon: Globe,
      href: "#",
      label: "Website",
    },
  ]

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - More from us */}
          <div>
            <p className="text-gray-600 font-medium">More from us</p>
          </div>

          {/* Right side - Social Icons */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="w-10 h-10 bg-gray-100 hover:bg-teal-100 rounded-lg flex items-center justify-center transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
