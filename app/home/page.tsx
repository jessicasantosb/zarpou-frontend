import { HomeHero } from "./_components/home-hero";
import { SearchEngine } from "@/components/search-engine/search-engine";
import { PromoBannerCarousel } from "@/app/promocoes/_components/promo-banner-carousel";
import { Menu } from "./_components/menu";
import { TopDestination } from "./_components/top-destination";
import { TopHotels } from "./_components/top-hotels";
import { TopAirTicket } from "./_components/top-air-ticket";

export default function HomePage() {
  return (
    <main className="relative overflow-visible" style={{ overflow: "visible" }}>
      <HomeHero />

      <SearchEngine />

      <PromoBannerCarousel />

      <Menu />

      <TopHotels />

      <TopAirTicket />

      <TopDestination />
    </main>
  );
}
