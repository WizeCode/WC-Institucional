export default function Page() {
    return (
        <>
            {/* <div
                className="flex min-h-svh w-full bg-background text-foreground items-center justify-center"
                id="screenshot"
                data-theme-scope="preview"
            >
                <section className="border-b border-b-primary/50 bg-background pt-12 md:pt-20 w-full">
                    <div className="container">
                        <div className="flex w-full flex-col items-center justify-center gap-16">
                            <div className="flex flex-col justify-center gap-12">
                                <div className="flex w-full max-w-[32.5rem] flex-col gap-6">
                                    <h1 className="text-center text-4xl font-medium tracking-tighter text-foreground md:text-5xl">
                                        Gain control over your company's spending.
                                    </h1>
                                    <p className="text-center text-base text-muted-foreground">
                                        Reduce paperwork while gaining better control over spending, faster month-end processes, and more accurate reporting.
                                    </p>
                                    <div className="mx-auto w-full max-w-[25.625rem]">
                                        <form className="w-full">
                                            <div className="flex w-full flex-col items-start justify-center gap-2 sm:flex-row">
                                                <div
                                                    role="group"
                                                    data-slot="field"
                                                    data-orientation="vertical"
                                                    className="data-[invalid=true]:text-destructive gap-3 group/field flex flex-col *:w-full [&>_.sr-only]:w-auto w-full"
                                                    data-invalid="false"
                                                >
                                                    <label
                                                        data-slot="field-label"
                                                        className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-3 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col sr-only"
                                                        htmlFor="email"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        data-slot="input"
                                                        className="dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 file:text-foreground placeholder:text-muted-foreground min-w-0 border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm h-12 w-full rounded-lg px-3 py-2 text-center text-sm leading-loose"
                                                        id="email"
                                                        aria-invalid="false"
                                                        placeholder="Your work email"
                                                        type="email"
                                                        defaultValue=""
                                                        name="email"
                                                    />
                                                </div>
                                                <div className="w-full shrink-0 sm:w-fit">
                                                    <button
                                                        data-slot="button"
                                                        data-variant="default"
                                                        data-size="default"
                                                        className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border border-transparent bg-clip-padding focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none bg-primary text-primary-foreground hover:bg-primary/80 gap-1.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 h-fit w-full rounded-lg px-4 py-2.5 text-sm leading-loose font-medium sm:w-fit"
                                                        type="submit"
                                                    >
                                                        Get started for free
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-8">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-clock h-4 w-4 stroke-foreground"
                                            aria-hidden="true"
                                        >
                                            <path d="M12 6v6l4 2" />
                                            <circle cx="12" cy="12" r="10" />
                                        </svg>
                                        <div className="text-xs font-medium text-muted-foreground">4.7 on G2</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-send h-4 w-4 stroke-foreground"
                                            aria-hidden="true"
                                        >
                                            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                                            <path d="m21.854 2.147-10.94 10.939" />
                                        </svg>
                                        <div className="text-xs font-medium text-muted-foreground">4.8 on Capterra</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="relative mx-auto w-full max-w-[62.5rem] overflow-hidden">
                                    <div
                                        data-radix-aspect-ratio-wrapper=""
                                        style={{ position: "relative", width: "100%", paddingBottom: "47.6%" }}
                                    >
                                        <div data-slot="aspect-ratio" style={{ position: "absolute", inset: 0 }}>
                                            <div className="w-full">
                                                <div className="absolute top-0 left-0 w-[94.2%] overflow-hidden">
                                                    <img
                                                        alt=""
                                                        className="relative z-20 h-full w-full"
                                                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/desktop-1.png"
                                                    />
                                                    <img
                                                        alt=""
                                                        className="absolute top-[3%] left-[2%] z-10 w-full object-contain"
                                                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                                                    />
                                                </div>
                                                <div className="absolute right-0 -bottom-[35%] z-20 w-[23%] overflow-hidden">
                                                    <img
                                                        alt=""
                                                        className="relative z-20 h-full w-full"
                                                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-3.png"
                                                    />
                                                    <img
                                                        alt=""
                                                        className="absolute top-0 left-1/2 z-10 w-full -translate-x-1/2 rounded-[15px] md:rounded-[30px]"
                                                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div> */}
        </>
    );
}
