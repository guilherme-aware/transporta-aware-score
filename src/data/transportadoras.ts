import logoRapidex from "@/assets/logo-rapidex.png";
import logoTranscarga from "@/assets/logo-transcarga.png";
import logoAerotrans from "@/assets/logo-aerotrans.png";
import logoMartrans from "@/assets/logo-martrans.png";
import logoGMS from "@/assets/logo-gms.png";
import logoGrupoSanches from "@/assets/logo-grupo-sanches.png";
import logoCozapi from "@/assets/logo-cozapi.png";
import logoDRK from "@/assets/logo-drk.jpg";
import logoDSV from "@/assets/logo-dsv.png";

export interface Comentario {
  id: number;
  autor: string;
  autorId?: string;
  rating: number;
  data: string;
  titulo: string;
  descricao: string;
  respostas?: Comentario[];
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
  indicadoresSelecionados?: string[];
  reputacao: "Excelente" | "Bom" | "Regular" | "Ruim";
  comentarios: Comentario[];
}

export const transportadorasData: Transportadora[] = [
  {
    id: "1",
    nome: "GMS Transportes",
    logo: logoGMS,
    rating: 5,
    totalAvaliacoes: 1000,
    regiao: "Nordeste",
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "contato@gmstransporte.com.br",
    website: "www.gmstransporte.com.br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[],
  },
  {
    id: "2",
    nome: "Grupo Sanches",
    logo: logoGrupoSanches,
    rating: 5,
    totalAvaliacoes: 1000,
    regiao: "Brasil",
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "contato@gruposanches.com.br",
    website: "www.gruposanches.com.br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[],
  },
  {
    id: "3",
    nome: "Cozapi Transportes",
    logo: logoCozapi,
    rating: 5,
    totalAvaliacoes: 1000,
    regiao: "Brasil",
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "comercial@cozapi.com.br ",
    website: "www.cozapi.com.br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[],
  },
  {
    id: "4",
    nome: "DRK Logística",
    logo: logoDRK,
    rating: 5,
    totalAvaliacoes: 1000,
    regiao: "Mundial",
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "comercial@drklogistica.com.br",
    website: "www.drklogistica.com.br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[],
  },
  {
    id: "5",
    nome: "DSV: Transporte e Logística Global",
    logo: logoDSV,
    rating: 5,
    totalAvaliacoes: 1000,
    regiao: "Mundial",
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "contato@dsv.com",
    website: "www.dsv.com/pt-br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[],
  },
  {
    id: "6",
    nome: "Rapidex Logística",
    logo: logoRapidex,
    rating: 4.8,
    totalAvaliacoes: 1247,
    regiao: "Sudeste",
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: false,
    email: "contato@rapidexlogistica.com.br",
    website: "www.rapidexlogistica.com.br",
    indicadores: {
      indiceSolucao: 92,
      nivelServico: 89,
      tempoResposta: "2h",
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[],
  },
  {
    id: "7",
    nome: "TransCarga Brasil",
    logo: logoTranscarga,
    rating: 4.5,
    totalAvaliacoes: 856,
    regiao: "Sul",
    porte: "Médio" as const,
    tipoOperacao: ["Rodoviário", "Intermodal"],
    hasAwareSeal: false,
    email: "contato@transcargabrasil.com.br",
    website: "www.transcargabrasil.com.br",
    indicadores: {
      indiceSolucao: 88,
      nivelServico: 85,
      tempoResposta: "3h",
    },
    reputacao: "Bom" as const,
    comentarios: [] as Comentario[],
  },
  {
    id: "8",
    nome: "AeroTrans Cargo",
    logo: logoAerotrans,
    rating: 4.7,
    totalAvaliacoes: 623,
    regiao: "Sudeste",
    porte: "Grande" as const,
    tipoOperacao: ["Aéreo", "Expressa"],
    hasAwareSeal: false,
    email: "contato@aerotranscargo.com.br",
    website: "www.aerotranscargo.com.br",
    indicadores: {
      indiceSolucao: 94,
      nivelServico: 92,
      tempoResposta: "1h",
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[],
  },
  {
    id: "9",
    nome: "MarTrans Portuário",
    logo: logoMartrans,
    rating: 4.6,
    totalAvaliacoes: 387,
    regiao: "Sul",
    porte: "Grande" as const,
    tipoOperacao: ["Marítimo", "Intermodal"],
    hasAwareSeal: false,
    email: "contato@martransportuario.com.br",
    website: "www.martransportuario.com.br",
    indicadores: {
      indiceSolucao: 90,
      nivelServico: 87,
      tempoResposta: "2h",
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[],
  },
];
