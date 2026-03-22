document.addEventListener("DOMContentLoaded", () => {

    // =======================
    // CONTADOR REGRESSIVO
    // =======================
    const dataEvento = new Date("2026-04-25T13:00:00");

    function atualizarContador() {
        const agora = new Date();
        const diferenca = dataEvento - agora;

        if (diferenca <= 0) {
            document.getElementById("contador").innerHTML = "<h2>🎉 É hoje! 🎉</h2>";
            return;
        }

        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
        const segundos = Math.floor((diferenca / 1000) % 60);

        document.getElementById("dias").textContent = dias;
        document.getElementById("horas").textContent = horas;
        document.getElementById("minutos").textContent = minutos;
        document.getElementById("segundos").textContent = segundos;
    }

    setInterval(atualizarContador, 1000);
    atualizarContador();


    // =======================
    // SLIDER
    // =======================
    function iniciarSlider() {
        const slides = document.querySelectorAll(".bg-slide");

        console.log("Slides encontrados:", slides.length); // DEBUG

        if (slides.length === 0) return;

        let index = 0;

        slides.forEach(s => s.classList.remove("active"));
        slides[0].classList.add("active");

        setInterval(() => {
            slides[index].classList.remove("active");

            index = (index + 1) % slides.length;

            slides[index].classList.add("active");

        }, 3000);
    }

    iniciarSlider();

});