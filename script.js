const API_URL = "https://script.google.com/macros/s/AKfycbxcSwNMDZsidDrp2FVvuoVw4ZsJvR6W_CIYxyokNra5rJn3OjEmW66OEMvYJy0cVlBg/exec";

async function carregarPresentes() {
    const res = await fetch(API_URL);
    const dados = await res.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    dados.forEach(item => {
        if (item.status === "disponivel") {
            const div = document.createElement("div");
            div.className = "item";
            div.innerText = item.presente;

            div.onclick = () => reservar(item.id);

            lista.appendChild(div);
        }
    });
}

async function reservar(id) {
    const nome = prompt("Digite seu nome para reservar:");

    if (!nome || nome.trim() === "") {
        alert("Nome é obrigatório!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            id: id,
            nome: nome
        })
    });

    alert("Presente reservado com sucesso!");
    carregarPresentes();
}

carregarPresentes();