"use client";

import { Container } from "@/components/shared/container";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { RoteiroCta } from "@/components/shared/roteiro-cta";
import { useDestinos } from "../_hooks/use-destinos";
import { DestinosBenefits } from "./destinos-benefits";
import { DestinosFilters } from "./destinos-filters";
import { DestinosHero } from "./destinos-hero";
import { DestinosList } from "./destinos-list";

export function DestinosContent() {
  const {
    mounted,
    activeCategory,
    onCategoryChange,
    selectedCityFilter,
    onCityFilterChange,
    searchQuery,
    onSearchChange,
    destinationsWithPackages,
    filteredDestinations,
    getPackagesForDestination,
    onBookPackage,
    onResetFilters,
  } = useDestinos();

  if (!mounted) {
    return (
      <LoadingScreen
        title="Carregando Lugares Imperdíveis..."
        subtitle="Buscando as cidades mais desejadas e seus pacotes de viagem"
        type="package"
        fullScreen={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted pt-[65px] pb-20 select-none">
      <DestinosHero />

      <Container>
        <DestinosFilters
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          selectedCityFilter={selectedCityFilter}
          citiesWithPackages={destinationsWithPackages}
          onSearchChange={onSearchChange}
          onCategoryChange={onCategoryChange}
          onCityFilterChange={onCityFilterChange}
        />

        <DestinosList
          destinations={filteredDestinations}
          totalWithPackages={destinationsWithPackages.length}
          getPackages={getPackagesForDestination}
          onBookPackage={onBookPackage}
          onResetFilters={onResetFilters}
        />

        <RoteiroCta />

        <DestinosBenefits />
      </Container>
    </div>
  );
}
