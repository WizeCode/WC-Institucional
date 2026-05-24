import { ChatBot } from "@/components/chat/chat-bot";

export default function Page() {
    return (
        <div className="flex flex-col h-[calc(100dvh-80px)] overflow-hidden">
            <ChatBot/>
        </div>
    );
}
