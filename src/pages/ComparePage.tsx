import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { transportadorasData, Transportadora } from "@/data/transportadoras";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Building2, Package, MapPin, Mail, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AwareBadge } from "@/components/AwareBadge";

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

  // Helpers to render paired cards so both columns stay aligned
  const CARD_HEIGHT = "h-56"; // uniform height for all cards (adjust as needed)

  const renderLogoCard = (transportadora: Transportadora) => (
    <Card className={`${CARD_HEIGHT} flex flex-col`}>
      <CardHeader className="text-center flex-shrink-0">
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
        {/* reserve space for badge so height stays consistent */}
        <div className="flex justify-center mt-2" style={{ minHeight: 28 }}>
          {transportadora.hasAwareSeal ? (
            <AwareBadge size="md" showText={true} />
          ) : (
            <div className="w-24" />
          )}
        </div>
      </CardHeader>
    </Card>
  );

  const renderIndicatorsCard = (transportadora: Transportadora) => (
    <Card className={`${CARD_HEIGHT} flex flex-col`}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg">Indicadores de Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 flex flex-col justify-center">
        {transportadora.hasAwareSeal && transportadora.indicadores ? (
          <div className="space-y-3">
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
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            Esta transportadora não possui Indicadores de Performance Aware.
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderInfoCard = (transportadora: Transportadora) => (
    <Card className={`${CARD_HEIGHT} flex flex-col`}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg">Informações da Empresa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-1">
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
            <p className="text-sm text-muted-foreground">{transportadora.regiao.join(", ")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContactCard = (transportadora: Transportadora) => (
    <Card className={`${CARD_HEIGHT} flex flex-col`}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg">Contato</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-1">
        {transportadora.email ? (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <a href={`mailto:${transportadora.email}`} className="text-sm hover:underline">
              {transportadora.email}
            </a>
          </div>
        ) : null}
        {transportadora.website ? (
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
        ) : null}
      </CardContent>
    </Card>
  );

  const renderButtonCard = (transportadora: Transportadora) => (
      <div className="w-full px-4">
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

        {/* Comparação lado a lado - cada linha contém os dois cards correspondentes para alinhamento */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderLogoCard(transportadoras[0])}
            {renderLogoCard(transportadoras[1])}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderIndicatorsCard(transportadoras[0])}
            {renderIndicatorsCard(transportadoras[1])}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInfoCard(transportadoras[0])}
            {renderInfoCard(transportadoras[1])}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderContactCard(transportadoras[0])}
            {renderContactCard(transportadoras[1])}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderButtonCard(transportadoras[0])}
            {renderButtonCard(transportadoras[1])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
