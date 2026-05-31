import { Switch, Route, Router as WouterRouter } from "wouter";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import RoomsSection from "@/components/sections/RoomsSection";
import PoolGardenSection from "@/components/sections/PoolGardenSection";
import DiningSection from "@/components/sections/DiningSection";
import EventsSection from "@/components/sections/EventsSection";
import FacilitiesSection from "@/components/sections/FacilitiesSection";
import LocationSection from "@/components/sections/LocationSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";

function Home() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>
        <HeroSection />
        <WelcomeSection />
        <RoomsSection />
        <PoolGardenSection />
        <DiningSection />
        <EventsSection />
        <FacilitiesSection />
        <LocationSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;