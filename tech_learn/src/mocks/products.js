export const mockProducts = [
  {
    id: 1,
    name: "Portátil Gaming",
    price: 899.99,
    image: "/images/portatil.jpg",
    category: "Electrónica",
    description: "Portátil de alto rendimiento para juegos y tareas exigentes.",

    descriptionC:
      " Portátil gaming equipado con GPU dedicada RTX 4060, procesador de última generación, pantalla de alta tasa de refresco y sistema de refrigeración avanzado. Diseñado para gaming competitivo, edición de vídeo y desarrollo.",

    features: {
      sistemaOperativo: "Windows 11",
      procesador: "Intel Core i7",
      grafica: "RTX 4060",
      ram: "16 GB",
      almacenamiento: "1 TB SSD",
    },

    reviews: [
      {
        user: "Miguel",
        rating: 4,
        comment: "Buena cancelación de ruido.",
        date: "2025-12-09",
      },
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
      "Auriculares Bluetooth con cancelación activa de ruido, batería de larga duración, micrófonos integrados para llamadas y sonido equilibrado para música y gaming casual.",

    features: {
      conectividad: "Bluetooth 5.2",
      cancelacionRuido: "Activa",
      bateria: "30 horas",
      microfono: "Integrado",
      peso: "250 g",
    },

    reviews: [
      {
        user: "Miguel",
        rating: 4,
        comment: "Buena cancelación de ruido.",
        date: "2025-12-09",
      },
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
      "Teclado mecánico con switches Cherry MX Red, respuesta rápida, retroiluminación LED y construcción robusta. Ideal para escritura intensiva y juegos competitivos.",

    features: {
      tipo: "Mecánico",
      switches: "Cherry MX Red",
      iluminacion: "RGB",
      conexion: "USB",
      layout: "QWERTY ES",
    },

    reviews: [
      {
        user: "Ana",
        rating: 5,
        comment: "Muy cómodo para programar.",
        date: "2025-12-08",
      },
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
      "Monitor de 27 pulgadas con panel IPS, resolución alta, tasa de refresco de 144Hz y tiempo de respuesta de 1ms. Adecuado para gaming, diseño y trabajo multitarea.",

    features: {
      tamano: "27 pulgadas",
      resolucion: "2560x1440",
      panel: "IPS",
      refresco: "144 Hz",
      tiempoRespuesta: "1 ms",
    },

    reviews: [
      {
        user: "Pablo",
        rating: 5,
        comment: "Muy buena calidad de imagen y colores.",
        date: "2025-12-06",
      },
      {
        user: "Marta",
        rating: 4,
        comment: "Perfecto para trabajar y jugar.",
        date: "2025-12-07",
      },
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
      "Ratón gaming ergonómico con sensor de hasta 16000 DPI, iluminación RGB configurable, botones programables y alta precisión para juegos FPS y MOBA.",

    features: {
      dpi: "16000",
      botones: "8 programables",
      iluminacion: "RGB",
      conexion: "USB",
      peso: "95 g",
    },

    reviews: [
      {
        user: "David",
        rating: 5,
        comment: "Imagen espectacular y muy fluido.",
        date: "2025-12-07",
      },
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
      "Cámara web 4K con autoenfoque rápido, micrófono integrado con reducción de ruido y calidad profesional para videollamadas, clases online y streaming.",

    features: {
      resolucion: "4K",
      fps: "60 fps",
      enfoque: "Automático",
      microfono: "Integrado",
      conexion: "USB-C",
    },

    reviews: [
      {
        user: "Sergio",
        rating: 4,
        comment: "Muy buena calidad de imagen.",
        date: "2025-12-06",
      },
      {
        user: "Elena",
        rating: 5,
        comment: "Ideal para streaming y reuniones.",
        date: "2025-12-08",
      },
      {
        user: "Raúl",
        rating: 4,
        comment: "Autoenfoque rápido y buen sonido.",
        date: "2025-12-09",
      },
      {
        user: "Lucía",
        rating: 5,
        comment: "Se ve genial incluso con poca luz.",
        date: "2025-12-10",
      },
    ],
  },
];
