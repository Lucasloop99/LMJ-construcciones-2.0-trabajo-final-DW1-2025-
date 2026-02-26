document.addEventListener("DOMContentLoaded", function () {
  // ── Referencias
  const form = document.querySelector(".contact-card form");
  const btnEnviar = form?.querySelector(".btn-warning");

  // ── Crear Toast
  const toast = document.createElement("div");
  toast.className = "toast-confirm";
  toast.innerHTML = `<i class="bi bi-check-circle-fill"></i> <span>¡Mensaje enviado! Nos contactaremos pronto.</span>`;
  document.body.appendChild(toast);

  function mostrarToast() {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }

  // ── Validación de campos
  function validarCampo(input) {
    const valor = input.value.trim();
    let valido = true;

    // Limpiar estado anterior
    input.classList.remove("is-invalid", "is-valid");

    if (!valor) {
      valido = false;
    } else if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      valido = emailRegex.test(valor);
    } else if (input.tagName === "TEXTAREA") {
      valido = valor.length >= 10;
    }

    input.classList.add(valido ? "is-valid" : "is-invalid");
    return valido;
  }

  // Mensajes de error por campo (feedback de Bootstrap)
  function agregarFeedback(input, mensaje) {
    if (!input.nextElementSibling?.classList.contains("invalid-feedback")) {
      const div = document.createElement("div");
      div.className = "invalid-feedback";
      div.textContent = mensaje;
      input.insertAdjacentElement("afterend", div);
    }
  }

  //Validación en tiempo real al salir del campo
  if (form) {
    const campos = form.querySelectorAll(".form-control");

    campos.forEach(function (campo) {
      if (campo.type === "email") {
        agregarFeedback(campo, "Ingresá un correo electrónico válido.");
      } else if (campo.tagName === "TEXTAREA") {
        agregarFeedback(campo, "El mensaje debe tener al menos 10 caracteres.");
      } else {
        agregarFeedback(campo, "Este campo es obligatorio.");
      }

      campo.addEventListener("blur", function () {
        validarCampo(this);
      });

      campo.addEventListener("input", function () {
        if (this.classList.contains("is-invalid")) {
          validarCampo(this);
        }
      });
    });

    // Envío del formulario
    btnEnviar?.addEventListener("click", function (e) {
      e.preventDefault();

      const campos = form.querySelectorAll(".form-control");
      let todoValido = true;

      campos.forEach(function (campo) {
        if (!validarCampo(campo)) todoValido = false;
      });

      if (!todoValido) return;

      const textoOriginal = btnEnviar.textContent;
      btnEnviar.textContent = "Enviando...";
      btnEnviar.disabled = true;

      setTimeout(function () {
        btnEnviar.textContent = "✓ Enviado";
        btnEnviar.classList.add("sent");

        form.reset();
        form.querySelectorAll(".form-control").forEach(function (c) {
          c.classList.remove("is-valid", "is-invalid");
        });

        mostrarToast();

        // Restaurar botón después de 5s
        setTimeout(function () {
          btnEnviar.textContent = textoOriginal;
          btnEnviar.disabled = false;
          btnEnviar.classList.remove("sent");
        }, 5000);
      }, 1200);
    });
  }

  const textarea = form?.querySelector("textarea");
  if (textarea) {
    const MAX = 500;
    const contador = document.createElement("small");
    contador.className = "text-muted d-block text-end mt-1";
    contador.textContent = `0 / ${MAX}`;
    textarea.insertAdjacentElement("afterend", contador);

    textarea.addEventListener("input", function () {
      const len = this.value.length;
      if (len > MAX) this.value = this.value.substring(0, MAX);
      contador.textContent = `${Math.min(len, MAX)} / ${MAX}`;
      contador.style.color = len >= MAX * 0.9 ? "#dc3545" : "#6c757d";
    });
  }

  //Hover en ítems de la lista de contacto
  document.querySelectorAll(".contact-list li").forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      this.style.color = "#ffffff";
      this.style.transition = "color 0.2s ease";
    });
    item.addEventListener("mouseleave", function () {
      this.style.color = "";
    });
  });
});
