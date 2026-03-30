const API_URL = "https://script.google.com/macros/s/AKfycbxcSwNMDZsidDrp2FVvuoVw4ZsJvR6W_CIYxyokNra5rJn3OjEmW66OEMvYJy0cVlBg/exec";

// =======================
// ESTADO GLOBAL
// =======================
let presenteSelecionado = null;


// =======================
// PRELOADER
// =======================
function mostrarLoader() {
    document.getElementById("preloader").style.display = "flex";
}

function esconderLoader() {
    document.getElementById("preloader").style.display = "none";
}


// =======================
// CARREGAR PRESENTES
// =======================
async function carregarPresentes() {
    mostrarLoader();

    try {
        const res = await fetch(API_URL);
        const dados = await res.json();

        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        dados.forEach(item => {

            const reservado = item.nome && item.nome.trim() !== "";

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${item.imagem || 'https://via.placeholder.com/300'}" alt="${item.presente}">
                
                <div class="card-content">
                    <h3>${item.presente}</h3>

                    <a href="${item.link}" target="_blank">Ver produto</a>

                    ${reservado
                    ? `
                        <p class="reservado">Reservado por: <strong>${item.nome}</strong></p>
                        <button disabled class="btn-reservado">Indisponível</button>
                        `
                    : `
                        <button onclick="reservar(${item.id})">Reservar</button>
                        `
                }
                </div>
            `;

            lista.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao carregar:", erro);
        alert("Erro ao carregar lista.");
    }

    esconderLoader();
}


// =======================
// ABRIR MODAL
// =======================
function reservar(id) {
    presenteSelecionado = id;

    document.getElementById("modal").style.display = "flex";
    document.getElementById("nomeInput").value = "";
}


// =======================
// CONTROLE DO MODAL
// =======================
function configurarModal() {

    const modal = document.getElementById("modal");
    const cancelarBtn = document.getElementById("cancelarBtn");
    const confirmarBtn = document.getElementById("confirmarBtn");
    const nomeInput = document.getElementById("nomeInput");

    // Fechar modal
    cancelarBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Confirmar reserva
    confirmarBtn.addEventListener("click", async () => {

        const nome = nomeInput.value.trim();

        if (!nome) {
            alert("Digite seu nome!");
            return;
        }

        mostrarLoader();

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({
                    id: presenteSelecionado,
                    nome: nome
                })
            });

            const resultado = await res.json();

            if (resultado.sucesso) {
                alert("Reservado com sucesso!");
            } else {
                alert("Este presente já foi reservado!");
            }

            modal.style.display = "none";

            await carregarPresentes();

        } catch (erro) {
            console.error("Erro:", erro);
            alert("Erro ao reservar.");
        }

        esconderLoader();
    });

    // ENTER confirma
    nomeInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            confirmarBtn.click();
        }
    });

    // Clique fora fecha modal
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}


// =======================
// INICIALIZAÇÃO
// =======================
document.addEventListener("DOMContentLoaded", () => {
    carregarPresentes();
    configurarModal();
});