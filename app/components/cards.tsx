import DecayCard from "./decaycard";

interface CardsProps {
    className?: string;
}

export default function Cards({ className = "" }: CardsProps) {
    return (
        <div className={`${className}`}>
            <DecayCard className="relative z-10" width={300} height={300}>
                <div className="flex flex-col gap-4 px-8 text-center">
                    <img
                        src="/images/despesas.svg"
                        alt="Ícone decorativo"
                        className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 size-20"
                    />
                    <span className='text-white'>
                        Reduza <span className='bg-techGreen text-black px-1'>despesas</span>,<br />não segurança.
                    </span>
                    <p className='text-white/90 text-sm font-light mb-[-10px]'>
                        Tenha resultados de alto nível sem o custo e a complexidade de construir uma equipe interna de alto nível.
                    </p>
                </div>
            </DecayCard>
            <DecayCard className="relative z-10" width={300} height={300}>
                <div className="flex flex-col gap-4 px-7 text-center">
                    <img
                        src="/images/padrao.svg"
                        alt="Ícone decorativo"
                        className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 size-20"
                    />
                    <span className='text-white'>
                        Se adeque ao padrão de <span className='bg-techGreen text-black px-1'>mercado</span>.
                    </span>
                    <p className='text-white/90 text-sm font-light mb-[-10px]'>
                        Implemente práticas de segurança sob medida, trazendo conformidade em relação às leis e normas do mercado.
                    </p>
                </div>
            </DecayCard>
            <DecayCard className="relative z-10" width={300} height={300}>
                <div className="flex flex-col gap-4 px-8 text-center">
                    <img
                        src="/images/trabalhe.svg"
                        alt="Ícone decorativo"
                        className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 size-20"
                    />
                    <span className='text-white'>
                        Trabalhe com os <span className='bg-techGreen text-black px-1'>melhores</span>.
                    </span>
                    <p className='text-white/90 text-sm font-light mb-[-10px]'>
                        Use a tecnologia, mas não seja dependente. Reforce sua segurança com quem mais domina a tecnologia.
                    </p>
                </div>
            </DecayCard>
        </div>
    )
}
