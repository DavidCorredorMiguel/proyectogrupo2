export const mockProducts = [
  {
    id: 1,
    name: "Portátil Gaming",
    price: 899.99,
    image: "/images/portatil.jpg",
    category: "Electrónica",
    description: "Portátil de alto rendimiento para juegos y tareas exigentes.",
    descriptionC:
      "Portátil gaming equipado con GPU dedicada RTX 4060, procesador de última generación, pantalla de alta tasa de refresco y sistema de refrigeración avanzado.",
    features: {
      sistemaOperativo: "Windows 11",
      procesador: "Intel Core i7",
      grafica: "RTX 4060",
      ram: "16 GB",
      almacenamiento: "1 TB SSD",
    },
    reviews: [
      { user: "Miguel", rating: 4, comment: "Buen rendimiento general.", date: "2025-12-09" },
      { user: "Laura", rating: 5, comment: "Perfecto para gaming.", date: "2025-12-08" },
      { user: "Carlos", rating: 4, comment: "Rápido y silencioso.", date: "2025-12-07" },
      { user: "Ana", rating: 5, comment: "Muy buena compra.", date: "2025-12-06" },
      { user: "Jorge", rating: 4, comment: "Algo pesado, pero potente.", date: "2025-12-05" },
    ],
  },

  {
    id: 2,
    name: "Auriculares Bluetooth",
    price: 79.99,
    image: "/images/auriculares.jpg",
    category: "Accesorios",
    description: "Auriculares inalámbricos con cancelación de ruido.",
    descriptionC:
      "Auriculares Bluetooth con cancelación activa de ruido y batería de larga duración.",
    features: {
      conectividad: "Bluetooth 5.2",
      cancelacionRuido: "Activa",
      bateria: "30 horas",
      microfono: "Integrado",
      peso: "250 g",
    },
    reviews: [
      { user: "Miguel", rating: 4, comment: "Buena cancelación.", date: "2025-12-09" },
      { user: "Sara", rating: 5, comment: "Muy cómodos.", date: "2025-12-08" },
      { user: "Iván", rating: 3, comment: "Sonido correcto.", date: "2025-12-07" },
      { user: "Lucía", rating: 4, comment: "Buena batería.", date: "2025-12-06" },
      { user: "Pablo", rating: 5, comment: "Geniales por el precio.", date: "2025-12-05" },
    ],
  },

  {
    id: 3,
    name: "Teclado Mecánico",
    price: 129.99,
    image: "/images/teclado.jpg",
    category: "Accesorios",
    description: "Teclado mecánico preciso y duradero.",
    descriptionC:
      "Teclado mecánico con switches Cherry MX Red y retroiluminación RGB.",
    features: {
      tipo: "Mecánico",
      switches: "Cherry MX Red",
      iluminacion: "RGB",
      conexion: "USB",
      layout: "QWERTY ES",
    },
    reviews: [
      { user: "Ana", rating: 5, comment: "Ideal para programar.", date: "2025-12-08" },
      { user: "David", rating: 4, comment: "Muy buen tacto.", date: "2025-12-07" },
      { user: "Mario", rating: 5, comment: "Excelente calidad.", date: "2025-12-06" },
      { user: "Clara", rating: 4, comment: "Algo ruidoso.", date: "2025-12-05" },
      { user: "Luis", rating: 5, comment: "Me encanta.", date: "2025-12-04" },
    ],
  },

  {
    id: 4,
    name: 'Monitor 27"',
    price: 349.99,
    image: "/images/monitor.jpg",
    category: "Electrónica",
    description: "Monitor gaming de alta fluidez.",
    descriptionC:
      "Monitor IPS de 27 pulgadas con 144Hz y 1ms de respuesta.",
    features: {
      tamano: "27 pulgadas",
      resolucion: "2560x1440",
      panel: "IPS",
      refresco: "144 Hz",
      tiempoRespuesta: "1 ms",
    },
    reviews: [
      { user: "Pablo", rating: 5, comment: "Imagen brutal.", date: "2025-12-06" },
      { user: "Marta", rating: 4, comment: "Muy equilibrado.", date: "2025-12-07" },
      { user: "Raúl", rating: 5, comment: "Perfecto para gaming.", date: "2025-12-08" },
      { user: "Nuria", rating: 4, comment: "Buen panel.", date: "2025-12-09" },
      { user: "Sergio", rating: 5, comment: "Muy fluido.", date: "2025-12-10" },
    ],
  },

  {
    id: 5,
    name: "Ratón Gaming",
    price: 59.99,
    image: "/images/raton.jpg",
    category: "Accesorios",
    description: "Ratón preciso con iluminación RGB.",
    descriptionC:
      "Ratón ergonómico con sensor de alta precisión y botones programables.",
    features: {
      dpi: "16000",
      botones: "8 programables",
      iluminacion: "RGB",
      conexion: "USB",
      peso: "95 g",
    },
    reviews: [
      { user: "David", rating: 5, comment: "Muy preciso.", date: "2025-12-07" },
      { user: "Laura", rating: 4, comment: "Cómodo.", date: "2025-12-06" },
      { user: "Iván", rating: 4, comment: "Buen DPI.", date: "2025-12-05" },
      { user: "Sonia", rating: 5, comment: "Ideal para FPS.", date: "2025-12-04" },
      { user: "Carlos", rating: 4, comment: "Buen precio.", date: "2025-12-03" },
    ],
  },

  {
    id: 6,
    name: "Webcam 4K",
    price: 149.99,
    image: "/images/webcam.jpg",
    category: "Accesorios",
    description: "Webcam de alta resolución para streaming.",
    descriptionC:
      "Cámara web 4K con autoenfoque y micrófono integrado.",
    features: {
      resolucion: "4K",
      fps: "60 fps",
      enfoque: "Automático",
      microfono: "Integrado",
      conexion: "USB-C",
    },
    reviews: [
      { user: "Sergio", rating: 4, comment: "Muy buena imagen.", date: "2025-12-06" },
      { user: "Elena", rating: 5, comment: "Perfecta para streaming.", date: "2025-12-08" },
      { user: "Raúl", rating: 4, comment: "Buen enfoque.", date: "2025-12-09" },
      { user: "Lucía", rating: 5, comment: "Excelente calidad.", date: "2025-12-10" },
      { user: "Mario", rating: 4, comment: "Muy completa.", date: "2025-12-11" },
    ],
  },

  // productos simples también con reviews
  {
    id: 7,
    name: "Silla Ergonómica",
    price: 199.5,
    image: "/images/silla.png",
    description: "Soporte lumbar ajustable y malla transpirable.",
    reviews: [
      { user: "Ana", rating: 5, comment: "Muy cómoda.", date: "2025-12-09" },
      { user: "Luis", rating: 4, comment: "Buen soporte.", date: "2025-12-08" },
      { user: "Carmen", rating: 4, comment: "Recomendada.", date: "2025-12-07" },
      { user: "David", rating: 5, comment: "Mejoró mi postura.", date: "2025-12-06" },
      { user: "Raúl", rating: 4, comment: "Buena calidad.", date: "2025-12-05" },
    ],
  },

  {
    id: 8,
    name: "Micrófono de Condensador",
    price: 110.0,
    image: "/images/microfono.png",
    category: "Accesorios",
    description: "Ideal para streaming y podcasts.",
    reviews: [
      { user: "Sergio", rating: 5, comment: "Sonido limpio.", date: "2025-12-10" },
      { user: "Laura", rating: 4, comment: "Muy claro.", date: "2025-12-09" },
      { user: "Iván", rating: 4, comment: "Buen precio.", date: "2025-12-08" },
      { user: "Marta", rating: 5, comment: "Perfecto para podcast.", date: "2025-12-07" },
      { user: "Luis", rating: 4, comment: "Recomendado.", date: "2025-12-06" },
    ],
  },

  {
    id: 9,
    name: "Disco Duro Externo 2TB",
    price: 85.99,
    image: "/images/discoduro.png",
    category: "Almacenamiento",
    description: "USB 3.0 de alta velocidad.",
    reviews: [
      { user: "Carlos", rating: 5, comment: "Muy rápido.", date: "2025-12-09" },
      { user: "Ana", rating: 4, comment: "Compacto.", date: "2025-12-08" },
      { user: "Jorge", rating: 4, comment: "Buen rendimiento.", date: "2025-12-07" },
      { user: "Lucía", rating: 5, comment: "Mucho espacio.", date: "2025-12-06" },
      { user: "David", rating: 4, comment: "Cumple.", date: "2025-12-05" },
    ],
  },

  {
    id: 10,
    name: "Altavoces Inteligentes",
    price: 45.0,
    image: "/images/altavoces.png",
    category: "Electrónica",
    description: "Sonido envolvente y asistentes de voz.",
    reviews: [
      { user: "Pablo", rating: 4, comment: "Buen sonido.", date: "2025-12-09" },
      { user: "Laura", rating: 5, comment: "Muy prácticos.", date: "2025-12-08" },
      { user: "Iván", rating: 4, comment: "Funcionan bien.", date: "2025-12-07" },
      { user: "Marta", rating: 4, comment: "Recomendados.", date: "2025-12-06" },
      { user: "Sergio", rating: 5, comment: "Me encantan.", date: "2025-12-05" },
    ],
  },

  {
    id: 11,
    name: "Alfombrilla XL RGB",
    price: 24.95,
    image: "/images/alfombrilla.png",
    category: "Accesorios",
    description: "Superficie amplia con iluminación LED.",
    reviews: [
      { user: "Raúl", rating: 4, comment: "Muy grande.", date: "2025-12-09" },
      { user: "Ana", rating: 5, comment: "Bonita y funcional.", date: "2025-12-08" },
      { user: "Luis", rating: 4, comment: "Buen material.", date: "2025-12-07" },
      { user: "Carmen", rating: 4, comment: "RGB chulo.", date: "2025-12-06" },
      { user: "David", rating: 5, comment: "Me gusta mucho.", date: "2025-12-05" },
    ],
  },

  {
    id: 12,
    name: "Monitor 27",
    price: 265.0,
    image: "/images/monitor2.png",
    category: "Electrónica",
    description: "Monitor IPS 144Hz 1ms.",
    reviews: [
      { user: "Marta", rating: 5, comment: "Muy fluido.", date: "2025-12-09" },
      { user: "Pablo", rating: 4, comment: "Buen panel.", date: "2025-12-08" },
      { user: "Iván", rating: 4, comment: "Calidad precio.", date: "2025-12-07" },
      { user: "Sergio", rating: 5, comment: "Excelente.", date: "2025-12-06" },
      { user: "Lucía", rating: 4, comment: "Buen tamaño.", date: "2025-12-05" },
    ],
  },
];
