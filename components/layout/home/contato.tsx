import { cn } from '@/lib/utils'
import { ContatoForm } from '@/components/forms/contato-form'

function Contato() {
  return (
    <section className={cn("flex justify-center px-4 py-24")}>
        <ContatoForm/>
    </section>
  )
}

export  { Contato }