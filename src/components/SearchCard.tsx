import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface SearchCardProps {
  onSearch: (filters: {
    nome: string;
    regiao: string;
    tipoOperacao: string[];
    hasAwareSeal: string;
  }) => void;
  onClear: () => void;
}

export const SearchCard = ({ onSearch, onClear }: SearchCardProps) => {
  const [nome, setNome] = useState("");
  const [regiao, setRegiao] = useState("");
  const [tipoOperacao, setTipoOperacao] = useState<string[]>([]);
  const [hasAwareSeal, setHasAwareSeal] = useState("");

  const handleApplyFilter = () => {
    onSearch({ nome, regiao, tipoOperacao, hasAwareSeal });
  };

  const handleClearFilters = () => {
    setNome("");
    setRegiao("");
    setTipoOperacao([]);
    setHasAwareSeal("");
    onClear();
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite o nome da transportadora"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regiao">Região</Label>
            <Select value={regiao} onValueChange={setRegiao}>
              <SelectTrigger id="regiao">
                <SelectValue placeholder="Selecione uma região" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as regiões</SelectItem>
                <SelectItem value="Sudeste">Sudeste</SelectItem>
                <SelectItem value="Sul">Sul</SelectItem>
                <SelectItem value="Centro-Oeste">Centro-Oeste</SelectItem>
                <SelectItem value="Nordeste">Nordeste</SelectItem>
                <SelectItem value="Norte">Norte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoOperacao">Tipo de Operação</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Rodoviário",
                "Ferroviário",
                "Aéreo",
                "Marítimo",
                "Intermodal",
                "Expressa",
                "Carga Geral",
                "Especializada",
              ].map((tipo) => (
                <label key={tipo} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={tipoOperacao.includes(tipo)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTipoOperacao((prev) => [...prev, tipo]);
                      } else {
                        setTipoOperacao((prev) => prev.filter((t) => t !== tipo));
                      }
                    }}
                  />
                  <span className="text-sm">{tipo}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aware-seal">Tem selo Aware</Label>
            <Select value={hasAwareSeal} onValueChange={setHasAwareSeal}>
              <SelectTrigger id="aware-seal">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="yes">Sim</SelectItem>
                <SelectItem value="no">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Limpar Filtros
          </Button>
          <Button onClick={handleApplyFilter} className="gap-2">
            <Search className="w-4 h-4" />
            Aplicar Filtro
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
