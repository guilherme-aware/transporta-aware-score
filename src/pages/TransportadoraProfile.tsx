import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Truck, Users, Phone, Mail, Globe, Star, Edit2, Save, X, Reply } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [transportadora, setTransportadora] = useState<Transportadora | undefined>(undefined);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingIndicadores, setIsEditingIndicadores] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  
  // Check if logged in user can edit this profile
  const canEdit = loggedInTransportadora?.id === id;
  
  // Edit states
  const [editedTipoOperacao, setEditedTipoOperacao] = useState<string[]>([]);
  const [editedPorte, setEditedPorte] = useState<string>("");
  const [editedRegiao, setEditedRegiao] = useState<string>("");
  const [editedNome, setEditedNome] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");
  const [editedWebsite, setEditedWebsite] = useState<string>("");
  
  // Indicadores disponíveis
  const indicadoresDisponiveis = [
    "Índice de Solução",
    "Nível de Serviço",
    "Tempo de Resposta",
    "Eficiência Operacional",
    "Pontualidade",
    "Segurança da Carga",
    "Sustentabilidade",
    "Satisfação do Cliente",
    "Flexibilidade",
    "Tecnologia",
    "Custo-Benefício"
  ];

  // Mapeamento de nome de indicador para propriedade do objeto
  const indicadorToProp: Record<string, { value: (t: Transportadora) => string | number, desc: string }> = {
    "Índice de Solução": {
      value: t => `${t.indicadores.indiceSolucao}%`,
      desc: "Problemas resolvidos satisfatoriamente"
    },
    "Nível de Serviço": {
      value: t => `${t.indicadores.nivelServico}%`,
      desc: "Entregas dentro do prazo acordado"
    },
    "Tempo de Resposta": {
      value: t => t.indicadores.tempoResposta,
      desc: "Tempo médio para responder consultas"
    },
    "Eficiência Operacional": {
      value: t => `${t.indicadores.eficienciaOperacional}%`,
      desc: "Desempenho dos processos logísticos"
    },
    "Pontualidade": {
      value: t => `${t.indicadores.pontualidade}%`,
      desc: "Percentual de entregas pontuais"
    },
    "Segurança da Carga": {
      value: t => `${t.indicadores.segurancaCarga}%`,
      desc: "Índice de cargas entregues sem avarias"
    },
    "Sustentabilidade": {
      value: t => `${t.indicadores.sustentabilidade}%`,
      desc: "Adoção de práticas sustentáveis"
    },
    "Satisfação do Cliente": {
      value: t => `${t.indicadores.satisfacaoCliente}%`,
      desc: "Satisfação geral dos clientes"
    },
    "Flexibilidade": {
      value: t => `${t.indicadores.flexibilidade}%`,
      desc: "Capacidade de adaptação a demandas"
    },
    "Tecnologia": {
      value: t => `${t.indicadores.tecnologia}%`,
      desc: "Uso de tecnologia nos processos"
    },
    "Custo-Benefício": {
      value: t => `${t.indicadores.custoBeneficio}%`,
      desc: "Relação custo-benefício percebida"
    },
  };
  
  const [editedIndicadores, setEditedIndicadores] = useState<string[]>(
    ["Índice de Solução", "Nível de Serviço", "Tempo de Resposta"]
  );

  // Load transportadora and sync editable fields when `id` changes
  useEffect(() => {
    const t = transportadorasData.find(t => t.id === id);
    if (t) {
      setTransportadora(t);
      setEditedTipoOperacao(t.tipoOperacao || []);
      setEditedPorte(t.porte || "");
      setEditedRegiao(t.regiao || "");
      setEditedNome(t.nome || "");
      setEditedEmail(t.email || "");
      setEditedWebsite(t.website || "");
      setEditedIndicadores(t.indicadoresSelecionados || ["Índice de Solução", "Nível de Serviço", "Tempo de Resposta"]);
    }
  }, [id]);

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
      autor: loggedInTransportadora?.nome || "Usuário Anônimo",
      autorId: loggedInTransportadora?.id,
      rating: novoComentario.rating,
      data: new Date().toISOString().split('T')[0],
      titulo: novoComentario.titulo,
      descricao: novoComentario.descricao,
      respostas: []
    };

    // Update local transportadora state by appending the new comment
    setTransportadora(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        comentarios: [...(prev.comentarios || []), comentario],
        totalAvaliacoes: (prev.totalAvaliacoes || 0) + 1
      };
    });

    // Also update the in-memory data array so other parts of the app that read it
    // during this session will see the new comment.
    const idx = transportadorasData.findIndex(t => t.id === id);
    if (idx !== -1) {
      transportadorasData[idx] = {
        ...transportadorasData[idx],
        comentarios: [...(transportadorasData[idx].comentarios || []), comentario],
        totalAvaliacoes: transportadorasData[idx].totalAvaliacoes + 1
      };
    }

    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi publicado com sucesso.",
    });
  };

  const handleReplyComentario = (comentarioId: number) => {
    if (!replyText.trim()) return;

    const resposta: Comentario = {
      id: Date.now(),
      autor: loggedInTransportadora?.nome || "Usuário Anônimo",
      autorId: loggedInTransportadora?.id,
      rating: 0,
      data: new Date().toISOString().split('T')[0],
      titulo: "",
      descricao: replyText,
      respostas: []
    };

    // Recursively walk the comments tree and append the reply to the matching comment's `respostas`
    const appendReply = (comentarios: Comentario[] = []): Comentario[] => {
      return comentarios.map(c => {
        if (c.id === comentarioId) {
          // preserve the original comment and only append the new reply
          return { ...c, respostas: [...(c.respostas || []), resposta] };
        }

        if (c.respostas && c.respostas.length > 0) {
          return { ...c, respostas: appendReply(c.respostas) };
        }

        return c;
      });
    };

    // Update local component state from the current transportadora value to avoid accidentally
    // replacing the whole comments tree with an incorrect structure.
    setTransportadora(prev => {
      if (!prev) return prev;
      return { ...prev, comentarios: appendReply(prev.comentarios || []) };
    });

    // Also update the in-memory data array so other components reading `transportadorasData`
    // see the change during this session. We replace only the comentarios of the matched entry.
    const idx = transportadorasData.findIndex(t => t.id === id);
    if (idx !== -1) {
      transportadorasData[idx] = {
        ...transportadorasData[idx],
        comentarios: appendReply(transportadorasData[idx].comentarios || [])
      };
    }

    setReplyingTo(null);
    setReplyText("");
    toast({
      title: "Resposta adicionada",
      description: "Sua resposta foi publicada com sucesso.",
    });
  };

  const handleSaveIndicadores = () => {
    // if (editedIndicadores.length > 4) {
    //   toast({
    //     title: "Erro",
    //     description: "Selecione no máximo 4 indicadores.",
    //     variant: "destructive"
    //   });
    //   return;
    // }

    const updatedData = transportadorasData.map(t => 
      t.id === id 
        ? { ...t, indicadoresSelecionados: editedIndicadores }
        : t
    );
    
    const updated = updatedData.find(t => t.id === id);
    if (updated) {
      setTransportadora(updated);
      setIsEditingIndicadores(false);
      toast({
        title: "Indicadores atualizados",
        description: "Os indicadores de performance foram salvos com sucesso.",
      });
    }
  };

  const toggleIndicador = (indicador: string) => {
    if (editedIndicadores.includes(indicador)) {
      setEditedIndicadores(editedIndicadores.filter(i => i !== indicador));
    } else {
      // if (editedIndicadores.length < 4) {
        setEditedIndicadores([...editedIndicadores, indicador]);
      // } else {
      //   toast({
      //     title: "Limite atingido",
      //     description: "Você pode selecionar no máximo 4 indicadores.",
      //     variant: "destructive"
      //   });
      // }
    }
  };

  const renderComentario = (comentario: Comentario, isReply: boolean = false) => (
    <div key={comentario.id} className={`border-b border-border pb-6 last:border-b-0 ${isReply ? 'ml-8 mt-4' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-medium">{comentario.autor}</span>
          </div>
          {!isReply && (
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={comentario.rating} size="sm" />
              <span className="text-sm text-muted-foreground">
                {new Date(comentario.data).toLocaleDateString('pt-BR')}
              </span>
            </div>
          )}
          {isReply && (
            <span className="text-sm text-muted-foreground">
              {new Date(comentario.data).toLocaleDateString('pt-BR')}
            </span>
          )}
          {comentario.titulo && <h3 className="font-medium text-sm mb-1">{comentario.titulo}</h3>}
        </div>
      </div>
      <p className="text-sm text-foreground mb-3">{comentario.descricao}</p>
      
      {canEdit && !isReply && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setReplyingTo(comentario.id)}
          className="mb-3"
        >
          <Reply className="h-4 w-4 mr-2" />
          Responder
        </Button>
      )}

      {replyingTo === comentario.id && (
        <div className="mt-3 space-y-2">
          <Textarea
            placeholder="Escreva sua resposta..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex gap-2">
            <Button onClick={() => handleReplyComentario(comentario.id)} size="sm">
              Enviar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setReplyingTo(null);
                setReplyText("");
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {comentario.respostas && comentario.respostas.length > 0 && (
        <div className="mt-4">
          {comentario.respostas.map(resposta => renderComentario(resposta, true))}
        </div>
      )}
    </div>
  );

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
                  {/* <span className="text-sm text-muted-foreground">
                    {transportadora.totalAvaliacoes} avaliações
                  </span> */}
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
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Indicadores de Performance</h2>
                  {!isEditingIndicadores ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingIndicadores(true)}
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
                          setIsEditingIndicadores(false);
                          setEditedIndicadores(transportadora?.indicadoresSelecionados || ["Índice de Solução", "Nível de Serviço", "Tempo de Resposta"]);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSaveIndicadores}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {isEditingIndicadores ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3 block">Selecione indicadores</Label>
                      <div className="space-y-2">
                        {indicadoresDisponiveis.map(indicador => (
                          <div key={indicador} className="flex items-center space-x-2">
                            <Checkbox
                              id={indicador}
                              checked={editedIndicadores.includes(indicador)}
                              onCheckedChange={() => toggleIndicador(indicador)}
                            />
                            <label
                              htmlFor={indicador}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {indicador}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {editedIndicadores.length}/{indicadoresDisponiveis.length} selecionados
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(transportadora.indicadoresSelecionados || ["Índice de Solução", "Nível de Serviço", "Tempo de Resposta"]).map(indicador => (
                      <div key={indicador} className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {indicadorToProp[indicador]?.value(transportadora) ?? "N/A"}
                        </div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">{indicador}</div>
                        <div className="text-xs text-muted-foreground">
                          {indicadorToProp[indicador]?.desc ?? ""}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Comentários Recentes */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Comentários Recentes</h2>
              <div className="space-y-6">
                {transportadora.comentarios && transportadora.comentarios.length > 0 ? (
                  transportadora.comentarios.map((comentario) => renderComentario(comentario))
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
