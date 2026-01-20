// importamos express: framework para crear servidores web en Node.js
import express from "express";

// importamos cors: middleware para permitir solicitudes entre diferentes orígenes
// permite que el frontend (que puede estar en otro dominio o puerto) acceda a este backend
import cors from "cors";

// importamos fs: sirve para leer y escribir archivos (file system de Node.js)
import fs from "fs";

// importamos path: módulo para manejar rutas de archivos y directorios
import path from "path";

// importamos las clases necesrias, el cliente y comando de AWS SDK para Bedrock
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// creamos la aplicación de express
// la app será nuestro servidor web de backend para manejar rutas y peticiones HTTP 
//  el servidor escuchará en el puerto 3001 que es distinto del puerto 3000 del frontend de React
const app = express();

//  usamos cors y express.json como middlewares globales, para permitir peticiones CORS desde otros origenes frontend
app.use(cors());

// middleware para parsear JSON en el body de las peticiones
// esto permite que podamos recibir y manejar datos en formato JSON en las solicitudes HTTP
app.use(express.json());

/* =========================
   CONFIG AWS BEDROCK
========================= */
// Creamos el cliente de Bedrock con la configuración necesaria
const client = new BedrockRuntimeClient({
  region: "us-east-1",
  profile: "NoeliaAWS",
});

// --------- 🟢 NUEVO: MEMORIA GLOBAL ----------

// Conversación en memoria (GLOBAL – sin sessionId)
let conversation = [
  {
    role: "user",
    content: [
      {
        text: `
Eres TechBot, un asistente virtual de una tienda online de tecnología.

Normas obligatorias:
- Respuestas medias (máx 15 líneas)
- NO repetir preguntas ya respondidas
- Mantén el contexto de la conversación
- Si el usuario ya indicó el producto, NO cambies de tema
- Habla como un vendedor, no como un manual técnico
- Siempre pregunta solo UNA cosa al final
`,
      },
    ],
  },
];

/* =========================
   CHAT CON GUARDARRAÍLES
========================= */

// Ruta POST /chat para manejar las solicitudes de chat
app.post("/chat", async (req, res) => {

  // Extraemos el mensaje del cuerpo de la solicitud que envia el frontend
  const { message } = req.body;

  // si no hay mensaje o está vacío, respondemos con un mensaje predeterminado
  if (!message || !message.trim()) {
    return res.json({
      answer:
        "Escribe una consulta sobre electrónica y estaré encantado de ayudarte 😊",
    });
  }

  // Filtro previo simple, lista de temas no permitidos
  const forbiddenTopics = [
    "politica",
    "religion",
    "medicina",
    "salud",
    "sexo",
    "drogas",
    "historia",
    "derecho",
    "abogado",
    "napoleon",
  ];

  const lowerMessage = message.toLowerCase();
  
  // Si el mensaje contiene alguna palabra prohibida
  // .some() devuelve true si al menos un elemento cumple la condición
  if (forbiddenTopics.some((word) => lowerMessage.includes(word))) {
    return res.json({
      answer:
        "Lo siento 😊, solo puedo ayudarte con temas de electrónica y equipos electrónicos.",
    });
  }

  // 🟢 NUEVO: guardamos el mensaje del usuario
conversation.push({
  role: "user",
  content: [{ text: message }],
});


  try {
    // Configuramos/preparamos la entrada para invocar el modelo de Bedrock
    const input = {
      modelId: "amazon.nova-lite-v1:0",
      contentType: "application/json", //indica que enviamos JSON
      accept: "application/json", // indicamos que queremos recibir JSON

     // convertimos a JSON la entrada con el mensaje y el guardarraíl
// 🔴 CAMBIO IMPORTANTE
body: JSON.stringify({
  messages: conversation, // 👈 AQUÍ ESTÁ LA MEMORIA
  inferenceConfig: {
    maxTokens: 120,
  },
}),

    };

    // mostramos el mensaje recibido en el backend por consola para debug
    console.log("📩 Mensaje usuario:", message);

    // creamos el comando para invocar el modelo con la entrada preparada
    const command = new InvokeModelCommand(input);
    // enviamos el comando al cliente de Bedrock y esperamos la respuesta
    const response = await client.send(command);

    // leemos y parseamos la respuesta del modelo a texto
    // buffer a string, buffer es un tipo de dato para manejar datos binarios, porque la respuesta viene asi desde AWS
    const responseBody = Buffer.from(
      await response.body
    ).toString("utf-8");

    // parseamos el string JSON a objeto JavaScript, sirve para acceder a los datos de la respuesta con un objeto JS tipo json
    // el responseBody es un string JSON que contiene la respuesta del modelo y nosotros lo convertimos a objeto JS
    // JSON.parse convierte el string JSON a objeto JS
    // LA DIFERENCIA ENTRE JSON Y OBJETO JS ES QUE EN JSON LAS CLAVES VAN ENTRE COMILLAS DOBLES 
    // Y ES NECESARIO PARSEARLO PORQUE VIENE COMO STRING Y NO PODEMOS ACCEDER A SUS PROPIEDADES DIRECTAMENTE DESDE UN STRING
    // LA DIFERENCIA ENTRE STRING JSON  Y JSON ES QUE EL STRING JSON ES UNA REPRESENTACIÓN EN TEXTO DE UN OBJETO JSON
    // Y EL OBJETO JSON ES UNA ESTRUCTURA DE DATOS EN MEMORIA QUE PODEMOS MANIPULAR EN NUESTRO CÓDIGO
    // LA ESTRUCTURA DE DATOS JSON ES MUY SIMILAR A LOS OBJETOS EN JAVASCRIPT, PERO NO SON EXACTAMENTE LO MISMO
    // POR EJEMPLO, EN JSON NO PUEDEN HABER FUNCIONES NI SÍMBOLOS, SOLO TIPOS DE DATOS PRIMITIVOS Y ESTRUCTURAS DE DATOS COMO OBJETOS Y ARRAYS
    // EJEMPLO DE JSON: {"clave": "valor", "numero": 123, "array": [1, 2, 3]}
    // EJEMPLO DE OBJETO JS: { clave: "valor", numero: 123, array: [1, 2, 3], funcion: () => {} }
    const parsed = JSON.parse(responseBody);

    // extraemos el texto de la respuesta del bot desde el objeto parseado
    const botAnswer =
    // parsed.output.message.content es un array, accedemos al primer elemento [0] y su propiedad text
    // usamos el operador de encadenamiento opcional ?. para evitar errores si alguna propiedad no existe
    // si alguna propiedad no existe, botAnswer será undefined
    // .text contiene la respuesta generada por el modelo .content es un array de objetos los cuales tienen la propiedad text
    // .message es el objeto que contiene la respuesta del modelo 
      parsed?.output?.message?.content?.[0]?.text;

      // 🟢 NUEVO: guardamos la respuesta del bot
conversation.push({
  role: "assistant",
  content: [{ text: botAnswer }],
});

// 🟡 OPCIONAL PERO RECOMENDADO
if (conversation.length > 12) {
  // mantenemos el guardarraíl y los últimos mensajes
  conversation.splice(1, 2);
}



    // si no hay respuesta del bot, enviamos un mensaje predeterminado
    if (!botAnswer) {
      return res.json({
        answer:
          "Ahora mismo no puedo responder 😔. Inténtalo de nuevo en unos segundos.",
      });
    }

    // enviamos la respuesta del bot al frontend en formato JSON
    return res.json({ answer: botAnswer });

  // capturamos errores en la comunicación con Bedrock o en el procesamiento
  } catch (error) {
    console.error("❌ ERROR BACKEND /chat:", error);

    return res.json({
      answer:
        "Ahora mismo no puedo responder 😔. Inténtalo de nuevo en unos segundos.",
    });
  }
});



