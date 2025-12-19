import { useState } from "react";
import { sendMessageToBot } from "../services/chatService";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hola 👋 Soy TechBot, ¿en qué puedo ayudarte?" }
    ]);
    const [input, setInput] = useState("");

    async function handleSend() {
        if (!input.trim()) return;

        const newMessages = [...messages, { from: "usuario", text: input }];
        setMessages(newMessages);
        setInput("");

        const answer = await sendMessageToBot(input);
        setMessages([...newMessages, { from: "bot", text: answer }]);
    }

    return (
        <>
            {/* BOTON FLOTANTE (SOLO CUANDO ESTA CERRADO) */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="
                        fixed bottom-6 right-6
                        w-24 h-24
                        rounded-full
                        overflow-hidden
                        shadow-[0_0_0_0_rgba(37,99,235,0.4)]
                        hover:shadow-[0_0_30px_8px_rgba(37,99,235,0.45)]
                        transition-all duration-300
                        animate-[pulse_3s_ease-in-out_infinite]
                    "
                >
                    <img
                        src="/images/robot.png"
                        alt="Abrir chat"
                        className="w-full h-full object-cover"
                    />
                </button>
            )}

            {/* CHAT ABIERTO */}
            {open && (
                <div
                    className="
                        fixed bottom-6 right-6
                        w-96
                        bg-slate-50
                        rounded-2xl
                        shadow-2xl
                        overflow-hidden
                        flex flex-col
                    "
                >
                    {/* HEADER */}
                    <div className="px-5 py-4 bg-blue-600 text-white flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                                <img
                                    src="/images/robot.png"
                                    alt="TechBot"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col leading-tight">
                                <span className="font-semibold text-base">
                                    TechBot
                                </span>
                                <span className="text-sm opacity-90">
                                    Asistente virtual
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-white/80 hover:text-white text-xl leading-none"
                        >
                            ✕
                        </button>
                    </div>

                    {/* MENSAJES */}
                    <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex ${
                                    m.from === "usuario"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`
                                        max-w-[75%]
                                        px-4 py-2
                                        text-sm
                                        rounded-2xl
                                        ${
                                            m.from === "usuario"
                                                ? "bg-blue-600 text-white rounded-br-sm"
                                                : "bg-white shadow text-gray-800 rounded-bl-sm"
                                        }
                                    `}
                                >
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* INPUT */}
                    <div className="p-4 bg-white flex items-center gap-3">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu consulta..."
                            className="
                                flex-1
                                px-5 py-3
                                rounded-full
                                bg-gray-100
                                text-sm
                                focus:outline-none
                                focus:ring-2 focus:ring-blue-500
                            "
                        />

                        {/* BOTÓN ENVIAR */}
                        <button
                            onClick={handleSend}
                            className="
                                w-12 h-12
                                flex items-center justify-center
                                rounded-full
                                bg-blue-600 hover:bg-blue-700
                                text-white
                                shadow-lg
                                transition
                            "
                            aria-label="Enviar mensaje"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                            >
                                <path d="M3.4 20.4L21 12 3.4 3.6 3 10l12 2-12 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
