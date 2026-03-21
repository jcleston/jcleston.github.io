const API_URL = "https://script.google.com/macros/s/AKfycbxcSwNMDZsidDrp2FVvuoVw4ZsJvR6W_CIYxyokNra5rJn3OjEmW66OEMvYJy0cVlBg/exec";

async function carregarPresentes() {
    try {
        const res = await fetch(API_URL);
        const dados = await res.json();

        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        dados.forEach(item => {
            if (item.status === "disponivel") {

                const div = document.createElement("div");
                div.className = "item";

                div.innerHTML = `
          <strong>${item.presente}</strong><br>
          <a href="${item.link}" target="_blank" onclick="event.stopPropagation()">
            Ver produto
          </a>
        `;

                div.onclick = () => reservar(item.id);

                lista.appendChild(div);
            }
        });

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        alert("Erro ao carregar a lista. Tente novamente.");
    }
}

async function reservar(id) {
    const nome = prompt("Digite seu nome para reservar:");

    if (!nome || nome.trim() === "") {
        alert("Nome é obrigatório!");
        return;
    }

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
            alert("Presente reservado com sucesso!");
            carregarPresentes();
        } else {
            alert("Este presente já foi reservado por outra pessoa.");
            carregarPresentes();
        }

    } catch (erro) {
        console.error("Erro ao reservar:", erro);
        alert("Erro ao realizar a reserva.");
    }
}

// Inicializa
carregarPresentes();