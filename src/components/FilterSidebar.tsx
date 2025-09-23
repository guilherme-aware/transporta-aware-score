import { useState } from "react";
import { Filter, X, MapPin, Building2, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterOptions {
  regioes: string[];
  portes: string[];
  tiposOperacao: string[];
  hasAwareSeal: boolean;
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const FilterSidebar = ({ filters, onFiltersChange, isOpen, onClose }: FilterSidebarProps) => {
  const regioesList = [
    "Sudeste", "Sul", "Nordeste", "Centro-Oeste", "Norte"
  ];
  
  const portesList = [
    "Pequeno", "Médio", "Grande"
  ];
  
  const tiposOperacaoList = [
    "Rodoviário", "Ferroviário", "Aéreo", "Marítimo", "Intermodal", "Expressa", "Carga Geral", "Especializada"
  ];

  const handleRegiaoChange = (regiao: string, checked: boolean) => {
    const newRegioes = checked 
      ? [...filters.regioes, regiao]
      : filters.regioes.filter(r => r !== regiao);
    
    onFiltersChange({ ...filters, regioes: newRegioes });
  };

  const handlePorteChange = (porte: string, checked: boolean) => {
    const newPortes = checked 
      ? [...filters.portes, porte]
      : filters.portes.filter(p => p !== porte);
    
    onFiltersChange({ ...filters, portes: newPortes });
  };

  const handleTipoOperacaoChange = (tipo: string, checked: boolean) => {
    const newTipos = checked 
      ? [...filters.tiposOperacao, tipo]
      : filters.tiposOperacao.filter(t => t !== tipo);
    
    onFiltersChange({ ...filters, tiposOperacao: newTipos });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      regioes: [],
      portes: [],
      tiposOperacao: [],
      hasAwareSeal: false
    });
  };

  const hasActiveFilters = filters.regioes.length > 0 || 
                          filters.portes.length > 0 || 
                          filters.tiposOperacao.length > 0 || 
                          filters.hasAwareSeal;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Sidebar Content */}
      <Card className="fixed top-0 left-0 h-full w-80 p-6 lg:relative lg:w-full lg:h-auto z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filtros
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllFilters}
            className="w-full mb-4"
          >
            Limpar Filtros
          </Button>
        )}

        {/* Selo Aware */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Certificação</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="aware-seal"
              checked={filters.hasAwareSeal}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, hasAwareSeal: checked as boolean })
              }
            />
            <Label htmlFor="aware-seal" className="text-sm font-medium text-accent">
              Apenas com Selo Aware
            </Label>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Região */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Região
          </h3>
          <div className="space-y-2">
            {regioesList.map((regiao) => (
              <div key={regiao} className="flex items-center space-x-2">
                <Checkbox
                  id={`regiao-${regiao}`}
                  checked={filters.regioes.includes(regiao)}
                  onCheckedChange={(checked) => handleRegiaoChange(regiao, checked as boolean)}
                />
                <Label htmlFor={`regiao-${regiao}`} className="text-sm">
                  {regiao}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Porte */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Porte da Empresa
          </h3>
          <div className="space-y-2">
            {portesList.map((porte) => (
              <div key={porte} className="flex items-center space-x-2">
                <Checkbox
                  id={`porte-${porte}`}
                  checked={filters.portes.includes(porte)}
                  onCheckedChange={(checked) => handlePorteChange(porte, checked as boolean)}
                />
                <Label htmlFor={`porte-${porte}`} className="text-sm">
                  {porte}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Tipo de Operação */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Truck className="h-4 w-4 text-muted-foreground" />
            Tipo de Operação
          </h3>
          <div className="space-y-2">
            {tiposOperacaoList.map((tipo) => (
              <div key={tipo} className="flex items-center space-x-2">
                <Checkbox
                  id={`tipo-${tipo}`}
                  checked={filters.tiposOperacao.includes(tipo)}
                  onCheckedChange={(checked) => handleTipoOperacaoChange(tipo, checked as boolean)}
                />
                <Label htmlFor={`tipo-${tipo}`} className="text-sm">
                  {tipo}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};