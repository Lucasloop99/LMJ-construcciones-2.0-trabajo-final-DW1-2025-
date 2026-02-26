// Tabla de precios base (USD por m²)
const PRECIOS = {
  vivienda: {
    tradicional: { estandar: 800, premium: 1300 },
    llavemano: { estandar: 1000, premium: 1600 },
  },
  comercial: {
    tradicional: { estandar: 900, premium: 1500 },
    llavemano: { estandar: 1100, premium: 1800 },
  },
};

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace("ó", "o")
    .replace("é", "e");
}

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-AR");
}

// Anima el cambio del precio con un efecto de conteo
function animarPrecio(elemento, valorFinal) {
  const duracion = 600;
  const inicio = Date.now();
  const valorInicio = 0;

  function paso() {
    const transcurrido = Date.now() - inicio;
    const progreso = Math.min(transcurrido / duracion, 1);
    // Easing ease-out
    const eased = 1 - Math.pow(1 - progreso, 3);
    const actual = Math.round(valorInicio + (valorFinal - valorInicio) * eased);
    elemento.textContent = formatearPrecio(actual);
    if (progreso < 1) requestAnimationFrame(paso);
  }

  requestAnimationFrame(paso);
}

// Calcula y muestra el presupuesto
function calcular() {
  const selects = document.querySelectorAll("form .form-select");
  const inputM2 = document.querySelector("form .form-control");
  const resultadoEl = document.querySelector(".estimate-result h2");
  const subtitleEl = document.querySelector(".estimate-result small");
  const wrapperResult = document.querySelector(".estimate-result");

  const tipoRaw = selects[0]?.value || "";
  const modalidadRaw = selects[1]?.value || "";
  const calidadRaw = selects[2]?.value || "";
  const m2 = parseFloat(inputM2?.value) || 0;

  const tipo = normalizar(tipoRaw);
  const modalidad = normalizar(modalidadRaw);
  const calidad = normalizar(calidadRaw);

  // Si algún campo sigue en placeholder, mostrar guión
  const camposInvalidos =
    tipo === "tipodeproyecto" ||
    modalidad === "modalidad" ||
    calidad === "calidad" ||
    m2 <= 0;

  if (camposInvalidos) {
    resultadoEl.textContent = "—";
    subtitleEl.textContent = "Completá todos los campos para ver tu estimación";
    wrapperResult.classList.remove("calculating");
    return;
  }

  const precios = PRECIOS[tipo]?.[modalidad]?.[calidad];

  if (!precios) {
    resultadoEl.textContent = "—";
    subtitleEl.textContent = "Combinación no disponible";
    return;
  }

  const minimo = precios * m2;
  const maximo = Math.round(minimo * 1.15); // +15% variación

  wrapperResult.classList.add("calculating");

  setTimeout(() => {
    wrapperResult.classList.remove("calculating");
    animarPrecio(resultadoEl, minimo);
    subtitleEl.textContent = `Rango estimado: ${formatearPrecio(
      minimo
    )} – ${formatearPrecio(maximo)} (variación ±15%)`;
  }, 200);
}

// Inicialización: escucha cambios en todos los inputs del form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return;

  form.querySelectorAll(".form-select, .form-control").forEach(function (el) {
    el.addEventListener("change", calcular);
    el.addEventListener("input", calcular);
  });

  calcular();

  document.querySelectorAll(".col-6.col-md-2 img").forEach(function (img) {
    img.addEventListener("mouseenter", function () {
      this.style.opacity = "1";
      this.style.filter = "grayscale(0%)";
    });
    img.addEventListener("mouseleave", function () {
      this.style.opacity = "0.75";
      this.style.filter = "grayscale(100%)";
    });
  });
});
