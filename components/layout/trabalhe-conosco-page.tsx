import { TrabalheConoscoForm } from "@/components/forms/trabalhe-conosco-form"

const TrabalheConoscoPage = () => {
    return (
        <section className="my-8 px-8">
            <div className="container mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 py-12 sm:py-16">
                <div className="mb-8 flex flex-1 flex-col gap-2 text-start">
                    <h1 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                        Faça parte do nosso banco de talentos
                    </h1>
                    <p className="mb-4 text-lg text-muted-foreground lg:text-xl">
                        Ficamos felizes em saber que você tem interesse em crescer com a WizeCode!
                        Cadastre-se e entraremos em contato quando surgir uma
                        oportunidade com o seu perfil.
                    </p>
                </div>
                <div className="flex-1 rounded-lg shadow-lg dark:bg-muted">
                    <TrabalheConoscoForm />
                </div>
            </div>
        </section>
    )
}

export { TrabalheConoscoPage }
