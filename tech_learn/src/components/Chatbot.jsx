import { useState, useEffect, useRef } from "react";
// función que envía el mensaje al bot y recibe la respuesta
// hace llamada al backend/api
import { sendMessageToBot } from "../services/chatService"; 
import styles from "../styles/Chatbot.module.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([ 
    // useState es un hook de React que permite agregar estado a componentes funcionales, 
    // un hook es una función especial que permite "engancharse" a las características de React.
    { from: "bot", text: "Hola 👋 Soy TechBot, ¿en qué puedo ayudarte?" } // from: "usuario" | "bot"
  ]);
  // Estado para el input del usuario
  const [input, setInput] = useState("");
  // REF PARA AUTOSCROLL
  //useRef es un hook de React que permite crear una referencia mutable 
  // que persiste durante todo el ciclo de vida del componente.
  const messagesEndRef = useRef(null);
  //EJECUTA ESTO (AUTOSCROLL) CADA VEZ QUE CAMBIAN LOS MENSAJES
  useEffect(() => {
    // Si existe messagesEndRef.current, llama a scrollIntoView 
    // para desplazar el contenedor de mensajes hacia abajo suavemente.
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  //handleSend se encarga de enviar el mensaje del usuario al bot y actualizar el estado de los mensajes.
  async function handleSend() {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "usuario", text: input }];
    // Actualiza el estado de mensajes y limpia el input
    setMessages(newMessages);
    setInput("");
    // Envía el mensaje al bot y espera la respuesta, pedimos la respuesta asincrónicamente
    const answer = await sendMessageToBot(input);
    // se añade la respuesta del bot a los mensajes
    setMessages([...newMessages, { from: "bot", text: answer }]);
  }
  return (
    <>
      {/* BOTÓN FLOTANTE */}
      {!open && ( // si el chat está cerrado, muestra el botón flotante
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-24 h-24 rounded-full overflow-hidden
            shadow-[0_0_0_0_rgba(37,99,235,0.4)]
            hover:shadow-[0_0_30px_8px_rgba(0,139,139,0.45)]
            transition-all duration-300
            animate-[pulse_3s_ease-in-out_infinite]">
          <img src="/images/robot.png" alt="Abrir chat"
            className="w-full h-full object-cover"/>
        </button>
      )}
      {/* CHAT */}
      {open && (
        <div className={styles.chatbot}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                <img src="/images/robot.png" alt="TechBot"
                  className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-base">TechBot</span>
                <span className="text-sm opacity-90">Asistente virtual</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-xl">
              ✕</button>
          </div>
          {/* MENSAJES */}
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i}
                className={`${styles.messageRow} ${
                  m.from === "usuario" ? styles.user : styles.bot
                }`}>
                <div className={`${styles.bubble} ${
                    m.from === "usuario"
                      ? styles.userBubble
                      : styles.botBubble
                  }`}>{m.text}
                </div>
              </div>
            ))}
            {/* MARCA INVISIBLE PARA AUTOSCROLL */}
            {/* hace que el contenedor de mensajes se desplace hacia abajo automáticamente 
              el scroll baja justo aqui*/}
            <div ref={messagesEndRef} />
          </div>
          {/* INPUT */}
          <div className={styles.inputBar}>
            <input value={input}
              //target.value obtiene el valor actual del campo de entrada
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu consulta..."
              className="flex-1 px-5 py-3 rounded-full
                bg-gray-100 text-sm focus:outline-none
                focus:ring-2 focus:ring-blue-500" />
            <button onClick={handleSend}
              className="w-12 h-12 flex items-center justify-center
                rounded-full bg-[#008B8B] hover:bg-[#007777]
                text-white shadow-lg transition"
              aria-label="Enviar mensaje">
              <svg xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 24 24"
                className="w-6 h-6">
                <path d="M3.4 20.4L21 12 3.4 3.6 3 10l12 2-12 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
