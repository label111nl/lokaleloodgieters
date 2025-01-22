"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, MapPin } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cities = ["Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven"]

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="hidden lg:block bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              24/7 Beschikbaar
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Snelle Service
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Gecertificeerde Loodgieters
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Transparante Prijzen
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:py-2">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Modern_Technician_Logo__4_-removebg-preview-3T9gZitsIhkqVBhK2OQ4KMpj2EMa1a.png"
              alt="Lokale Loodgieters Logo"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-blue-600 font-medium">
                <MapPin className="w-4 h-4 mr-1" />
                Kies je stad
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {cities.map((city) => (
                  <DropdownMenuItem key={city}>
                    <Link href={`/${city.toLowerCase()}`} className="w-full">
                      {city}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/diensten" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Diensten
            </Link>
            <Link href="/over-ons" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Over Ons
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/voor-loodgieters">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Voor Loodgieters
              </Button>
            </Link>
            <Link href="/offerte-aanvragen">
              <Button variant="default" className="bg-green-600 text-white hover:bg-green-700 shadow-lg">
                Offerte Aanvragen
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-blue-600 font-medium">
                  <MapPin className="w-4 h-4 mr-1" />
                  Kies je stad
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {cities.map((city) => (
                    <DropdownMenuItem key={city}>
                      <Link href={`/${city.toLowerCase()}`} className="w-full">
                        {city}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/diensten" className="text-gray-600 hover:text-blue-600 font-medium">
                Diensten
              </Link>
              <Link href="/over-ons" className="text-gray-600 hover:text-blue-600 font-medium">
                Over Ons
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/voor-loodgieters" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Voor Loodgieters
                  </Button>
                </Link>
                <Link href="/offerte-aanvragen" className="w-full">
                  <Button variant="default" className="w-full bg-green-600 text-white hover:bg-green-700 shadow-lg">
                    Offerte Aanvragen
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

