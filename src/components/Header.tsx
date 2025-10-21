import { Search, Menu, LogOut, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import awareLogo from "@/assets/aware-logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "./LoginModal";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onMenuToggle: () => void;
}

export const Header = ({ searchTerm, onSearchChange, onMenuToggle }: HeaderProps) => {
  const { loggedInTransportadora, logout, isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 mr-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={awareLogo} alt="Aware.community Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Aware.community</h1>
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

        {/* User Info / Login Button */}
        <div className="hidden md:flex ml-4 items-center gap-3">
          {isAuthenticated && loggedInTransportadora ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <div className="w-6 h-6 bg-background rounded flex items-center justify-center">
                  {loggedInTransportadora.logo ? (
                    <img 
                      src={loggedInTransportadora.logo} 
                      alt={loggedInTransportadora.nome}
                      className="w-4 h-4 object-contain"
                    />
                  ) : (
                    <Truck className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <span className="text-sm font-medium">{loggedInTransportadora.nome}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
             <Button variant="aware" onClick={() => setIsLoginModalOpen(true)}>
                Login
              </Button>
              <Button 
                variant="default" 
                onClick={() => window.open('https://saas.awarelog.com/signup', '_blank')}
              >
                Quero me cadastrar
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
    <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};
