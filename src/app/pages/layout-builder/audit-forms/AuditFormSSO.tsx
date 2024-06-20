import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import autosize from 'autosize';


const initialData = [
  {
    grupo: "4",
    puntaje: 0,
    puntos: [
      {
        punto: "4.1",
        descripcion: "Compresión de la organización y de su contexto",
        detalle: "La organización debe determinar las cuestiones externas e internas que son pertinentes para su propósito y que afectan a su capacidad para lograr los resultados previstos de su sistema de gestión de la Seguridad y Salud en el Trabajo (SST).",
        subpuntos: [],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "4.2",
        descripcion: "Comprensión de las necesidades y expectativas",
        subpuntos: [
          { subpunto: "a", detalle: "Las otras partes interesadas, además de sus trabajadores, que son pertinentes al sistema de gestión de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Las necesidades y expectativas (es decir, los requisitos) pertinentes de los trabajadores y de estas otras partes interesadas.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Cuáles de estas necesidades y expectativas se convierten en requisitos legales aplicables y otros requisitos.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "4.3",
        descripcion: "Determinación del alcance del sistema de gestión",
        subpuntos: [
          { subpunto: "a", detalle: "Considerar las cuestiones externas e internas indicadas en el apartado 4.1.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Tener en cuenta los requisitos indicados en el apartado 4.2.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Tener en cuenta las actividades relacionadas con los trabajos desempeñados.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "El sistema de gestión de la SST debe incluir actividades, productos y servicios dentro del control o la influencia de la organización.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "El alcance debe estar disponible como información documentada.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "4.4",
        descripcion: "Sistema de gestión de la SST",
        subpuntos: [],
        puntaje: 0, hallazgo: ""
      }
    ]
  },
  {
    grupo: "5",
    puntaje: 0,
    puntos: [
      {
        punto: "5.1",
        descripcion: "Liderazgo y compromiso",
        subpuntos: [
          { subpunto: "a", detalle: "La alta dirección debe demostrar liderazgo y compromiso con respecto al sistema de gestión de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Asegurarse de que se establezcan la política de la SST y los objetivos de la SST y que éstos sean compatibles con la dirección estratégica de la organización.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Asegurarse de la integración de los procesos y requisitos del sistema de gestión de la SST en los procesos de negocio de la organización.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Asegurarse de que los recursos necesarios para establecer, implementar, mantener y mejorar el sistema de gestión de la SST estén disponibles.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Asegurarse de la participación activa de los trabajadores, y cuando existan, de los representantes de los trabajadores.", puntaje: 0, hallazgo: "" },
          { subpunto: "f", detalle: "Comunicar la importancia de una gestión de la SST eficaz y conforme con los requisitos del sistema de gestión de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "g", detalle: "Asegurarse de que el sistema de gestión de la SST logre los resultados previstos.", puntaje: 0, hallazgo: "" },
          { subpunto: "h", detalle: "Dirigir y apoyar a las personas, para contribuir a la eficacia del sistema de gestión de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "i", detalle: "Asegurar y promover la mejora continua del sistema de gestión de la SST para mejorar el desempeño de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "j", detalle: "Apoyar otros roles pertinentes de la dirección, para demostrar su liderazgo aplicado a sus áreas de responsabilidad.", puntaje: 0, hallazgo: "" },
          { subpunto: "k", detalle: "Desarrollar, liderar y promover una cultura en la organización que apoye al sistema de gestión de la SST.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "5.2",
        descripcion: "Política de la SST",
        subpuntos: [
          { subpunto: "a", detalle: "Incluir un compromiso de proporcionar condiciones de trabajo seguras y saludables para la prevención de daños y deterioro de la salud relacionados con el trabajo.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Proporcionar un marco de referencia para el establecimiento de los objetivos de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Incluir un compromiso de cumplir los requisitos legales aplicables y otros requisitos.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Incluir un compromiso para el control de los riesgos para la SST utilizando las prioridades de los controles.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Incluir un compromiso de mejora continua del sistema de gestión de la SST para mejorar el desempeño de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "f", detalle: "Incluir un compromiso para la participación de los trabajadores en los procesos de toma de decisiones en el sistema de gestión de la SST.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "5.3",
        descripcion: "Roles, responsabilidades, rendición de cuentas y autoridades en la organización",
        subpuntos: [
          { subpunto: "a", detalle: "Asegurarse de que el sistema de gestión de la SST es conforme con los requisitos de esta Norma Internacional.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Informar a la alta dirección sobre el desempeño del sistema de gestión de la SST.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "5.4",
        descripcion: "Participación y consulta",
        subpuntos: [
          { subpunto: "a", detalle: "Proporcionar los mecanismos, el tiempo, la formación y los recursos necesarios para la participación.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Proporcionar el acceso oportuno a información clara, comprensible y pertinente sobre el sistema de gestión de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Identificar y eliminar los obstáculos o barreras a la participación y minimizar aquellas que no puedan eliminarse.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Proporcionar un énfasis adicional a la participación de los trabajadores no directivos en diversas actividades.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Proporcionar un énfasis adicional a la inclusión de trabajadores no directivos en la consulta relacionada con diversas actividades.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      }
    ]
  },
  {
    grupo: "6",
    puntaje: 0,
    puntos: [
      {
        punto: "6.1",
        descripcion: "Acciones para abordar riesgos y oportunidades",
        subpuntos: [
          { subpunto: "a", detalle: "Asegurar que el sistema de gestión de la SST puede lograr sus resultados previstos.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Prevenir o reducir efectos no deseados.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Lograr la mejora continua.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      // Continuación del código

      {
        punto: "6.2",
        descripcion: "Identificación de peligros y evaluación de los riesgos para la SST",
        subpuntos: [
          { subpunto: "a", detalle: "Identificación proactiva continua de los peligros.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Evaluación de los riesgos para la SST a partir de los peligros identificados.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Identificación y evaluación de los riesgos relacionados con el establecimiento, implementación, operación y mantenimiento del sistema de gestión de la SST.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "6.3",
        descripcion: "Determinación de los requisitos legales aplicables y otros requisitos",
        subpuntos: [
          { subpunto: "a", detalle: "Determinar y tener acceso a los requisitos legales actualizados y otros requisitos aplicables a sus peligros y riesgos para la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Determinar cómo aplican esos requisitos legales y otros requisitos a la organización y qué es necesario comunicar.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Tener en cuenta estos requisitos legales y otros requisitos al establecer, implementar, mantener y mejorar de manera continua su sistema de gestión de la SST.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "6.4",
        descripcion: "Planificación de acciones",
        subpuntos: [
          { subpunto: "a", detalle: "Planificar acciones para abordar riesgos y oportunidades, requisitos legales aplicables y otros requisitos.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Determinar cómo integrar e implementar las acciones en sus procesos del sistema de gestión de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Evaluar la eficacia de estas acciones.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      }
    ]
  },
  {
    grupo: "7",
    puntaje: 0,
    puntos: [
      {
        punto: "7.1",
        descripcion: "Recursos",
        subpuntos: [],
        detalle: "La organización debe determinar y proporcionar los recursos necesarios para el establecimiento, implementación, mantenimiento y mejora continua del sistema de gestión de la SST.",
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "7.2",
        descripcion: "Competencia",
        subpuntos: [
          { subpunto: "a", detalle: "Determinar la competencia necesaria de los trabajadores que afectan o pueden afectar a su desempeño de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Asegurarse de que los trabajadores sean competentes, basándose en la educación, inducción, formación o experiencias apropiadas.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Tomar acciones para adquirir la competencia necesaria y evaluar la eficacia de las acciones tomadas.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Conservar la información documentada apropiada, como evidencia de la competencia.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "7.3",
        descripcion: "Toma de conciencia",
        subpuntos: [
          { subpunto: "a", detalle: "La política de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Su contribución a la eficacia del sistema de gestión de la SST, incluidos los beneficios de una mejora del desempeño de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Las implicaciones de no cumplir los requisitos del sistema de gestión de la SST, incluyendo las consecuencias reales o potenciales, de sus actividades de trabajo.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "La información y el resultado de la investigación de los incidentes pertinentes.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Los peligros y riesgos para la SST que sean pertinentes para ellos.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "7.4",
        descripcion: "Información y comunicación",
        subpuntos: [
          { subpunto: "a", detalle: "Determinar la información y las comunicaciones internas y externas pertinentes al sistema de gestión de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Definir los objetivos a lograr mediante la información y la comunicación, y evaluar si esos objetivos se han alcanzado.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Asegurarse de que se consideran las opiniones de partes interesadas externas pertinentes sobre temas pertinentes al sistema de gestión de la SST.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      // Continuación del código

      {
        punto: "7.5",
        descripcion: "Información documentada",
        subpuntos: [
          {
            subpunto: "7.5.1",
            detalle: "Generalidades",
            subsubpuntos: [
              { subsubpunto: "a", detalle: "La información documentada requerida por esta Norma Internacional.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "b", detalle: "La información documentada que la organización determina como necesaria para la eficacia del sistema de gestión de la SST.", puntaje: 0, hallazgo: "" }
            ],
            puntaje: 0, hallazgo: ""
          },
          {
            subpunto: "7.5.2",
            detalle: "Creación y actualización",
            subsubpuntos: [
              { subsubpunto: "a", detalle: "La identificación y descripción (por ejemplo, título, fecha, autor o número de referencia).", puntaje: 0, hallazgo: "" },
              { subsubpunto: "b", detalle: "El formato (por ejemplo, idioma, versión del software, gráficos) y los medios de soporte (por ejemplo, papel, electrónico).", puntaje: 0, hallazgo: "" },
              { subsubpunto: "c", detalle: "La revisión y aprobación con respecto a la conveniencia y adecuación.", puntaje: 0, hallazgo: "" }
            ],
            puntaje: 0, hallazgo: ""
          },
          {
            subpunto: "7.5.3",
            detalle: "Control de la información documentada",
            subsubpuntos: [
              { subsubpunto: "a", detalle: "Estar disponible y ser idónea para su uso, dónde y cuándo se necesite.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "b", detalle: "Estar protegida adecuadamente (por ejemplo, contra pérdida de confidencialidad, uso inadecuado, o pérdida de integridad).", puntaje: 0, hallazgo: "" },
              { subsubpunto: "c", detalle: "Distribución, acceso, recuperación y uso.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "d", detalle: "Almacenamiento y preservación, incluida la preservación de la legibilidad.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "e", detalle: "Control de cambios (por ejemplo, control de versión).", puntaje: 0, hallazgo: "" },
              { subsubpunto: "f", detalle: "Conservación y disposición.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "g", detalle: "Acceso por parte de los trabajadores, y cuando existan, de los representantes de los trabajadores, a la información documentada pertinente.", puntaje: 0, hallazgo: "" }
            ],
            puntaje: 0, hallazgo: ""
          }
        ],
        puntaje: 0, hallazgo: ""
      }
    ]
  },
  {
    grupo: "8",
    puntaje: 0,
    puntos: [
      {
        punto: "8.1",
        descripcion: "Planificación y control operacional",
        subpuntos: [
          { subpunto: "a", detalle: "Establecimiento de criterios para los procesos.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Implementación del control de los procesos de acuerdo con los criterios.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Almacenaje de información documentada en la medida necesaria para confiar en que los procesos se han llevado a cabo según lo planificado.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Determinación de las situaciones en las que la ausencia de información documentada podría llevar a desviaciones de la política de la SST y de los objetivos de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Adaptación del trabajo a los trabajadores.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "8.2",
        descripcion: "Gestión del Cambio",
        subpuntos: [
          { subpunto: "a", detalle: "Nuevos productos, procesos o servicios.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Cambios en los procesos de trabajo, los procedimientos, los equipos o en la estructura de la organización.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Cambios en los requisitos legales aplicables y otros requisitos.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Cambios en los conocimientos o la información sobre peligros y riesgos para la SST relacionados.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Desarrollos en conocimiento y tecnología.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "8.3",
        descripcion: "Contratación externa",
        subpuntos: [],
        detalle: "La organización debe asegurarse de que los procesos contratados externamente que afecten al sistema de gestión de la SST estén controlados. El tipo y el grado de control a aplicar a estos procesos deben definirse dentro del sistema de gestión de la SST.",
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "8.4",
        descripcion: "Compras",
        subpuntos: [],
        detalle: "La organización debe establecer controles para asegurarse de que la compra de bienes (por ejemplo, productos, materiales o sustancias peligrosas, materias primas, equipos) y servicios es conforme con los requisitos de sus sistema de gestión de la SST.",
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "8.5",
        descripcion: "Contratistas",
        subpuntos: [
          { subpunto: "a", detalle: "Las actividades y operaciones de los contratistas para los trabajadores de la organización.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Las actividades y operaciones de la organización para los trabajadores de los contratistas.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Las actividades y operaciones de los contratistas para otras partes interesadas en el lugar de trabajo.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Las actividades y operaciones de los contratistas para los trabajadores de los contratistas.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "8.6",
        descripcion: "Preparación y respuesta ante emergencias",
        subpuntos: [
          { subpunto: "a", detalle: "El establecimiento de una respuesta planificada a las situaciones de emergencia y a la inclusión de los primeros auxilios.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Las pruebas periódicas y el ejercicio de la capacidad de respuesta ante emergencias.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "La evaluación y, cuando sea necesario, la revisión de los procesos y procedimientos de preparación ante emergencias, incluso después de las pruebas y en particular después de que ocurran situaciones de emergencia.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "La comunicación y provisión de la información pertinente a todos los trabajadores y a todos los niveles de la organización sobre sus deberes y responsabilidades.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "La provisión de formación para la prevención de emergencias, primeros auxilios, preparación y respuesta.", puntaje: 0, hallazgo: "" },
          { subpunto: "f", detalle: "La comunicación de la información pertinente a los contratistas, visitantes, servicios de respuesta ante emergencias, autoridades gubernamentales, y, cuando sea apropiado, a la comunidad local.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      }
    ]
  },
  {
    grupo: "9",
    puntaje: 0,
    puntos: [
      {
        punto: "9.1",
        descripcion: "Seguimiento, medición, análisis y evaluación",
        subpuntos: [
          { subpunto: "a", detalle: "Determinar a qué es necesario hacer seguimiento y qué es necesario medir, incluyendo: requisitos legales aplicables y otros requisitos; actividades y operaciones relacionadas con los peligros identificados y con los riesgos para la SST; los riesgos y las oportunidades para la SST; controles operacionales; los objetivos de la SST de la organización.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Criterios frente a los que la organización evaluará su desempeño de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Métodos de seguimiento, medición, análisis y evaluación, según sea aplicable, para asegurar resultados válidos.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Cuándo se debe realizar el seguimiento y la medición.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Cuándo se deben analizar, evaluar y comunicar los resultados del seguimiento y la medición.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      // Continuación del código

      {
        punto: "9.1.2",
        descripcion: "Evaluación del cumplimiento",
        subpuntos: [
          { subpunto: "a", detalle: "Determinar la frecuencia y los métodos mediante los que se evaluará el cumplimiento.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Evaluar el cumplimiento.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Tomar acciones si es necesario de acuerdo con el apartado 10.1.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Mantener el conocimiento y comprender su estado de cumplimiento con los requisitos legales y otros requisitos.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Mantener la información documentada de los resultados de la evaluación del cumplimiento.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "9.2",
        descripcion: "Auditoria interna",
        subpuntos: [
          {
            subpunto: "9.2.1",
            detalle: "Objetivos de la auditoria interna",
            subsubpuntos: [
              { subsubpunto: "a", detalle: "Es conforme con:", puntaje: 0, hallazgo: "" },
              { subsubpunto: "1", detalle: "Los requisitos propios de la organización para su sistema de gestión de la SST y los objetivos de la SST.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "2", detalle: "Los requisitos de esta Norma Internacional.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "b", detalle: "Se implementa y mantiene eficazmente.", puntaje: 0, hallazgo: "" }
            ],
            puntaje: 0, hallazgo: ""
          },
          {
            subpunto: "9.2.2",
            detalle: "Proceso de auditoria interna",
            subsubpuntos: [
              { subsubpunto: "a", detalle: "Planificar, establecer, implementar y mantener uno o varios programas de auditoría que incluyan la frecuencia, los métodos, las responsabilidades, la consulta, los requisitos de planificación, y la elaboración de informes, que deben tener en consideración la importancia de los procesos involucrados y los resultados de las auditorías previas.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "1", detalle: "Los cambios significativos que tienen un impacto en la organización.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "2", detalle: "La evaluación del desempeño y los resultados de la mejora.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "3", detalle: "Los riesgos para la SST significativos, los riesgos y las oportunidades para la SST.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "b", detalle: "Definir los criterios de la auditoria y el alcance para cada auditoría.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "c", detalle: "Seleccionar auditores competentes y llevar a cabo auditorías para asegurarse de la objetividad y la imparcialidad del proceso de auditoría.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "d", detalle: "Asegurarse de que los resultados de las auditorías se informen a la dirección pertinentes.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "e", detalle: "Asegurarse de que se informe de los hallazgos de la auditoría pertinentes a los trabajadores pertinentes, y cuando existan, a los representantes de los trabajadores, y a las partes interesadas pertinentes.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "f", detalle: "Tomar las acciones apropiadas para tratar las no conformidades (véase 10.1) y mejorar de manera continua su desempeño de la SST (véase 10.2).", puntaje: 0, hallazgo: "" },
              { subsubpunto: "g", detalle: "Conservar información documentada como evidencia de la implementación del programa de auditoría y de los resultados de las auditorías.", puntaje: 0, hallazgo: "" }
            ],
            puntaje: 0, hallazgo: ""
          }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        punto: "9.3",
        descripcion: "Revisión por la dirección",
        subpuntos: [
          { subpunto: "a", detalle: "El estado de las acciones de las revisiones por la dirección previas.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Los cambios en las cuestiones externas e internas que sean pertinentes al sistema de gestión de la SST, incluyendo:", puntaje: 0, hallazgo: "" },
          { subpunto: "1", detalle: "Requisitos legales aplicables y otros requisitos.", puntaje: 0, hallazgo: "" },
          { subpunto: "2", detalle: "Los riesgos para la SST, los riesgos y las oportunidades para la SST de la organización.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "El grado de cumplimiento de la política de la SST y los objetivos de la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "La información sobre el desempeño de la SST, incluidas las tendencias relativas a:", puntaje: 0, hallazgo: "" },
          { subpunto: "1", detalle: "Incidentes, no conformidades, acciones correctivas y mejora continua.", puntaje: 0, hallazgo: "" },
          { subpunto: "2", detalle: "Participación de los trabajadores y los resultados de la consulta.", puntaje: 0, hallazgo: "" },
          { subpunto: "3", detalle: "Seguimiento y resultados de las mediciones.", puntaje: 0, hallazgo: "" },
          { subpunto: "4", detalle: "Resultados de la auditoría.", puntaje: 0, hallazgo: "" },
          { subpunto: "5", detalle: "Resultados de la evaluación del cumplimiento.", puntaje: 0, hallazgo: "" },
          { subpunto: "6", detalle: "Riesgos para la SST, riesgos y oportunidades para la SST.", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Las comunicaciones pertinentes con las partes interesadas.", puntaje: 0, hallazgo: "" },
          { subpunto: "f", detalle: "Las oportunidades de mejora continua.", puntaje: 0, hallazgo: "" },
          { subpunto: "g", detalle: "La adecuación de los recursos para mantener un sistema de gestión de la SST eficaz.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      }
    ]
  },
  {
    grupo: "10",
    puntaje: 0,
    puntos: [
      {
        punto: "10.1",
        descripcion: "Incidentes, no conformidades y acciones correctivas",
        subpuntos: [
          { subpunto: "a", detalle: "Reaccionar de manera oportuna ante el incidente o la no conformidad, y según sea aplicable:", puntaje: 0, hallazgo: "" },
          { subpunto: "1", detalle: "Tomar acciones directas para controlarla y corregirla.", puntaje: 0, hallazgo: "" },
          { subpunto: "2", detalle: "Hacer frente a las consecuencias.", puntaje: 0, hallazgo: "" },
          { subpunto: "b", detalle: "Evaluar, con la participación de los trabajadores (véase 5.4) y la implicación de otras partes interesadas pertinentes, la necesidad de acciones correctivas para eliminar las causas raíz del incidente o la no conformidad, con el fin de que no vuelva a ocurrir ni ocurra en otra parte, mediante:", puntaje: 0, hallazgo: "" },
          { subpunto: "1", detalle: "La revisión del incidente o la no conformidad.", puntaje: 0, hallazgo: "" },
          { subpunto: "2", detalle: "La determinación de las causas del incidente o la no conformidad.", puntaje: 0, hallazgo: "" },
          { subpunto: "3", detalle: "La determinación de si existen incidentes, no conformidades, similares, o que potencialmente podrían ocurrir.", puntaje: 0, hallazgo: "" },
          { subpunto: "c", detalle: "Revisar la evaluación de los riesgos para la SST y los riesgos, cuando sea apropiado (véase 6.1).", puntaje: 0, hallazgo: "" },
          { subpunto: "d", detalle: "Determinar e implementar cualquier acción necesaria, incluyendo acciones correctivas, de acuerdo con la jerarquía de los controles (véase 8.1.2) y la gestión del cambio (véase 8.2).", puntaje: 0, hallazgo: "" },
          { subpunto: "e", detalle: "Revisar la eficacia de cualquier acción correctiva tomada.", puntaje: 0, hallazgo: "" },
          { subpunto: "f", detalle: "Si es necesario, hacer cambios al sistema de gestión de la SST.", puntaje: 0, hallazgo: "" }
        ],
        puntaje: 0, hallazgo: ""
      },
      {
        // Continuación del código

        punto: "10.2",
        descripcion: "Mejora continua",
        subpuntos: [
          {
            subpunto: "10.2.1",
            detalle: "Objetivos de la mejora continua",
            subsubpuntos: [
              { subsubpunto: "a", detalle: "Evitar la ocurrencia de incidentes y no conformidades.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "b", detalle: "Promocionar una cultura positiva de la seguridad y salud en el trabajo.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "c", detalle: "Mejorar el desempeño de la SST.", puntaje: 0, hallazgo: "" }
            ],
            puntaje: 0, hallazgo: ""
          },
          {
            subpunto: "10.2.2",
            detalle: "Proceso de Mejora Continua",
            subsubpuntos: [
              { subsubpunto: "a", detalle: "La organización debe planificar, establecer, implementar y mantener uno o varios procesos de mejora continua, que tengan en cuenta las salidas de las actividades descritas en esta Norma Internacional.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "b", detalle: "La organización debe comunicar los resultados de la mejora continua a sus trabajadores pertinentes, y cuando existan, a los representantes de los trabajadores.", puntaje: 0, hallazgo: "" },
              { subsubpunto: "c", detalle: "La organización debe conservar información documentada como evidencia de los resultados de la mejora continua.", puntaje: 0, hallazgo: "" }
            ],
            puntaje: 0, hallazgo: ""
          }
        ],
        puntaje: 0, hallazgo: ""
      }
    ]
  }
];
const AuditFormSSO: React.FC = () => {
  const [data, setData] = useState(initialData);

  const generatePDF = () => {
    const doc = new jsPDF();
  
    const tableBody = [];
  
    data.forEach((grupo) => {
      // Agregar fila para el nombre del grupo
      tableBody.push([{ content: `Grupo: ${grupo.grupo}`, colSpan: 5, styles: { halign: 'left', fillColor: [22, 160, 133] } }]);
  
      // Agregar puntos y subpuntos
      grupo.puntos.forEach((punto) => {
        tableBody.push([
          punto.punto,
          punto.descripcion,
          punto.detalle,
          punto.puntaje.toString(),
          punto.hallazgo
        ]);
  
        punto.subpuntos.forEach((subpunto) => {
          tableBody.push([
            `${punto.punto}.${subpunto.subpunto}`,
            '',
            subpunto.detalle,
            subpunto.puntaje.toString(),
            subpunto.hallazgo
          ]);
        });
      });
  
      // Agregar fila para el puntaje total del grupo
      const totalPuntaje = grupo.puntos.reduce((sum, punto) => {
        return sum + punto.puntaje + punto.subpuntos.reduce((subSum, subpunto) => subSum + subpunto.puntaje, 0);
      }, 0);
      tableBody.push([{ content: `Puntaje total del grupo: ${totalPuntaje}`, colSpan: 5, styles: { halign: 'right', fillColor: [149, 165, 166] } }]);
    });
  
    (doc as any).autoTable({
      head: [['Punto', 'Descripción', 'Detalle', 'Puntaje', 'Hallazgo']],
      body: tableBody,
      theme: 'striped'
    });
  
    doc.save('formulario.pdf');
  };
  

  const handlePuntajeChange = (grupoIndex: number, puntoIndex: number, subpuntoIndex: number | null, value: number) => {
    const newData = [...data];
    if (subpuntoIndex === null) {
      newData[grupoIndex].puntos[puntoIndex].puntaje = value;
    } else {
      newData[grupoIndex].puntos[puntoIndex].subpuntos[subpuntoIndex].puntaje = value;
    }
    setData(newData);
  };

  const handleHallazgoChange = (grupoIndex: number, puntoIndex: number, subpuntoIndex: number | null, value: string) => {
    const newData = [...data];
    if (subpuntoIndex === null) {
      newData[grupoIndex].puntos[puntoIndex].hallazgo = value;
    } else {
      newData[grupoIndex].puntos[puntoIndex].subpuntos[subpuntoIndex].hallazgo = value;
    }
    setData(newData);
  };

  const handleFillData = () => {
    const filledData = data.map(grupo => ({
      ...grupo,
      puntos: grupo.puntos.map(punto => ({
        ...punto,
        puntaje: 3,
        hallazgo: "Hallazgo ficticio",
        subpuntos: punto.subpuntos.map(subpunto => ({
          ...subpunto,
          puntaje: 2,
          hallazgo: "Sub-hallazgo ficticio"
        }))
      }))
    }));
    setData(filledData);
  };

  const handleSubmit = () => {
    const resultado = data.map(grupo => {
      const puntos = grupo.puntos.map(punto => {
        const subpuntos = punto.subpuntos.map(subpunto => ({
          subpunto: subpunto.subpunto,
          puntaje: subpunto.puntaje,
          hallazgo: subpunto.hallazgo
        }));
        return {
          punto: punto.punto,
          puntaje: punto.puntaje,
          hallazgo: punto.hallazgo,
          subpuntos: subpuntos
        };
      });
      return {
        grupo: grupo.grupo,
        puntos: puntos
      };
    });
  
    console.log(JSON.stringify(resultado, null, 2));
  };
  


  const getTotalPuntaje = (grupoIndex: number) => {
    return data[grupoIndex].puntos.reduce((total, punto) => {
      let puntoTotal = punto.puntaje;
      puntoTotal += punto.subpuntos.reduce((subTotal, subpunto) => subTotal + subpunto.puntaje, 0);
      return total + puntoTotal;
    }, 0);
  };
  

  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Grupo</th>
            <th>Punto</th>
            <th>Descripción</th>
            <th>Detalle</th>
            <th>Puntaje</th>
            <th>Hallazgo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((grupo, grupoIndex) => (
            <React.Fragment key={grupo.grupo}>
              {grupo.puntos.map((punto, puntoIndex) => (
                <React.Fragment key={punto.punto}>
                  <tr className="table-primary">
                    <td>{grupoIndex === 0 ? grupo.grupo : ''}</td>
                    <td>{punto.punto}</td>
                    <td>{punto.descripcion}</td>
                    <td>{punto.detalle}</td>
                    <td>
                      {punto.subpuntos.length === 0 && (
                        <input
                          className="form-control"
                          type="number"
                          value={punto.puntaje}
                          min="0"
                          max="4"
                          onChange={(e) =>
                            handlePuntajeChange(grupoIndex, puntoIndex, null, parseInt(e.target.value))
                          }
                        />
                      )}
                    </td>
                    <td>
                      {punto.subpuntos.length === 0 && (
                        <input
                          className="form-control"
                          type="text"
                          value={punto.hallazgo || ""}
                          onChange={(e) =>
                            handleHallazgoChange(grupoIndex, puntoIndex, null, e.target.value)
                          }
                        />
                      )}
                    </td>
                  </tr>
                  {punto.subpuntos.map((subpunto, subpuntoIndex) => (
                    <tr key={subpunto.subpunto}>
                      <td></td>
                      <td>{punto.punto}.{subpunto.subpunto}</td>
                      <td></td>
                      <td>{subpunto.detalle}</td>
                      <td>
                        <input
                          className="form-control"
                          type="number"
                          value={subpunto.puntaje}
                          min="0"
                          max="4"
                          onChange={(e) =>
                            handlePuntajeChange(grupoIndex, puntoIndex, subpuntoIndex, parseInt(e.target.value))
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          value={subpunto.hallazgo || ""}
                          onChange={(e) =>
                            handleHallazgoChange(grupoIndex, puntoIndex, subpuntoIndex, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              
              <tr >
              <td></td>
              <td></td>
                <td colSpan={4}  >Puntaje Total del Grupo {grupo.grupo}: {getTotalPuntaje(grupoIndex)} </td>
               
              
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        <button className="btn btn-primary" onClick={generatePDF}>Generar PDF</button>
        <button className="btn btn-primary" onClick={handleFillData}>Llenar con Datos Ficticios</button>
        <Link to="/dashboard">
          <button className="btn btn-primary">Regresar al Menú Principal</button>
        </Link>
      </div>
    </div>
  );
};

export default AuditFormSSO;