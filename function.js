const defaultCaracter = {
  name: "",
  vida: 1,
  maxvida: 1,
  ataque: 0,
  defesa: 0,
};

const createGuerreiro = (name) => {
  return {
    ...defaultCaracter,
    name,
    vida: 100,
    maxvida: 100,
    ataque: 10,
    defesa: 8,
  };
};

const createMago = (name) => {
  return {
    ...defaultCaracter,
    name,
    vida: 50,
    maxvida: 50,
    ataque: 14,
    defesa: 4,
  };
};

const createMonstrinho = () => {
  return {
    ...defaultCaracter,
    name: "Little Monster",
    vida: 40,
    maxvida: 40,
    ataque: 4,
    defesa: 4,
  };
};

const createMonstrao = () => {
  return {
    ...defaultCaracter,
    name: "Big Monster",
    vida: 120,
    maxvida: 120,
    ataque: 16,
    defesa: 6,
  };
};

const stage = {
  lutador1: null,
  lutador2: null,
  lutador1El: null,
  lutador2El: null,

  start(lutador1, lutador2, lutador1El, lutador2El) {
    this.lutador1 = lutador1;
    this.lutador2 = lutador2;
    this.lutador1El = lutador1El;
    this.lutador2El = lutador2El;

    this.lutador1El
      .querySelector(".attacButton")
      .addEventListener("click", () =>
        this.doAttack(this.lutador1, this.lutador2)
      );
    this.lutador2El
      .querySelector(".attacButton")
      .addEventListener("click", () =>
        this.doAttack(this.lutador2, this.lutador1)
      );

    this.update();
  },
  update() {
    // Lutador 1
    this.lutador1El.querySelector(".name").innerHTML = `${
      this.lutador1.name
    } - ${this.lutador1.vida.toFixed(1)} HP`;
    let f1Pct = (this.lutador1.vida / this.lutador1.maxvida) * 100;
    this.lutador1El.querySelector(".bar").style.width = `${f1Pct}%`;

    // Lutador 2
    this.lutador2El.querySelector(".name").innerHTML = `${
      this.lutador2.name
    } - ${this.lutador2.vida.toFixed(1)} HP`;
    let f2Pct = (this.lutador2.vida / this.lutador2.maxvida) * 100;
    this.lutador2El.querySelector(".bar").style.width = `${f2Pct}%`;
  },

  doAttack(atacando, atacado) {
    // Implementar lógica de ataque
    if (atacando.vida <= 0 || atacado.vida <= 0) {
      log.addMessage("Aguem está morto");
      return;
    }

    const attackFactor = (Math.random() * 2).toFixed(2);
    const defenseFactor = (Math.random() * 2).toFixed(2);

    const atualAtack = atacando.ataque * attackFactor;
    const atualDefense = atacado.defesa * defenseFactor;

    if (atualAtack > atualDefense) {
      atacado.vida -= atualAtack;
      atacado.vida = atacado.vida < 0 ? 0 : atacado.vida;
      log.addMessage(
        `${atacando.name} causou  ${atualAtack.toFixed(2)} de dano em ${
          atacado.name
        }`
      );
    } else {
      log.addMessage(`${atacado.name} conseguiu defender...`);
    }

    this.update();
  },
};
const log = {
  list: [],
  addMessage(msg) {
    this.list.push(msg);
    this.render();
  },
  render() {
    const logEl = document.querySelector(".log");
    logEl.innerHTML = "";

    for (let i in this.list) {
      logEl.innerHTML += `<li>${this.list[i]}</li>`;
    }
  },
};
