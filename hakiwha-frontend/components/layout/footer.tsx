import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image src="/images/logo-white.png" alt="DocuForm" width={150} height={50} />
            </Link>
            <p className="text-slate-300 text-sm">
              Système de gestion des formations professionnelles. Simplifiez la gestion de vos formations et documents.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/admin/dashboard" className="hover:text-blue-400 transition-colors">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link href="/admin/formations" className="hover:text-blue-400 transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/admin/groupes" className="hover:text-blue-400 transition-colors">
                  Groupes
                </Link>
              </li>
              <li>
                <Link href="/admin/documents" className="hover:text-blue-400 transition-colors">
                  Documents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Ressources</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Tutoriels
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+213 555 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@docuform.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Rue des Formations, Alger, Algérie</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} DocuForm. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
