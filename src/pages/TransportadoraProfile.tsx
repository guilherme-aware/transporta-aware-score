import { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Truck, Users, Phone, Mail, Globe, Star, Edit2, Save, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AwareBadge } from "@/components/AwareBadge";
import { StarRating } from "@/components/StarRating";
import { AddComentarioModal } from "@/components/AddComentarioModal";
import { transportadorasData, Comentario, Transportadora } from "@/data/transportadoras";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const TransportadoraProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { loggedInTransportadora } = useAuth();
  const [transportadora, setTransportadora] = useState<Transportadora | undefined>(transportadorasData.find(t => t.id === id));
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Check if logged in user can edit this profile
  const canEdit = loggedInTransportadora?.id === id;
  
  // Edit states
  const [editedTipoOperacao, setEditedTipoOperacao] = useState(transportadora?.tipoOperacao || []);
  const [editedPorte, setEditedPorte] = useState(transportadora?.porte || "");
  const [editedRegiao, setEditedRegiao] = useState(transportadora?.regiao || "");
  const [editedNome, setEditedNome] = useState(transportadora?.nome || "");
  const [editedEmail, setEditedEmail] = useState(transportadora?.email || "");
  const [editedWebsite, setEditedWebsite] = useState(transportadora?.website || "");

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

  const handleSaveInfo = () => {
    const updatedData = transportadorasData.map(t => 
      t.id === id 
        ? { 
            ...t, 
            tipoOperacao: editedTipoOperacao,
            porte: editedPorte as "Pequeno" | "Médio" | "Grande",
            regiao: editedRegiao
          } 
        : t
    );
    
    const updated = updatedData.find(t => t.id === id);
    if (updated) {
      setTransportadora(updated);
      setIsEditingInfo(false);
      toast({
        title: "Informações atualizadas",
        description: "As informações da empresa foram salvas com sucesso.",
      });
    }
  };

  const handleSaveContact = () => {
    const updatedData = transportadorasData.map(t => 
      t.id === id 
        ? { 
            ...t, 
            nome: editedNome,
            email: editedEmail,
            website: editedWebsite
          } 
        : t
    );
    
    const updated = updatedData.find(t => t.id === id);
    if (updated) {
      setTransportadora(updated);
      setIsEditingContact(false);
      toast({
        title: "Contato atualizado",
        description: "As informações de contato foram salvas com sucesso.",
      });
    }
  };

  const handleAddComentario = (novoComentario: { titulo: string; descricao: string; rating: number }) => {
    const comentario: Comentario = {
      id: Date.now(),
      autor: "Usuário Anônimo",
      rating: novoComentario.rating,
      data: new Date().toISOString().split('T')[0],
      titulo: novoComentario.titulo,
      descricao: novoComentario.descricao
    };

    const updatedData = transportadorasData.map(t => 
      t.id === id 
        ? { 
            ...t, 
            comentarios: [...(t.comentarios || []), comentario],
            totalAvaliacoes: t.totalAvaliacoes + 1
          } 
        : t
    );
    
    const updated = updatedData.find(t => t.id === id);
    if (updated) {
      setTransportadora(updated);
      toast({
        title: "Comentário adicionado",
        description: "Seu comentário foi publicado com sucesso.",
      });
    }
  };

  const tipoOperacaoOptions = ["Rodoviário", "Aéreo", "Marítimo", "Ferroviário", "Expressa", "Intermodal", "Carga Geral", "Especializada"];

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
            <div className="lg:ml-auto">
              <Button variant="aware" size="lg" onClick={() => setIsModalOpen(true)}>
                <Star className="mr-2 h-4 w-4" />
                Adicionar Comentário
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Indicadores de Performance - Only show if has Aware Seal */}
            {transportadora.hasAwareSeal && (
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
            )}

            {/* Comentários Recentes */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Comentários Recentes</h2>
              <div className="space-y-6">
                {transportadora.comentarios && transportadora.comentarios.length > 0 ? (
                  transportadora.comentarios.map((comentario) => (
                    <div key={comentario.id} className="border-b border-border pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-medium">{comentario.autor}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <StarRating rating={comentario.rating} size="sm" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(comentario.data).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <h3 className="font-medium text-sm mb-1">{comentario.titulo}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-foreground">{comentario.descricao}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Nenhum comentário ainda. Seja o primeiro a avaliar esta transportadora!
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar com Informações */}
          <div className="space-y-6">
            {/* Informações da Empresa */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Informações da Empresa</h3>
                {!isEditingInfo ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingInfo(true)}
                    disabled={!canEdit}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsEditingInfo(false);
                        setEditedTipoOperacao(transportadora.tipoOperacao);
                        setEditedPorte(transportadora.porte);
                        setEditedRegiao(transportadora.regiao);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSaveInfo}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {isEditingInfo ? (
                <div className="space-y-4">
                  <div>
                    <Label>Tipo de Operação</Label>
                    <Select
                      value={editedTipoOperacao[0]}
                      onValueChange={(value) => setEditedTipoOperacao([value])}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tipoOperacaoOptions.map(tipo => (
                          <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Porte</Label>
                    <Select value={editedPorte} onValueChange={setEditedPorte}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pequeno">Pequeno</SelectItem>
                        <SelectItem value="Médio">Médio</SelectItem>
                        <SelectItem value="Grande">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Região</Label>
                    <Select value={editedRegiao} onValueChange={setEditedRegiao}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Norte">Norte</SelectItem>
                        <SelectItem value="Nordeste">Nordeste</SelectItem>
                        <SelectItem value="Centro-Oeste">Centro-Oeste</SelectItem>
                        <SelectItem value="Sudeste">Sudeste</SelectItem>
                        <SelectItem value="Sul">Sul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
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
              )}
            </Card>

            {/* Contato */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Contato</h3>
                {!isEditingContact ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingContact(true)}
                    disabled={!canEdit}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsEditingContact(false);
                        setEditedNome(transportadora.nome);
                        setEditedEmail(transportadora.email);
                        setEditedWebsite(transportadora.website);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSaveContact}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {isEditingContact ? (
                <div className="space-y-4">
                  <div>
                    <Label>Nome</Label>
                    <Input
                      value={editedNome}
                      onChange={(e) => setEditedNome(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Website</Label>
                    <Input
                      value={editedWebsite}
                      onChange={(e) => setEditedWebsite(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    (11) 99999-9999
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    {transportadora.email}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    {transportadora.website}
                  </Button>
                </div>
              )}
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

      <AddComentarioModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddComentario}
      />
    </div>
  );
};

export default TransportadoraProfile;
