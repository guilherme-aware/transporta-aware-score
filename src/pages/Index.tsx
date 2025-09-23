import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FilterSidebar } from "@/components/FilterSidebar";
import { TransportadoraCard } from "@/components/TransportadoraCard";
import { transportadorasData } from "@/data/transportadoras";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    regioes: [] as string[],
    portes: [] as string[],
    tiposOperacao: [] as string[],
    hasAwareSeal: false
  });
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  // Filter transportadoras based on search and filters
  const filteredTransportadoras = useMemo(() => {
    return transportadorasData.filter(transportadora => {
      // Search term filter
      if (searchTerm && !transportadora.nome.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Region filter
      if (filters.regioes.length > 0 && !filters.regioes.includes(transportadora.regiao)) {
        return false;
      }

      // Size filter
      if (filters.portes.length > 0 && !filters.portes.includes(transportadora.porte)) {
        return false;
      }

      // Operation type filter
      if (filters.tiposOperacao.length > 0 && 
          !filters.tiposOperacao.some(tipo => transportadora.tipoOperacao.includes(tipo))) {
        return false;
      }

      // Aware seal filter
      if (filters.hasAwareSeal && !transportadora.hasAwareSeal) {
        return false;
      }

      return true;
    });
  }, [searchTerm, filters]);

  const handleCompare = (id: string) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(prev => prev.filter(selectedId => selectedId !== id));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison(prev => [...prev, id]);
    }
  };

  const handleViewProfile = (id: string) => {
    window.open(`/transportadora/${id}`, '_blank');
  };

  // Check if there are active filters
  const hasActiveFilters = filters.regioes.length > 0 || 
                          filters.portes.length > 0 || 
                          filters.tiposOperacao.length > 0 || 
                          filters.hasAwareSeal;

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Hero Section - show only when no search or filters */}
      {!searchTerm && !hasActiveFilters && (
        <HeroSection />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-16">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Results Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Transportadoras Avaliadas
                </h2>
                <p className="text-muted-foreground">
                  {filteredTransportadoras.length} empresas encontradas
                  {searchTerm && ` para "${searchTerm}"`}
                </p>
              </div>

              {/* Sort Options */}
              <div className="hidden md:block">
                <select className="border border-border rounded-lg px-3 py-2 bg-background text-foreground">
                  <option value="rating">Melhor Avaliação</option>
                  <option value="reviews">Mais Avaliações</option>
                  <option value="name">Nome A-Z</option>
                </select>
              </div>
            </div>

            {/* Comparison Bar */}
            {selectedForComparison.length > 0 && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-primary">
                      {selectedForComparison.length} empresas selecionadas para comparação
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors"
                      disabled={selectedForComparison.length < 2}
                    >
                      Comparar Agora
                    </button>
                    <button
                      className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setSelectedForComparison([])}
                    >
                      Limpar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTransportadoras.map(transportadora => (
              <TransportadoraCard
                key={transportadora.id}
                transportadora={transportadora}
                onCompare={handleCompare}
                onViewProfile={handleViewProfile}
                isSelected={selectedForComparison.includes(transportadora.id)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredTransportadoras.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Nenhuma transportadora encontrada
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou termo de busca para encontrar mais resultados.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
