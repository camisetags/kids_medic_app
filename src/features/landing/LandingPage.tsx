import { SiteHeader } from './SiteHeader';
import { Hero } from './Hero';
import { CareStages } from './CareStages';
import { VisitJourney } from './VisitJourney';
import { Footer } from './Footer';
export function LandingPage() {
  return <><SiteHeader /><main id="main" tabIndex={-1}><Hero /><CareStages /><VisitJourney /></main><Footer /></>;
}
