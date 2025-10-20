import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { transportadorasData } from "@/data/transportadoras";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [selectedTransportadoraId, setSelectedTransportadoraId] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = () => {
    if (!selectedTransportadoraId) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma transportadora.",
        variant: "destructive"
      });
      return;
    }

    const success = login(selectedTransportadoraId);
    if (success) {
      toast({
        title: "Login realizado",
        description: "Você está agora logado como transportadora.",
      });
      onClose();
    } else {
      toast({
        title: "Erro",
        description: "Falha ao realizar login.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login como Transportadora</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Selecione sua transportadora</Label>
            <Select value={selectedTransportadoraId} onValueChange={setSelectedTransportadoraId}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha uma transportadora" />
              </SelectTrigger>
              <SelectContent>
                {transportadorasData.map((transportadora) => (
                  <SelectItem key={transportadora.id} value={transportadora.id}>
                    {transportadora.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleLogin} className="w-full">
            Entrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
