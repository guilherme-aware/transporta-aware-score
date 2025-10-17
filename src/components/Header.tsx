import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import awareLogo from "@/assets/aware-logo.png";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onMenuToggle: () => void;
}

export const Header = ({ searchTerm, onSearchChange, onMenuToggle }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 mr-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={awareLogo} alt="LogiRep Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold text-foreground">LogiRep</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 mr-8">
          <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="/transportadoras" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Transportadoras
          </a>
          <a href="/avaliacoes" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Avaliações
          </a>
          <a href="/sobre" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Sobre
          </a>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Buscar transportadoras..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden ml-4"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* CTA Button */}
        <div className="hidden md:flex ml-4">
          <Button variant="aware" size="sm">
            Avaliar Transportadora
          </Button>
        </div>
      </div>
    </header>
  );
};