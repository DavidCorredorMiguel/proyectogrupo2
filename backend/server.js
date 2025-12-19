import express from "express";
import cors from "cors";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const app = express();
app.use(cors());
app.use(express.json());

// === CONFIG AWS (IMPORTANTE) ===
const client = new BedrockRuntimeClient({
    region: "us-east-1",     // MI REGION
    profile: "NoeliaAWS",    // MI PERFIL SSO
});

// === ENDPOINT QUE USA REACT ===
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const input = {
            modelId: "amazon.nova-lite-v1:0",
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify({
                messages: [
                    {
                        role: "user",
                        content: [
                            { text: message }
                        ]
                    }
                ],
                inferenceConfig: {
                    maxTokens: 60
                }
            }),
        };

        const command = new InvokeModelCommand(input);
        const response = await client.send(command);

        const responseBody = Buffer.from(await response.body).toString("utf-8");
        const parsed = JSON.parse(responseBody);

        // lectura correcta de Amazon Nova
        const botAnswer = parsed.output.message.content[0].text;

        return res.json({ answer: botAnswer });

    } catch (error) {
        console.error("❌ ERROR BACKEND:", error);
        return res.status(500).json({ error: "Error al llamar a Bedrock" });
    }
});

// === FUNCIONALIDAD VISTAS PRODUCTOS (guardado persistente)===
import fs from "fs";
import path from "path";

const VIEWS_FILE = path.join(process.cwd(), "views.json");

function readViews() {
    try {
        const raw = fs.readFileSync(VIEWS_FILE, "utf-8");
        return JSON.parse(raw || "{}");
    } catch (e) {
        return {};
    }
}

function writeViews(data) {
    fs.writeFileSync(VIEWS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// 1) Sumar 1 visita a un producto
app.post("/products/:id/view", (req, res) => {
    const { id } = req.params;

    const views = readViews();
    views[id] = (views[id] || 0) + 1;
    writeViews(views);

    return res.json({ id, views: views[id] });
});

// 2) Obtener top mas vistos (devuelve ids ordenados)
app.get("/products/most-viewed", (req, res) => {
    const views = readViews();

    const top = Object.entries(views) // [ ["5", 12], ["2", 7] ]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([id, count]) => ({ id: Number(id), views: count }));

    return res.json(top);
});

// Servidor ON
app.listen(3001, () => {
    console.log("✅ Backend escuchando en http://localhost:3001");
});
