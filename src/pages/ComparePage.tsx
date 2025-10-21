import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { transportadorasData, Transportadora } from "@/data/transportadoras";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Building2, Package, MapPin, Mail, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [transportadoras, setTransportadoras] = useState<[Transportadora | null, Transportadora | null]>([null, null]);

  useEffect(() => {
    const id1 = searchParams.get("id1");
    const id2 = searchParams.get("id2");

    if (!id1 || !id2) {
      navigate("/");
      return;
    }

    const t1 = transportadorasData.find(t => t.id === id1);
    const t2 = transportadorasData.find(t => t.id === id2);

    if (!t1 || !t2) {
      navigate("/");
      return;
    }

    setTransportadoras([t1, t2]);
  }, [searchParams, navigate]);

  if (!transportadoras[0] || !transportadoras[1]) {
    return null;
  }

  const renderTransportadora = (transportadora: Transportadora) => (
    <div className="flex-1 space-y-6">
      {/* Logo e Nome */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {transportadora.logo ? (
              <img 
                src={transportadora.logo} 
                alt={`Logo ${transportadora.nome}`}
                className="h-20 w-auto object-contain"
              />
            ) : (
              <Building2 className="h-20 w-20 text-muted-foreground" />
            )}
          </div>
          <CardTitle className="text-2xl">{transportadora.nome}</CardTitle>
        </CardHeader>
      </Card>

      {/* Indicadores de Performance */}
      {transportadora.hasAwareSeal && transportadora.indicadores && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Indicadores de Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Índice de Solução</span>
              <Badge variant="secondary">{transportadora.indicadores.indiceSolucao}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Nível de Serviço</span>
              <Badge variant="secondary">{transportadora.indicadores.nivelServico}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tempo de Resposta</span>
              <Badge variant="secondary">{transportadora.indicadores.tempoResposta}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Pontualidade</span>
              <Badge variant="secondary">{transportadora.indicadores.pontualidade}%</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informações da Empresa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <Package className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Tipo de Operação</p>
              <p className="text-sm text-muted-foreground">{transportadora.tipoOperacao.join(", ")}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Porte</p>
              <p className="text-sm text-muted-foreground">{transportadora.porte}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Região</p>
              <p className="text-sm text-muted-foreground">{transportadora.regiao}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contato */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transportadora.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <a href={`mailto:${transportadora.email}`} className="text-sm hover:underline">
                {transportadora.email}
              </a>
            </div>
          )}
          {transportadora.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <a 
                href={transportadora.website.startsWith('http') ? transportadora.website : `https://${transportadora.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                {transportadora.website}
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botão Ver Perfil */}
      <Button 
        className="w-full" 
        variant="outline"
        onClick={() => navigate(`/transportadora/${transportadora.id}`)}
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        Ver Perfil Completo
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Comparação de Transportadoras</h1>
          <p className="text-muted-foreground mt-2">
            Compare as informações das transportadoras selecionadas
          </p>
        </div>

        {/* Comparação lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderTransportadora(transportadoras[0])}
          {renderTransportadora(transportadoras[1])}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
