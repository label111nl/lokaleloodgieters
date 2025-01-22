import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-ar-abnoy-536397811-16509869.jpg-aPWY3wEXp13pISxIW5Hcs5pPbgR8rv.jpeg"
          alt="Professionele loodgieter aan het werk"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Op zoek naar een uitstekende lokale loodgieter?
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Geen paniek! Onze gekwalificeerde loodgieters staan 24/7 voor u klaar - Wij helpen u direct verder
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/offerte-aanvragen">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-6">
                Offerte Aanvragen
              </Button>
            </Link>
            <Link href="/diensten">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20 border-white font-semibold text-lg px-8 py-6"
              >
                Bekijk Onze Diensten
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex items-center text-white">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">4.9/5</p>
                <p className="text-sm text-blue-100">Klantwaardering</p>
              </div>
            </div>
            <div className="flex items-center text-white">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">500+</p>
                <p className="text-sm text-blue-100">Loodgieters</p>
              </div>
            </div>
            <div className="flex items-center text-white">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">30+</p>
                <p className="text-sm text-blue-100">Steden</p>
              </div>
            </div>
            <div className="flex items-center text-white">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">24/7</p>
                <p className="text-sm text-blue-100">Beschikbaar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

