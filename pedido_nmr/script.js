
const abertura = document.getElementById("abertura");
const pedido = document.getElementById("pedido");
const telaFinal = document.getElementById("final");

const abrir = document.getElementById("abrir");

const musica = document.getElementById("musica");

const botaoSim = document.getElementById("sim");
const botaoNao = document.getElementById("nao");

const contador = document.getElementById("contador");

let tentativas = 0;



/* =========================
   MÚSICA COM FADE-IN
========================= */

let musicaIniciada = false;

function iniciarMusica() {

    if (musicaIniciada) return;

    musicaIniciada = true;

    musica.volume = 0;

    musica.play()
        .then(() => {

            let volume = 0;

            const fade = setInterval(() => {

                volume += 0.01;

                if (volume >= 0.8) {

                    volume = 0.8;

                    clearInterval(fade);
                }

                musica.volume = volume;

            }, 50);

        })
        .catch(() => {

            musicaIniciada = false;

        });
}


/*
    Tenta iniciar assim que o site abre
*/

window.addEventListener("load", () => {

    iniciarMusica();

});


/*
    Se o navegador bloquear o autoplay,
    começa na primeira interação do usuário.
*/

document.addEventListener("click", iniciarMusica, {
    once: true
});

document.addEventListener("touchstart", iniciarMusica, {
    once: true
});




/* =========================
   ABRIR O SITE
========================= */

abrir.addEventListener("click", () => {

    iniciarMusica();

    abertura.classList.remove("ativa");

    setTimeout(() => {

        pedido.classList.add("ativa");

    }, 400);

});


/* =========================
   BOTÃO NÃO
========================= */

botaoNao.addEventListener("click", () => {

    tentativas++;

    if (tentativas >= 4) {

        botaoNao.style.display = "none";

        return;
    }


    const limiteX = 120;
    const limiteY = 35;

    const x =
        Math.random() * (limiteX * 2)
        - limiteX;

    const y =
        Math.random() * (limiteY * 2)
        - limiteY;


    botaoNao.style.position = "absolute";

    botaoNao.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* =========================
   BOTÃO SIM
========================= */

botaoSim.addEventListener("click", () => {

    pedido.classList.remove("ativa");

    setTimeout(() => {

        telaFinal.classList.add("ativa");

    }, 500);

});


/* =========================
   CONTADOR
========================= */

const dataInicio =
    new Date("2019-10-02T14:30:00");


function atualizarContador() {

    const agora = new Date();

    let diferenca =
        agora - dataInicio;


    if (diferenca < 0) {

        contador.innerHTML =
            "Em breve ❤️";

        return;
    }


    const segundos =
        Math.floor(diferenca / 1000);

    const minutos =
        Math.floor(segundos / 60);

    const horas =
        Math.floor(minutos / 60);

    const dias =
        Math.floor(horas / 24);


    const anos =
        Math.floor(dias / 365.2425);


    const diasRestantes =
        Math.floor(
            dias - (anos * 365.2425)
        );


    const horasRestantes =
        horas % 24;


    const minutosRestantes =
        minutos % 60;


    contador.innerHTML =
        `${anos} anos, ${diasRestantes} dias,
        ${horasRestantes} horas e
        ${minutosRestantes} minutos`;
}


atualizarContador();

setInterval(atualizarContador, 1000);


/* =========================
   CORAÇÕES FLUTUANTES
========================= */

const containerHearts =
    document.getElementById("hearts");


function criarCoracao() {

    const heart =
        document.createElement("div");

    heart.classList.add("floating-heart");


    const tipos = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘"
    ];


    heart.innerHTML =
        tipos[
            Math.floor(
                Math.random() * tipos.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (Math.random() * 20 + 15) + "px";


    const duracao =
        Math.random() * 5 + 5;


    heart.style.animationDuration =
        duracao + "s";


    containerHearts.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, duracao * 1000);

}


setInterval(criarCoracao, 500);