/* =========================
   VISITAS DE PRODUCTOS
========================= */
// ruta del archivo views.json para almacenar las visitas
const VIEWS_FILE = path.join(process.cwd(), "views.json");

// Función para leer las visitas del archivo
function readViews() {
  try {
    // Leemos el archivo
    const raw = fs.readFileSync(VIEWS_FILE, "utf-8");

    // Convertimos a objeto JS
    return JSON.parse(raw || "{}");
  } catch {
    // Si el archivo no existe o hay error, devolvemos objeto vacío
    return {};
  }
}

// Función para guardar las visitas en el archivo
function writeViews(data) {
  // fs.writeFileSync escribe datos en un archivo, si no existe lo crea
  // data es un objeto con las visitas que convertimos a JSON
  fs.writeFileSync( //fs es el que maneja el sistema de archivos en Node.js
    VIEWS_FILE,
    // Convertimos el objeto a JSON bonito
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

/* Sumar visita a un producto */
// app es el servidor express nuestro backend, el backend escucha peticiones POST en /products/:id/view
// .post indica que esta ruta solo responde a peticiones POST, req es el objeto de la solicitud y res es el objeto de la respuesta
// app.post define una ruta en el servidor express para manejar solicitudes HTTP POST, 
// en el momento que el frontend haga una solicitud POST a esta ruta, se ejecuta la función callback
// la funcion callback recibe dos parámetros: req (request) y res (response)
// la funcion callback es exactamente esta parte del codigo: (req, res) => { ... }
app.post("/products/:id/view", (req, res) => { 
  // ruta para sumar visita a un producto, el :id es un parámetro dinámico que representa el id del producto 
  // req contiene información sobre la solicitud HTTP entrante del frontend
  // res se utiliza para enviar una respuesta de vuelta al cliente que hizo la solicitud (backend envia de vuelta)

  // Obtenemos el id del producto, params contiene los parámetros de la ruta
  // en este const id obtenemos el valor del parámetro dinámico :id de la ruta
  const { id } = req.params;

  // Leemos las visitas actuales, readViews es la función lee el archivo views.json
  const views = readViews();

  // Sumamos 1 visita (si no existe, empieza en 0)
  views[id] = (views[id] || 0) + 1;

  // Guardamos el archivo actualizado
  writeViews(views);

  // Devolvemos el resultado
  // res.json envía una respuesta HTTP en formato JSON al cliente que hizo la solicitud (al frontend)
  // enviamos el id del producto y las visitas actualizadas
  return res.json({ id, views: views[id] });
});


/* Obtener más vistos */
app.get("/products/most-viewed", (req, res) => {
  const views = readViews();
 
  // convertimos el objeto views a un array de [id, count] y lo ordenamos por count descendente
  // luego tomamos los 8 primeros y los mapeamos a un array de objetos {id, views}
  // Object.entries convierte el objeto en un array de pares [clave, valor]
  // ejemplo de array de pares: [ ["1", 10], ["2", 5], ["3", 8] ]
  const top = Object.entries(views)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    // mapeamos para convertir los pares [id, count] en objetos {id, views}
    .map(([id, count]) => ({
      // convertimos id a número
      id: Number(id),
      views: count,
    }));

  return res.json(top);
});

/* =========================
   SERVIDOR ON
========================= */

// arrancamos el servidor en el puerto definido o 3001 por defecto

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(
    `✅ Backend escuchando en ${PORT}`
    );
});
