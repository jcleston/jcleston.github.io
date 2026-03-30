const API_URL = "https://script.google.com/macros/s/AKfycbxcSwNMDZsidDrp2FVvuoVw4ZsJvR6W_CIYxyokNra5rJn3OjEmW66OEMvYJy0cVlBg/exec";

document.addEventListener("DOMContentLoaded", () => {

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
    // MODAL
    // =======================
    let presenteSelecionado = null;
    let botaoSelecionado = null;

    const modal = document.getElementById("modal");
    const nomeInput = document.getElementById("nomeInput");
    const cancelarBtn = document.getElementById("cancelarBtn");
    const confirmarBtn = document.getElementById("confirmarBtn");

    function abrirModal(id, botao) {
        presenteSelecionado = id;
        botaoSelecionado = botao;
        nomeInput.value = "";
        modal.style.display = "flex";
        nomeInput.focus();
    }

    function fecharModal() {
        modal.style.display = "none";
    }

    cancelarBtn.onclick = fecharModal;

    confirmarBtn.onclick = () => {
        const nome = nomeInput.value.trim();

        if (!nome) {
            alert("Nome obrigatório!");
            return;
        }

        fecharModal();
        reservar(presenteSelecionado, botaoSelecionado, nome);
    };

    // =======================
    // CRIAR CARD
    // =======================
    function criarCard(item) {
        const card = document.createElement("div");
        card.className = "card";

        const botao = document.createElement("button");
        botao.textContent = "Reservar";

        botao.addEventListener("click", () => abrirModal(item.id, botao));

        card.innerHTML = `
            <img src="${item.imagem || 'https://via.placeholder.com/300'}">
            <div class="card-content">
                <h3>${item.presente}</h3>
                <a href="${item.link}" target="_blank">Ver produto</a>
            </div>
        `;

        card.querySelector(".card-content").appendChild(botao);

        return card;
    }

    // =======================
    // CARREGAR
    // =======================
    async function carregarPresentes() {
        mostrarLoader();

        try {
            const res = await fetch(API_URL);
            const dados = await res.json();

            const lista = document.getElementById("lista");
            lista.innerHTML = "";

            dados.forEach(item => {

                const reservado = item.status && !item.status.toLowerCase().includes("dispon");

                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                <img src="${item.imagem || 'https://via.placeholder.com/300'}" alt="${item.presente}">
                
                <div class="card-content">
                    <h3>${item.presente}</h3>

                    <a href="${item.link}" target="_blank">Ver produto</a>

                    ${reservado
                        ? `<p class="reservado">Reservado por: <strong>${item.nome || 'Alguém'}</strong></p>
                           <button disabled class="btn-reservado">Indisponível</button>`
                        : `<button onclick="reservar(${item.id})">Reservar</button>`
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
    // RESERVAR
    // =======================
    async function reservar(id, botao, nome) {
        botao.disabled = true;
        botao.textContent = "Reservando...";

        mostrarLoader();

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({ id, nome })
            });

            const resultado = await res.json();

            if (resultado.sucesso) {
                botao.closest(".card").remove();
            } else {
                alert("Já foi reservado!");
            }

        } catch (erro) {
            console.error(erro);
            alert("Erro ao reservar.");
        }

        esconderLoader();
    }

    // =======================
    // INIT
    // =======================
    carregarPresentes();

});