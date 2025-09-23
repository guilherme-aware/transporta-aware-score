import { Search, Award, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
      <div className="container mx-auto px-6 text-center">
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Encontre as Melhores
            <span className="text-primary block">Transportadoras do Brasil</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Compare, avalie e escolha transportadoras com base em reputação real, 
            avaliações de clientes e indicadores de desempenho logístico verificados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="min-w-48">
              <Search className="mr-2 h-5 w-5" />
              Buscar Transportadoras
            </Button>
            
            <Button variant="aware" size="lg" className="min-w-48">
              <Award className="mr-2 h-5 w-5" />
              Avaliar Empresa
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Compare Indicadores</h3>
            <p className="text-muted-foreground text-sm">
              Índice de solução, nível de serviço e tempo de resposta em dados auditados.
            </p>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Selo Aware</h3>
            <p className="text-muted-foreground text-sm">
              Identifique empresas com dados verificados e auditados por nossa equipe.
            </p>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Avaliações Reais</h3>
            <p className="text-muted-foreground text-sm">
              Comentários e notas de embarcadores verificados para máxima transparência.
            </p>
          </Card>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-primary">1,200+</div>
            <div className="text-sm text-muted-foreground">Transportadoras</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">15,000+</div>
            <div className="text-sm text-muted-foreground">Avaliações</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">300+</div>
            <div className="text-sm text-muted-foreground">Com Selo Aware</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">95%</div>
            <div className="text-sm text-muted-foreground">Satisfação</div>
          </div>
        </div>
      </div>
    </section>
  );
};