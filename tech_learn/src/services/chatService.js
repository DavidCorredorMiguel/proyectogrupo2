// funcion para enviar mensajes al bot desde el frontend
export async function sendMessageToBot(message) {
    // hacemos la peticion al backend, que a su vez llama a bedrock
    const response = await fetch("http://localhost:3001/chat", {
        // envia datos con la peticion por POST
        // post significa que vamos a enviar datos en el cuerpo de la peticion
        // get significa que solo vamos a pedir datos sin enviar nada
        method: "POST",
        headers: {
            // indicamos que enviamos JSON
            "Content-Type": "application/json",
        },
        // convertimos a JSON el mensaje
        body: JSON.stringify({ message }),
    });

    // esperamos la respuesta y la convertimos a JSON
    const data = await response.json();
    // devolvemos la respuesta del bot
    return data.answer;
}
