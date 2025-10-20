import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/StarRating";

interface AddComentarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (comentario: {
    titulo: string;
    descricao: string;
    rating: number;
  }) => void;
}

export const AddComentarioModal = ({ open, onOpenChange, onSubmit }: AddComentarioModalProps) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = () => {
    if (!titulo.trim() || !descricao.trim()) {
      return;
    }

    onSubmit({
      titulo,
      descricao,
      rating
    });

    // Reset form
    setTitulo("");
    setDescricao("");
    setRating(5);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Comentário sobre a transportadora</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título do comentário</Label>
            <Input
              id="titulo"
              placeholder="Digite o título do seu comentário"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição do comentário</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva sua experiência com a transportadora"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Avaliação</Label>
            <div className="flex items-center gap-2">
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size="lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!titulo.trim() || !descricao.trim()}>
            Enviar Comentário
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
