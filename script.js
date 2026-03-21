const API_URL = "https://script.google.com/macros/s/AKfycbxcSwNMDZsidDrp2FVvuoVw4ZsJvR6W_CIYxyokNra5rJn3OjEmW66OEMvYJy0cVlBg/exec";

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

        console.log("DADOS:", dados);

        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        dados.forEach(item => {
            if (item.status && item.status.toLowerCase().includes("dispon")) {

                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <img src="${item.imagem || 'https://via.placeholder.com/300'}" alt="${item.presente}">
                    <div class="card-content">
                        <h3>${item.presente}</h3>
                        <a href="${item.link}" target="_blank">Ver produto</a>
                        <button onclick="reservar(${item.id})">Reservar</button>
                    </div>
                `;

                lista.appendChild(card);
            }
        });

    } catch (erro) {
        console.error("Erro ao carregar:", erro);
        alert("Erro ao carregar lista.");
    }

    esconderLoader();
}

// =======================
// RESERVAR PRESENTE
// =======================
async function reservar(id) {
    const nome = prompt("Digite seu nome:");

    if (!nome || nome.trim() === "") {
        alert("Nome obrigatório!");
        return;
    }

    mostrarLoader();

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                id: id,
                nome: nome.trim()
            })
        });

        const resultado = await res.json();

        if (resultado.sucesso) {
            alert("Reservado com sucesso!");
        } else {
            alert("Já foi reservado!");
        }

        await carregarPresentes();

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro ao reservar.");
    }

    esconderLoader();
}

// =======================
// INICIALIZAÇÃO
// =======================
carregarPresentes();