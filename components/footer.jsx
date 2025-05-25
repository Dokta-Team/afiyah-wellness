import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Afiyah</h3>
            <p className="text-sm text-muted-foreground">Thrive in Body, Mind & Spirit—Together.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-sm text-muted-foreground hover:text-foreground">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-muted-foreground hover:text-foreground">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-sm text-muted-foreground hover:text-foreground">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="text-sm text-muted-foreground hover:text-foreground">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground">
                  Legal & Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Email: hello@afiyahwellness.org</li>
              <li className="text-sm text-muted-foreground">WhatsApp: +234 800 AFIYAH</li>
              <li className="text-sm text-muted-foreground">Hotline: Mon–Fri, 9am–6pm WAT</li>
              <li>
                <Link href="/media-kit" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Download Media Kit
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Afiyah Wellness Community Ltd. | Together, we thrive.
          </p>
        </div>
      </div>
    </footer>
  )
}
