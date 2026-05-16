"use client";

import { forwardRef, useRef, useState } from "react";
import { ArrowRightIcon, Bot, CheckCircle, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-background shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
);
Circle.displayName = "Circle";

function ProcessFlowStep() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  const nodes = [
    { ref: ref1, icon: MessageCircle, label: "Chat" },
    { ref: ref2, icon: Bot, label: "Contato" },
    { ref: ref3, icon: Phone, label: "Entrevista" },
    { ref: ref4, icon: CheckCircle, label: "Concluído" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex h-44 items-center justify-center overflow-hidden rounded-xl bg-muted/40"
    >
      <div className="flex w-full items-center justify-around px-2">
        {nodes.map(({ ref, icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Circle ref={ref}>
              <Icon className="size-5 text-foreground" />
            </Circle>
            <span className="max-w-[56px] text-center text-[11px] leading-tight text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
      <AnimatedBeam containerRef={containerRef} fromRef={ref1} toRef={ref2} duration={3} delay={0} repeatDelay={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={ref2} toRef={ref3} duration={3} delay={1.5} repeatDelay={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={ref3} toRef={ref4} duration={3} delay={3} repeatDelay={3} />
    </div>
  );
}

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingDialog({ open, onOpenChange }: OnboardingDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      media: (
        <div className="flex h-52 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700">
          <Bot className="size-20 text-white/90" strokeWidth={1.5} />
        </div>
      ),
      title: "Conheça a Wizard",
      description: "O assistente da WizeCode que transforma sua ideia em uma proposta personalizada.",
    },
    {
      media: (
        <div className="flex h-52 flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
          <span className="text-[80px] font-bold leading-none text-white/90">20</span>
          <span className="text-sm font-medium text-white/70">perguntas ou menos</span>
        </div>
      ),
      title: "Briefing em menos de 20 perguntas",
      description: "Sem formulários chatos. A Wizard conduz a conversa e coleta o que nossa equipe precisa.",
    },
    {
      media: <ProcessFlowStep />,
      title: "Do chat ao projeto",
      description:
        "Após o briefing, nossa equipe entra em contato, faz uma entrevista e começa o trabalho.",
    },
    {
      media: (
        <div className="flex h-52 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
          <ShieldCheck className="size-20 text-white/90" strokeWidth={1.5} />
        </div>
      ),
      title: "Seus dados estão seguros",
      description: "Só enviamos suas informações com sua confirmação. Nada é coletado sem você saber.",
    },
  ];

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  }

  function handleSkip() {
    setCurrentStep(steps.length - 1);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="space-y-5">
          {steps[currentStep].media}

          <div className="space-y-1.5 text-center">
            <DialogTitle className="text-xl font-semibold">{steps[currentStep].title}</DialogTitle>
            <DialogDescription>{steps[currentStep].description}</DialogDescription>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1.5">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === currentStep ? "w-5 bg-foreground" : "w-1.5 bg-muted"
                  )}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {currentStep < steps.length - 1 && (
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  Pular
                </Button>
              )}
              <Button size="sm" onClick={handleNext}>
                {currentStep === steps.length - 1 ? "Começar" : "Próximo"}
                <ArrowRightIcon className="ml-1.5 size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
