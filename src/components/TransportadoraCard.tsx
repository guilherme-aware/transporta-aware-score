import { MapPin, Truck, Users, TrendingUp, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AwareBadge } from "./AwareBadge";
import { StarRating } from "./StarRating";

interface TransportadoraData {
  id: string;
  nome: string;
  logo?: string;
  rating: number;
  totalAvaliacoes: number;
  regiao: string;
  porte: "Pequeno" | "Médio" | "Grande";
  tipoOperacao: string[];
  hasAwareSeal: boolean;
  indicadores: {
    indiceSolucao: number;
    nivelServico: number;
    tempoResposta: string;
  };
  reputacao: "Excelente" | "Bom" | "Regular" | "Ruim";
}

interface TransportadoraCardProps {
  transportadora: TransportadoraData;
  onCompare?: (id: string) => void;
  onViewProfile?: (id: string) => void;
  isSelected?: boolean;
}

export const TransportadoraCard = ({ 
  transportadora, 
  onCompare, 
  onViewProfile,
  isSelected = false 
}: TransportadoraCardProps) => {
  const getReputationBadge = (reputacao: string) => {
    const variants = {
      "Excelente": "bg-success text-success-foreground",
      "Bom": "bg-primary text-primary-foreground", 
      "Regular": "bg-warning text-warning-foreground",
      "Ruim": "bg-error text-error-foreground"
    };
    
    return variants[reputacao as keyof typeof variants] || variants["Regular"];
  };

  return (
    <Card className={`
      p-6 hover:shadow-lg transition-all duration-300 cursor-pointer
      ${transportadora.hasAwareSeal ? 'border-aware/30 shadow-aware/10' : ''}
      ${isSelected ? 'ring-2 ring-primary' : ''}
    `}>
      {/* Header com Logo e Nome */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            {transportadora.logo ? (
              <img 
                src={transportadora.logo} 
                alt={`Logo ${transportadora.nome}`}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <Truck className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{transportadora.nome}</h3>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{transportadora.regiao}</span>
            </div>
          </div>
        </div>

        {transportadora.hasAwareSeal && (
          <AwareBadge size="sm" />
        )}
      </div>

      {/* Rating e Avaliações */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <StarRating rating={transportadora.rating} size="sm" />
          <span className="text-sm text-muted-foreground">
            ({transportadora.totalAvaliacoes} avaliações)
          </span>
        </div>
        
        <Badge className={getReputationBadge(transportadora.reputacao)}>
          {transportadora.reputacao}
        </Badge>
      </div>

      {/* Informações Básicas */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" />
            Porte:
          </span>
          <span className="font-medium">{transportadora.porte}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Operação:</span>
          <span className="font-medium text-right max-w-32 truncate">
            {transportadora.tipoOperacao.join(", ")}
          </span>
        </div>
      </div>

      {/* Indicadores KPI - Only show if has Aware Seal */}
      {transportadora.hasAwareSeal && (
        <div className="bg-muted/30 rounded-lg p-3 mb-4">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
            Indicadores de Performance
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{transportadora.indicadores.indiceSolucao}%</div>
              <div className="text-xs text-muted-foreground">Solução</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{transportadora.indicadores.nivelServico}%</div>
              <div className="text-xs text-muted-foreground">Serviço</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{transportadora.indicadores.tempoResposta}</div>
              <div className="text-xs text-muted-foreground">Resposta</div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onCompare?.(transportadora.id)}
        >
          <TrendingUp className="h-3 w-3 mr-1" />
          Comparar
        </Button>
        
        <Button 
          size="sm" 
          className="flex-1"
          onClick={() => onViewProfile?.(transportadora.id)}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Ver Perfil
        </Button>
      </div>
    </Card>
  );
};