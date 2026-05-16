"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export interface BriefingData {
  empresa: string;
  segmento: string;
  projeto_descricao: string;
  funcionalidades_essenciais: string[];
  problema_principal: string;
  prazo: string;
  orcamento: string;
  classificacao_servico: string;
  [key: string]: unknown;
}

interface BriefingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: BriefingData;
}

export function BriefingDialog({ open, onOpenChange, briefing }: BriefingDialogProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Projeto registrado!</DialogTitle>
          <DialogDescription>
            Confira o resumo abaixo e preencha seus dados para receber a proposta.
          </DialogDescription>
        </DialogHeader>

        {/* Resumo do briefing */}
        <div className="rounded-lg bg-muted/50 p-4 space-y-3 text-sm">
          <div className="flex gap-2">
            <span className="text-muted-foreground w-20 shrink-0">Empresa</span>
            <span className="font-medium">{briefing.empresa || "—"}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground w-20 shrink-0">Segmento</span>
            <span>{briefing.segmento || "—"}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground w-20 shrink-0">Projeto</span>
            <span className="line-clamp-2">{briefing.projeto_descricao || "—"}</span>
          </div>

          {briefing.funcionalidades_essenciais?.length > 0 && (
            <div className="flex gap-2">
              <span className="text-muted-foreground w-20 shrink-0 pt-0.5">Essencial</span>
              <div className="flex flex-wrap gap-1.5">
                {briefing.funcionalidades_essenciais.map((f, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-background border px-2 py-0.5 text-xs font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {briefing.prazo && (
            <div className="flex gap-2">
              <span className="text-muted-foreground w-20 shrink-0">Prazo</span>
              <span>{briefing.prazo}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Formulário de contato */}
        <div className="space-y-4">
          <p className="text-sm font-medium">Seus dados de contato</p>

          <div className="space-y-1.5">
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              placeholder="João da Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="(11) 99999-9999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button type="button">
            Enviar proposta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
