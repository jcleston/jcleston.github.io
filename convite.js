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

// Atualiza a cada segundo
setInterval(atualizarContador, 1000);

// Executa ao carregar
atualizarContador();