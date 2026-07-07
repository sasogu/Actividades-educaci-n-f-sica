document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  if (body.classList.contains('page-cuestionario')) {
    initCuestionario();
  }

  if (body.classList.contains('page-musculos')) {
    initMusculos();
  }
});

function initCuestionario() {
  const preguntas = [
    {
      pregunta: '¿Qué ayudan a sostener el cuerpo?',
      opciones: ['Los huesos', 'Las nubes', 'Los zapatos'],
      correcta: 0,
      imagen: 'images/esqueleto.jpg',
      alt: 'Imagen de un esqueleto'
    },
    {
      pregunta: '¿Qué nos ayudan a movernos?',
      opciones: ['Los músculos', 'Las puertas', 'Las estrellas'],
      correcta: 0,
      imagen: 'images/musculos-frente.jpg',
      alt: 'Ilustración del cuerpo humano con músculos'
    },
    {
      pregunta: '¿Cuál de estos es un hueso?',
      opciones: ['Brazo', 'Pierna', 'Fémur'],
      correcta: 2,
      imagen: 'images/huesos.jpg',
      alt: 'Imagen de un hueso'
    },
    {
      pregunta: '¿Dónde está el cráneo?',
      opciones: ['En la cabeza', 'En la mano', 'En el pie'],
      correcta: 0,
      imagen: 'images/nino.jpg',
      alt: 'Imagen del cuerpo de un niño'
    },
    {
      pregunta: '¿Qué músculos usamos cuando levantamos un objeto?',
      opciones: ['Los músculos del brazo', 'Las orejas', 'La lengua'],
      correcta: 0,
      imagen: 'images/levantando-vaso.jpg',
      alt: 'Persona levantando un objeto'
    },
    {
      pregunta: '¿Qué parte del cuerpo protege el cerebro?',
      opciones: ['La columna', 'El cráneo', 'La rodilla'],
      correcta: 1,
      imagen: 'images/cerebro.jpg',
      alt: 'Imagen de un cerebro'
    },
    {
      pregunta: '¿Qué hueso está en la espalda y nos ayuda a mantener el cuerpo recto?',
      opciones: ['La columna', 'El codo', 'El tobillo'],
      correcta: 0,
      imagen: 'images/esqueleto.jpg',
      alt: 'Imagen de un esqueleto'
    },
    {
      pregunta: '¿Qué músculo está en el brazo y nos ayuda a doblarlo?',
      opciones: ['El bíceps', 'El estómago', 'El ojo'],
      correcta: 0,
      imagen: 'images/levantando-vaso.jpg',
      alt: 'Imagen de alguien levantando un vaso'
    },
    {
      pregunta: '¿Qué huesos protegen los órganos del pecho?',
      opciones: ['Las costillas', 'Los dientes', 'Los dedos'],
      correcta: 0,
      imagen: 'images/esqueleto.jpg',
      alt: 'Imagen de un esqueleto'
    },
    {
      pregunta: '¿Qué pasa cuando movemos los músculos?',
      opciones: ['Nos movemos', 'Nos volvemos de piedra', 'Nos ponemos a dormir'],
      correcta: 0,
      imagen: 'images/nino.jpg',
      alt: 'Imagen de un niño'
    }
  ];

  const preguntaEl = document.getElementById('pregunta');
  const opcionesEl = document.getElementById('opciones');
  const feedbackEl = document.getElementById('feedback');
  const siguienteBtn = document.getElementById('siguiente');
  const quizEl = document.getElementById('quiz');
  const resultadoEl = document.getElementById('resultado');
  const mensajeResultadoEl = document.getElementById('mensajeResultado');
  const reiniciarBtn = document.getElementById('reiniciar');
  const imagenPreguntaEl = document.getElementById('imagenPregunta');

  let indiceActual = 0;
  let aciertos = 0;
  let respuestaSeleccionada = false;

  function mostrarPregunta() {
    feedbackEl.textContent = '';
    respuestaSeleccionada = false;
    opcionesEl.innerHTML = '';
    const pregunta = preguntas[indiceActual];
    preguntaEl.textContent = `${indiceActual + 1}. ${pregunta.pregunta}`;

    pregunta.opciones.forEach((opcion, index) => {
      const boton = document.createElement('button');
      boton.className = 'opcion';
      boton.type = 'button';
      boton.textContent = `${String.fromCharCode(97 + index)}) ${opcion}`;
      boton.addEventListener('click', () => comprobarRespuesta(index));
      opcionesEl.appendChild(boton);
    });

    imagenPreguntaEl.src = pregunta.imagen || 'images/nino.jpg';
    imagenPreguntaEl.alt = pregunta.alt || 'Imagen de referencia para la pregunta';
    siguienteBtn.disabled = true;
  }

  function comprobarRespuesta(index) {
    if (respuestaSeleccionada) return;
    respuestaSeleccionada = true;
    const correcta = preguntas[indiceActual].correcta;

    Array.from(opcionesEl.children).forEach((botonOpcion, i) => {
      botonOpcion.disabled = true;
      if (i === correcta) {
        botonOpcion.classList.add('correcta');
      } else if (i === index) {
        botonOpcion.classList.add('incorrecta');
      }
    });

    if (index === correcta) {
      aciertos += 1;
      feedbackEl.textContent = '¡Correcto! Muy bien.';
    } else {
      feedbackEl.textContent = `No es correcto. La respuesta correcta era: ${String.fromCharCode(97 + correcta)}). ${preguntas[indiceActual].opciones[correcta]}`;
    }

    siguienteBtn.disabled = false;
  }

  function siguientePregunta() {
    indiceActual += 1;
    if (indiceActual < preguntas.length) {
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  }

  function mostrarResultado() {
    quizEl.style.display = 'none';
    resultadoEl.style.display = 'block';
    const porcentaje = Math.round((aciertos / preguntas.length) * 100);
    let mensaje = '';

    if (porcentaje === 100) {
      mensaje = '¡Fantástico! Has acertado todas las preguntas.';
    } else if (porcentaje >= 70) {
      mensaje = '¡Muy bien! Has aprendido mucho sobre músculos y huesos.';
    } else {
      mensaje = '¡Sigue practicando! Puedes volver a intentarlo.';
    }

    mensajeResultadoEl.textContent = `Has acertado ${aciertos} de ${preguntas.length} preguntas (${porcentaje}%). ${mensaje}`;
    const imagenExistente = resultadoEl.querySelector('img');
    if (imagenExistente) {
      imagenExistente.remove();
    }

    const imagenResultado = document.createElement('img');
    imagenResultado.src = 'images/celebrando.jpg';
    imagenResultado.alt = 'Celebrando';
    imagenResultado.className = 'imagen';
    resultadoEl.appendChild(imagenResultado);
  }

  function reiniciarQuiz() {
    indiceActual = 0;
    aciertos = 0;
    quizEl.style.display = 'block';
    resultadoEl.style.display = 'none';
    mostrarPregunta();
  }

  siguienteBtn.addEventListener('click', siguientePregunta);
  reiniciarBtn.addEventListener('click', reiniciarQuiz);

  mostrarPregunta();
}

function initMusculos() {
  const feedback = document.getElementById('feedback');
  const resetBtn = document.getElementById('resetBtn');
  const zonas = Array.from(document.querySelectorAll('.zona'));

  document.querySelectorAll('.musculo').forEach((musculo) => {
    musculo.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', musculo.dataset.musculo);
    });
  });

  zonas.forEach((zona) => {
    zona.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    zona.addEventListener('drop', (e) => {
      e.preventDefault();
      const nombre = e.dataTransfer.getData('text/plain');

      if (nombre === zona.dataset.musculo) {
        const elemento = document.querySelector(`.musculo[data-musculo="${nombre}"]`);
        if (elemento) {
          elemento.classList.add('oculto');
          zona.classList.add('completada');
          zona.innerHTML = `<span class="nombre">${nombre}</span>`;
          feedback.textContent = `¡Correcto! ${nombre} va en su sitio.`;
        }
      } else {
        feedback.textContent = 'Prueba otra vez. Ese músculo no va ahí.';
      }
    });
  });

  resetBtn.addEventListener('click', () => {
    document.querySelectorAll('.musculo').forEach((musculo) => {
      musculo.classList.remove('oculto');
    });

    zonas.forEach((zona) => {
      zona.classList.remove('completada');
      zona.innerHTML = '';
    });

    feedback.textContent = 'Arrastra un músculo y suéltalo en su lugar.';
  });
}
