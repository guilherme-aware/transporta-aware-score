import { useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Truck, Users, Calendar, Phone, Mail, Globe, Star, MessageSquare } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AwareBadge } from "@/components/AwareBadge";
import { StarRating } from "@/components/StarRating";
import { transportadorasData } from "@/data/transportadoras";

const TransportadoraProfile = () => {
  const { id } = useParams();
  const transportadora = transportadorasData.find(t => t.id === id);

  if (!transportadora) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchTerm="" onSearchChange={() => {}} onMenuToggle={() => {}} />
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Transportadora não encontrada</h1>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const getReputationBadge = (reputacao: string) => {
    const variants = {
      "Excelente": "bg-success text-success-foreground",
      "Bom": "bg-primary text-primary-foreground", 
      "Regular": "bg-warning text-warning-foreground",
      "Ruim": "bg-error text-error-foreground"
    };
    
    return variants[reputacao as keyof typeof variants] || variants["Regular"];
  };

  const avaliacoesMock = [
    {
      id: 1,
      autor: "João Silva",
      rating: 5,
      data: "2024-01-15",
      tipo: "Elogio",
      comentario: "Excelente serviço! Entrega pontual e atendimento muito profissional. Recomendo!"
    },
    {
      id: 2,
      autor: "Maria Santos", 
      rating: 4,
      data: "2024-01-10",
      tipo: "Elogio",
      comentario: "Boa transportadora, cumpriu o prazo acordado. Apenas a comunicação poderia ser melhor."
    },
    {
      id: 3,
      autor: "Carlos Oliveira",
      rating: 3,
      data: "2024-01-05",
      tipo: "Dúvida",
      comentario: "Serviço ok, mas tive que ligar várias vezes para conseguir informações sobre a carga."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm="" onSearchChange={() => {}} onMenuToggle={() => {}} />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar às transportadoras
        </Button>

        {/* Header do Perfil */}
        <Card className={`p-8 mb-8 ${transportadora.hasAwareSeal ? 'border-aware/30 shadow-aware/10' : ''}`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Logo e Info Básica */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
                {transportadora.logo ? (
                  <img 
                    src={transportadora.logo} 
                    alt={`Logo ${transportadora.nome}`}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <Truck className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{transportadora.nome}</h1>
                  {transportadora.hasAwareSeal && <AwareBadge size="lg" />}
                </div>
                
                <div className="flex items-center gap-4 text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{transportadora.regiao}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Porte {transportadora.porte}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <StarRating rating={transportadora.rating} size="lg" />
                  <Badge className={getReputationBadge(transportadora.reputacao)}>
                    {transportadora.reputacao}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {transportadora.totalAvaliacoes} avaliações
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="lg:ml-auto flex flex-col sm:flex-row gap-3">
              <Button variant="aware" size="lg">
                <Star className="mr-2 h-4 w-4" />
                Avaliar Empresa
              </Button>
              <Button variant="outline" size="lg">
                <MessageSquare className="mr-2 h-4 w-4" />
                Fazer Pergunta
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Indicadores de Performance */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Indicadores de Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {transportadora.indicadores.indiceSolucao}%
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Índice de Solução</div>
                  <div className="text-xs text-muted-foreground">
                    Problemas resolvidos satisfatoriamente
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {transportadora.indicadores.nivelServico}%
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Nível de Serviço</div>
                  <div className="text-xs text-muted-foreground">
                    Entregas dentro do prazo acordado
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {transportadora.indicadores.tempoResposta}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Tempo de Resposta</div>
                  <div className="text-xs text-muted-foreground">
                    Tempo médio para responder consultas
                  </div>
                </div>
              </div>
            </Card>

            {/* Avaliações Recentes */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Avaliações Recentes</h2>
              <div className="space-y-6">
                {avaliacoesMock.map((avaliacao) => (
                  <div key={avaliacao.id} className="border-b border-border pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium">{avaliacao.autor}</span>
                          <Badge variant="outline" className="text-xs">
                            {avaliacao.tipo}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={avaliacao.rating} size="sm" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{avaliacao.comentario}</p>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                Ver todas as avaliações ({transportadora.totalAvaliacoes})
              </Button>
            </Card>
          </div>

          {/* Sidebar com Informações */}
          <div className="space-y-6">
            {/* Informações da Empresa */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Informações da Empresa</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Tipo de Operação</div>
                    <div className="text-sm text-muted-foreground">
                      {transportadora.tipoOperacao.join(", ")}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Porte</div>
                    <div className="text-sm text-muted-foreground">{transportadora.porte}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Região</div>
                    <div className="text-sm text-muted-foreground">{transportadora.regiao}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contato */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  (11) 99999-9999
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  contato@{transportadora.nome.toLowerCase().replace(/\s+/g, '')}.com.br
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  www.{transportadora.nome.toLowerCase().replace(/\s+/g, '')}.com.br
                </Button>
              </div>
            </Card>

            {/* Distribuição de Notas */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Distribuição de Notas</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm w-3">{stars}</span>
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent rounded-full h-2 transition-all duration-300"
                        style={{ 
                          width: stars === 5 ? '60%' : 
                                 stars === 4 ? '25%' : 
                                 stars === 3 ? '10%' : 
                                 stars === 2 ? '3%' : '2%' 
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">
                      {stars === 5 ? '60%' : 
                       stars === 4 ? '25%' : 
                       stars === 3 ? '10%' : 
                       stars === 2 ? '3%' : '2%'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportadoraProfile;