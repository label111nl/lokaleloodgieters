import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Het Bedrijf</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/over-ons">Over ons</Link>
              </li>
              <li>
                <Link href="/diensten">Onze Diensten</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Voor Loodgieters</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/voor-loodgieters">Word Partner</Link>
              </li>
              <li>
                <Link href="/loodgieter/login">Loodgieter Inloggen</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Juridisch</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">Privacybeleid</Link>
              </li>
              <li>
                <Link href="/voorwaarden">Algemene voorwaarden</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Lokale Loodgieters Platform. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  )
}

