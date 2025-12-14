function generarInputs(figura) {
    const cont = document.getElementById("inputs");
    cont.innerHTML = "";

    const campos = {
        cuadrado: ["lado"],
        rectangulo: ["base", "altura"],
        triangulo: ["base", "altura"],
        rombo: ["diagonalMayor", "diagonalMenor"],
        trapecio: ["baseMayor", "baseMenor", "altura", "lado"],
        circulo: ["radio"],
        esfera: ["radio"],
        cubo: ["lado"],
        paralelepipedo: ["a", "b", "c"],
        cilindro: ["radio", "altura"],
        cono: ["radio", "altura"]
    };

    campos[figura].forEach(campo => {
        cont.innerHTML += `
            <label>${campo}:</label>
            <input type="number" id="${campo}" step="any"><br>
        `;
    });
}

document.getElementById("figura").addEventListener("change", (e) => {
    generarInputs(e.target.value);
});

generarInputs("cuadrado");

function mostrarResultado(obj, formula) {
    let salida = `Fórmula usada: ${formula}\n\n`;
    for (let clave in obj) {
        salida += `${clave.charAt(0).toUpperCase() + clave.slice(1)}: ${obj[clave]}\n`;
    }
    document.getElementById("resultado").textContent = salida;
}

function calcular() {
    const figura = document.getElementById("figura").value;
    let r = {};
    let formula = "";
    const val = id => parseFloat(document.getElementById(id)?.value || 0);
    const pi = Math.PI;

    switch (figura) {
        case "cuadrado":
            let l = val("lado");
            r.area = l * l;
            r.perimetro = 4 * l;
            formula = "Área = l × l, Perímetro = 4 × l";
            break;

        case "rectangulo":
            r.area = val("base") * val("altura");
            r.perimetro = 2 * (val("base") + val("altura"));
            formula = "Área = b × h, Perímetro = 2 × (b + h)";
            break;

        case "triangulo":
            r.area = (val("base") * val("altura")) / 2;
            formula = "Área = (b × h) / 2";
            break;

        case "rombo":
            r.area = val("diagonalMayor") * val("diagonalMenor");
            formula = "Área = D × d";
            break;

        case "trapecio":
            r.area = val("altura") * (val("baseMayor") + val("baseMenor")) / 2;
            r.perimetro = val("baseMayor") + val("baseMenor") + 2 * val("lado");
            formula = "Área = h × (B + b) / 2, Perímetro = B + b + 2 × L";
            break;

        case "circulo":
            r.area = pi * Math.pow(val("radio"), 2);
            r.perimetro = 2 * pi * val("radio");
            formula = "Área = π × r², Perímetro = 2 × π × r";
            break;

        case "esfera":
            r.volumen = (4 / 3) * pi * Math.pow(val("radio"), 3);
            formula = "Volumen = (4/3) × π × r³";
            break;

        case "cubo":
            r.volumen = Math.pow(val("lado"), 3);
            formula = "Volumen = a³";
            break;

        case "paralelepipedo":
            r.volumen = val("a") * val("b") * val("c");
            formula = "Volumen = a × b × c";
            break;

        case "cilindro":
            r.volumen = pi * Math.pow(val("radio"), 2) * val("altura");
            formula = "Volumen = π × r² × h";
            break;

        case "cono":
            r.volumen = (pi * Math.pow(val("radio"), 2) * val("altura")) / 3;
            formula = "Volumen = (π × r² × h) / 3";
            break;
    }

    mostrarResultado(r, formula);
}

function toggleModo() {
    const body = document.body;
    const btn = document.getElementById("modoBtn");

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        btn.textContent = "☀️ Modo día";
    } else {
        btn.textContent = "🌙 Modo oscuro";
    }
}
