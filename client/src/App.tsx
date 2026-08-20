/** Signal Atelier: editorial clarity, signal route, human handoff, calm premium B2B. */
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LegalNotice from "./pages/LegalNotice";

const Home = lazy(() => import("./pages/Home"));
const KitchensInterior = lazy(() => import("./pages/KitchensInterior"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Industries = lazy(() => import("./pages/Industries"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));

const SITE_URL = "https://pexek.com";

const PAGE_METADATA: Record<string, { title: string; description: string; canonical: string; indexable: boolean }> = {
  "/": {
    title: "PEXEK — Clear next actions from customer conversations",
    description: "PEXEK designs managed AI customer conversation workflows that turn inbound enquiries into clear next actions with human handoff.",
    canonical: `${SITE_URL}/`,
    indexable: true,
  },
  "/solutions": {
    title: "PEXEK Solutions | AI Conversation Workflows with Human Control",
    description: "Explore PEXEK solution categories for voice, WhatsApp, website enquiries, qualification, booking and follow-up workflows—configured around your business with clear human handoff.",
    canonical: `${SITE_URL}/solutions`,
    indexable: true,
  },
  "/industries": {
    title: "PEXEK Industries | Customer Conversation Workflows by Business Context",
    description: "Explore how PEXEK workflows can be configured for kitchens, services, property, automotive, hospitality, healthcare administration, e-commerce and professional contexts—with clear human ownership.",
    canonical: `${SITE_URL}/industries`,
    indexable: true,
  },
  "/how-it-works": {
    title: "How PEXEK Works | Controlled Customer Conversation Workflows",
    description: "See how PEXEK moves from business context to a configured, tested and reviewed customer conversation workflow with human control at every important step.",
    canonical: `${SITE_URL}/how-it-works`,
    indexable: true,
  },
  "/industries/kitchens-interior": {
    title: "PEXEK Lead-to-Showroom | Cuisines & Aménagement Intérieur au Maroc",
    description: "PEXEK aide les showrooms de cuisines et d’aménagement intérieur à organiser les demandes de leur site, structurer le contexte et préparer la prochaine action commerciale.",
    canonical: `${SITE_URL}/industries/kitchens-interior`,
    indexable: true,
  },
  "/privacy": {
    title: "Privacy Notice | PEXEK",
    description: "Information about how PEXEK handles workflow assessment requests submitted through this website.",
    canonical: `${SITE_URL}/privacy`,
    indexable: true,
  },
  "/terms": {
    title: "Terms of Use | PEXEK",
    description: "Terms governing access to the PEXEK website and workflow assessment requests.",
    canonical: `${SITE_URL}/terms`,
    indexable: true,
  },
};

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function RouteMetadata() {
  const [location] = useLocation();
  const metadata = PAGE_METADATA[location] ?? {
    title: "Page Not Found | PEXEK",
    description: "The requested PEXEK page could not be found.",
    canonical: "",
    indexable: false,
  };

  useEffect(() => {
    document.title = metadata.title;
    upsertMeta("name", "description", metadata.description);
    upsertMeta("name", "robots", metadata.indexable ? "index,follow" : "noindex,follow");
    upsertMeta("property", "og:title", metadata.title);
    upsertMeta("property", "og:description", metadata.description);
    upsertMeta("property", "og:url", metadata.canonical || `${SITE_URL}${location}`);
    upsertMeta("name", "twitter:title", metadata.title);
    upsertMeta("name", "twitter:description", metadata.description);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    if (metadata.canonical) canonical.setAttribute("href", metadata.canonical);
    else canonical.removeAttribute("href");
  }, [location, metadata]);

  return null;
}

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eef3f8]" aria-label="Loading PEXEK page" />}>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/industries" component={Industries} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/industries/kitchens-interior" component={KitchensInterior} />
      <Route path="/privacy">{() => <LegalNotice type="privacy" />}</Route>
      <Route path="/terms">{() => <LegalNotice type="terms" />}</Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  const [location] = useLocation();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider><RouteMetadata /><Toaster /><Router /></TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
