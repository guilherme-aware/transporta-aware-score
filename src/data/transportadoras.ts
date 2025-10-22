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
  regiao: string[];
  porte: "Pequeno" | "Médio" | "Grande";
  tipoOperacao: string[];
  hasAwareSeal: boolean;
  email: string;
  website: string;
  indicadores: {
    indiceSolucao: number;
    nivelServico: number;
    tempoResposta: string;
    eficienciaOperacional: number;
    pontualidade: number;
    segurancaCarga: number;
    sustentabilidade: number;
    satisfacaoCliente: number;
    flexibilidade: number;
    tecnologia: number;
    custoBeneficio: number;
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
    regiao: ["Nordeste"],
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "contato@gmstransporte.com.br",
    website: "www.gmstransporte.com.br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
      eficienciaOperacional: 98,
      pontualidade: 99,
      segurancaCarga: 97,
      sustentabilidade: 95,
      satisfacaoCliente: 99,
      flexibilidade: 98,
      tecnologia: 97,
      custoBeneficio: 96,
    },
    reputacao: "Excelente" as const,
    comentarios: [
      {
        id: 101,
        autor: "Cliente Logística Norte",
        rating: 5,
        data: "2025-10-10",
        titulo: "Entrega rápida e sem avarias",
        descricao: "Trabalhamos com a GMS há meses e sempre entregam no prazo. Ótima comunicação e sem avarias nas cargas.",
        respostas: []
      },
      {
        id: 102,
        autor: "Operador de Armazém",
        rating: 4,
        data: "2025-09-22",
        titulo: "Boa experiência, dúvida sobre rastreamento",
        descricao: "No geral muito satisfeito, porém às vezes o rastreamento demora a atualizar. Há previsão de melhoria nesse serviço?",
        respostas: []
      },
      {
        id: 103,
        autor: "Transportador Parceiro",
        rating: 5,
        data: "2025-08-15",
        titulo: "Profissionalismo e suporte",
        descricao: "Equipe muito profissional, o suporte resolveu um problema de última hora e evitou um atraso grande. Recomendo.",
        respostas: []
      }
    ] as Comentario[],
  },
  {
    id: "2",
    nome: "Grupo Sanches",
    logo: logoGrupoSanches,
    rating: 5,
    totalAvaliacoes: 1000,
    regiao: ["Brasil"],
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "contato@gruposanches.com.br",
    website: "www.gruposanches.com.br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
      eficienciaOperacional: 97,
      pontualidade: 98,
      segurancaCarga: 97,
      sustentabilidade: 96,
      satisfacaoCliente: 98,
      flexibilidade: 97,
      tecnologia: 99,
      custoBeneficio: 97,
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
    regiao: ["Brasil"],
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "comercial@cozapi.com.br ",
    website: "www.cozapi.com.br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
      eficienciaOperacional: 99,
      pontualidade: 99,
      segurancaCarga: 98,
      sustentabilidade: 97,
      satisfacaoCliente: 99,
      flexibilidade: 98,
      tecnologia: 98,
      custoBeneficio: 98,
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
    regiao: ["Mundial"],
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "comercial@drklogistica.com.br",
    website: "www.drklogistica.com.br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
      eficienciaOperacional: 98,
      pontualidade: 98,
      segurancaCarga: 97,
      sustentabilidade: 97,
      satisfacaoCliente: 98,
      flexibilidade: 97,
      tecnologia: 99,
      custoBeneficio: 97,
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
    regiao: ["Mundial"],
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: true,
    email: "contato@dsv.com",
    website: "www.dsv.com/pt-br",
    indicadores: {
      indiceSolucao: 100,
      nivelServico: 100,
      tempoResposta: "1h",
      eficienciaOperacional: 99,
      pontualidade: 99,
      segurancaCarga: 98,
      sustentabilidade: 98,
      satisfacaoCliente: 99,
      flexibilidade: 98,
      tecnologia: 99,
      custoBeneficio: 98,
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
    regiao: ["Sudeste"],
    porte: "Grande" as const,
    tipoOperacao: ["Rodoviário", "Expressa"],
    hasAwareSeal: false,
    email: "contato@rapidexlogistica.com.br",
    website: "www.rapidexlogistica.com.br",
    indicadores: {
      indiceSolucao: 92,
      nivelServico: 89,
      tempoResposta: "2h",
      eficienciaOperacional: 90,
      pontualidade: 91,
      segurancaCarga: 92,
      sustentabilidade: 90,
      satisfacaoCliente: 93,
      flexibilidade: 91,
      tecnologia: 92,
      custoBeneficio: 90,
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
    regiao: ["Sul"],
    porte: "Médio" as const,
    tipoOperacao: ["Rodoviário", "Intermodal"],
    hasAwareSeal: false,
    email: "contato@transcargabrasil.com.br",
    website: "www.transcargabrasil.com.br",
    indicadores: {
      indiceSolucao: 88,
      nivelServico: 85,
      tempoResposta: "3h",
      eficienciaOperacional: 87,
      pontualidade: 88,
      segurancaCarga: 89,
      sustentabilidade: 87,
      satisfacaoCliente: 90,
      flexibilidade: 88,
      tecnologia: 89,
      custoBeneficio: 88,
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
    regiao: ["Sudeste"],
    porte: "Grande" as const,
    tipoOperacao: ["Aéreo", "Expressa"],
    hasAwareSeal: false,
    email: "contato@aerotranscargo.com.br",
    website: "www.aerotranscargo.com.br",
    indicadores: {
      indiceSolucao: 94,
      nivelServico: 92,
      tempoResposta: "1h",
      eficienciaOperacional: 95,
      pontualidade: 96,
      segurancaCarga: 95,
      sustentabilidade: 94,
      satisfacaoCliente: 97,
      flexibilidade: 96,
      tecnologia: 95,
      custoBeneficio: 96,
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
    regiao: ["Sul"],
    porte: "Grande" as const,
    tipoOperacao: ["Marítimo", "Intermodal"],
    hasAwareSeal: false,
    email: "contato@martransportuario.com.br",
    website: "www.martransportuario.com.br",
    indicadores: {
      indiceSolucao: 90,
      nivelServico: 87,
      tempoResposta: "2h",
      eficienciaOperacional: 91,
      pontualidade: 92,
      segurancaCarga: 93,
      sustentabilidade: 91,
      satisfacaoCliente: 94,
      flexibilidade: 92,
      tecnologia: 93,
      custoBeneficio: 92,
    },
    reputacao: "Excelente" as const,
    comentarios: [] as Comentario[],
  },
];
