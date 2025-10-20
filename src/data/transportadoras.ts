import logoRapidex from "@/assets/logo-rapidex.png";
import logoTranscarga from "@/assets/logo-transcarga.png";
import logoAerotrans from "@/assets/logo-aerotrans.png";
import logoMartrans from "@/assets/logo-martrans.png";

export interface Comentario {
  id: number;
  autor: string;
  rating: number;
  data: string;
  titulo: string;
  descricao: string;
}

export interface Transportadora {
  id: string;
  nome: string;
  logo?: string;
  rating: number;
  totalAvaliacoes: number;
  regiao: string;
  porte: "Pequeno" | "Médio" | "Grande";
  tipoOperacao: string[];
  hasAwareSeal: boolean;
  email: string;
  website: string;
  indicadores: {
    indiceSolucao: number;
    nivelServico: number;
    tempoResposta: string;
  };
  reputacao: "Excelente" | "Bom" | "Regular" | "Ruim";
  comentarios: Comentario[];
}

export const transportadorasData: Transportadora[] = [
  {
    id: "1",
    nome: "Rapidex Logística",
    logo: logoRapidex,
    rating: 4.8,
    totalAvaliacoes: 1247,
    regiao: "Sudeste",
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "contato@rapidexlogistica.com.br",
    website: "www.rapidexlogistica.com.br",
    indicadores: {
      indiceSolucao: 92,
      nivelServico: 89,
      tempoResposta: "2h"
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[]
  },
  {
    id: "2", 
    nome: "TransCarga Brasil",
    logo: logoTranscarga,
    rating: 4.5,
    totalAvaliacoes: 856,
    regiao: "Sul",
    porte: "Médio" as const,
    tipoOperacao: ["Rodoviário", "Intermodal"],
    hasAwareSeal: true,
    email: "contato@transcargabrasil.com.br",
    website: "www.transcargabrasil.com.br",
    indicadores: {
      indiceSolucao: 88,
      nivelServico: 85,
      tempoResposta: "3h"
    },
    reputacao: "Bom" as const,
    comentarios: [] as Comentario[]
  },
  {
    id: "3",
    nome: "LogiNordeste",
    rating: 4.2,
    totalAvaliacoes: 432,
    regiao: "Nordeste", 
    porte: "Médio" as const,
    tipoOperacao: ["Rodoviário", "Carga Geral"],
    hasAwareSeal: false,
    email: "contato@loginordeste.com.br",
    website: "www.loginordeste.com.br",
    indicadores: {
      indiceSolucao: 82,
      nivelServico: 79,
      tempoResposta: "4h"
    },
    reputacao: "Bom" as const,
    comentarios: [] as Comentario[]
  },
  {
    id: "4",
    nome: "AeroTrans Cargo",
    logo: logoAerotrans,
    rating: 4.7,
    totalAvaliacoes: 623,
    regiao: "Sudeste",
    porte: "Grande" as const,
    tipoOperacao: ["Aéreo", "Expressa"],
    hasAwareSeal: true,
    email: "contato@aerotranscargo.com.br",
    website: "www.aerotranscargo.com.br",
    indicadores: {
      indiceSolucao: 94,
      nivelServico: 92,
      tempoResposta: "1h"
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[]
  },
  {
    id: "5",
    nome: "RodoCenter",
    rating: 3.8,
    totalAvaliacoes: 298,
    regiao: "Centro-Oeste",
    porte: "Pequeno" as const,
    tipoOperacao: ["Rodoviário"],
    hasAwareSeal: false,
    email: "contato@rodocenter.com.br",
    website: "www.rodocenter.com.br",
    indicadores: {
      indiceSolucao: 75,
      nivelServico: 72,
      tempoResposta: "6h"
    },
    reputacao: "Regular" as const,
    comentarios: [] as Comentario[]
  },
  {
    id: "6",
    nome: "MarTrans Portuário",
    logo: logoMartrans,
    rating: 4.6,
    totalAvaliacoes: 387,
    regiao: "Sul",
    porte: "Grande" as const,
    tipoOperacao: ["Marítimo", "Intermodal"],
    hasAwareSeal: true,
    email: "contato@martransportuario.com.br",
    website: "www.martransportuario.com.br",
    indicadores: {
      indiceSolucao: 90,
      nivelServico: 87,
      tempoResposta: "2h"
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[]
  },
  {
    id: "7",
    nome: "Ferro Logistics",
    rating: 4.3,
    totalAvaliacoes: 512,
    regiao: "Sudeste",
    porte: "Grande" as const,
    tipoOperacao: ["Ferroviário", "Carga Geral"],
    hasAwareSeal: false,
    email: "contato@ferrologistics.com.br",
    website: "www.ferrologistics.com.br",
    indicadores: {
      indiceSolucao: 84,
      nivelServico: 81,
      tempoResposta: "5h"
    },
    reputacao: "Bom" as const,
    comentarios: [] as Comentario[]
  },
  {
    id: "8",
    nome: "Especializada Norte",
    rating: 4.1,
    totalAvaliacoes: 156,
    regiao: "Norte",
    porte: "Pequeno" as const,
    tipoOperacao: ["Especializada"],
    hasAwareSeal: false,
    email: "contato@especializadanorte.com.br",
    website: "www.especializadanorte.com.br",
    indicadores: {
      indiceSolucao: 80,
      nivelServico: 77,
      tempoResposta: "4h"
    },
    reputacao: "Bom" as const,
    comentarios: [] as Comentario[]
  },
  {
    id: "9",
    nome: "IntegraTrans",
    rating: 4.4,
    totalAvaliacoes: 789,
    regiao: "Sul",
    porte: "Médio" as const,
    tipoOperacao: ["Rodoviário", "Ferroviário"],
    hasAwareSeal: true,
    email: "contato@integratrans.com.br",
    website: "www.integratrans.com.br",
    indicadores: {
      indiceSolucao: 86,
      nivelServico: 83,
      tempoResposta: "3h"
    },
    reputacao: "Bom" as const,
    comentarios: [] as Comentario[]
  },
  {
    id: "10",
    nome: "ExpressGlobal",
    rating: 3.6,
    totalAvaliacoes: 243,
    regiao: "Nordeste",
    porte: "Médio" as const,
    tipoOperacao: ["Expressa", "Aéreo"],
    hasAwareSeal: false,
    email: "contato@expressglobal.com.br",
    website: "www.expressglobal.com.br",
    indicadores: {
      indiceSolucao: 70,
      nivelServico: 68,
      tempoResposta: "8h"
    },
    reputacao: "Regular" as const,
    comentarios: [] as Comentario[]
  }
];