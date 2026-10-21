import { MapPin, Sprout } from 'lucide-react';
import { Brand } from '../../ui/Brand';
export function Footer() {
  return <footer className="site-footer container"><Brand /><p><MapPin size={15} />Nilópolis, RJ <span>· referência da demonstração</span></p><span className="footer-note"><Sprout size={15} />Um cuidado que cresce junto.</span></footer>;
}
