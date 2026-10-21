import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
export function Brand() {
  return <Link className="brand" to="/" aria-label="Dra. Dayse Mary — início"><span className="brand-symbol"><Sprout size={28} strokeWidth={1.4} /></span><span><strong>Dra. Dayse Mary</strong><small>Pediatria & cuidado</small></span></Link>;
}
