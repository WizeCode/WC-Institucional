import { icons } from "@/lib/icons"
import type { ContactChannel } from "@/lib/social"
import Link from "next/link"

interface ContactChannelsProps {
    channels: ContactChannel[]
}

const ContactChannels = ({ channels }: ContactChannelsProps) => {
    return (
        <div className="flex-col justify-start gap-2 lg:flex">
            {channels.map((channel) => {
                const Icon = icons[channel.icon]
                return (
                    <Link
                        key={channel.id}
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                                <Icon className="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                                <p className="font-light text-foreground">
                                    {channel.value}
                                </p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export { ContactChannels }
