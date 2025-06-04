
let coffeePlants = [];
let plantGrowthSpeed = 0.05;
let screen = "info";
let lastPlantTime = 0;

function setup() {
  createCanvas(800, 600);
  noStroke();
}

function draw() {
  if (screen === "info") {
    drawInfoScreen();
  } else if (screen === "simulation") {
    drawSimulation();
  }
}

function drawSimulation() {
  background(200, 255, 200); // Campo verde
  fill(135, 206, 250); // Céu azul
  rect(0, 0, width, height / 2);

  fill(120, 80, 50); // Terra marrom
  rect(0, height / 2, width, height / 2);

  drawSun(700, 100, 80); // Sol fixo

  displayMessage(); // Instrução no topo

  // Atualizar e exibir plantas de café
  for (let i = 0; i < coffeePlants.length; i++) {
    coffeePlants[i].update();
    coffeePlants[i].display();
  }

  // Plantar ao clicar na terra (com intervalo para evitar múltiplos cliques rápidos)
  if (mouseIsPressed && mouseY > height / 2 && millis() - lastPlantTime > 300) {
    coffeePlants.push(new CoffeePlant(mouseX, height / 2));
    lastPlantTime = millis();
  }

  // Créditos no rodapé - em coluna no canto inferior esquerdo
  fill(0);
  textSize(14);
  textAlign(LEFT, BOTTOM);
  let creditLines = [
    "Aluna: Georgia Cristina Muhlenhoff Wierzbicki",
    "Professor: Daniel Marcos Ferreira Machado",
    "Colégio Estadual Iedo Nespolo",
    "Ano escolar: 1º T-A"
  ];

  let baseY = height - 10;
  for (let i = creditLines.length - 1; i >= 0; i--) {
    text(creditLines[i], 10, baseY);
    baseY -= 18; // espaçamento entre linhas
  }
}

function drawSun(x, y, size) {
  fill(255, 223, 0);
  ellipse(x, y, size, size);
}

function displayMessage() {
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Clique na terra para plantar o café!\nENTER: Simulação | I: Info", width / 2, 40);
}

class CoffeePlant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.age = 0;
    this.hasCoffeeBeans = false;
    this.growthRate = random(0.03, 0.07); // Crescimento variável
  }

  update() {
    if (this.age < 1) {
      this.age += this.growthRate;
    }
    if (this.age > 0.5 && !this.hasCoffeeBeans) {
      this.hasCoffeeBeans = true;
    }
    this.size = map(this.age, 0, 1, 10, 50);
  }

  display() {
    fill(34, 139, 34); // Caule
    rect(this.x - 5, this.y - this.size / 2, 10, this.size);
    fill(0, 128, 0); // Folhas
    ellipse(this.x - 10, this.y - this.size / 2, this.size * 0.5, this.size * 0.3);
    ellipse(this.x + 10, this.y - this.size / 2, this.size * 0.5, this.size * 0.3);
    if (this.hasCoffeeBeans) {
      fill(139, 69, 19); // Grãos
      ellipse(this.x, this.y - this.size, this.size * 0.3, this.size * 0.3);
    }
  }
}

function drawInfoScreen() {
  background(240);
  fill(0);
  textSize(22);
  textAlign(CENTER, TOP);
  text("Projeto: Simulação de Plantação de Café", width / 2, 20);

  textSize(12); // menor para caber tudo
  textAlign(LEFT, TOP);
  let infoText = 
    "Instruções:\n" +
    "- Clique com o mouse na parte inferior (terra) para plantar mudas de café.\n" +
    "- As plantas crescem automaticamente com o tempo.\n" +
    "- Quando maduras, produzem grãos visíveis.\n\n" +
    "História das Plantações de Café no Brasil desde a década de 1960:\n\n" +
    "📅 Anos 1960:\n" +
    "- O Brasil já era líder mundial na produção de café.\n" +
    "- Produção concentrada em São Paulo e Paraná.\n" +
    "- Lavouras manuais e oscilações nos preços internacionais.\n\n" +
    "📅 Anos 1970:\n" +
    "- Mecanização inicial e geadas severas em 1975.\n" +
    "- Produção migra do Paraná para Minas Gerais.\n" +
    "- Avanço na pesquisa agrícola.\n\n" +
    "📅 Anos 1980:\n" +
    "- Expansão para o Cerrado Mineiro.\n" +
    "- Melhoria nas técnicas e profissionalização dos produtores.\n" +
    "- Padronização para exportação.\n\n" +
    "📅 Anos 1990:\n" +
    "- Abertura econômica aumenta a competitividade.\n" +
    "- Adoção de práticas sustentáveis e controle de pragas.\n" +
    "- Surgimento dos cafés especiais.\n\n" +
    "📅 Anos 2000:\n" +
    "- Brasil se consolida como maior exportador e produtor.\n" +
    "- Introdução de irrigação por gotejamento e rastreabilidade.\n" +
    "- Crescimento dos cafés orgânicos e certificados.\n\n" +
    "📅 2010–2020:\n" +
    "- Avanço da cafeicultura na Bahia e Espírito Santo.\n" +
    "- Expansão do consumo de cafés especiais no Brasil.\n" +
    "- Aplicação de agricultura de precisão.\n\n" +
    "🌿 Atualidade:\n" +
    "- Brasil lidera a produção global de café.\n" +
    "- Minas Gerais responde por mais de 50% da produção.\n" +
    "- Foco em qualidade, sustentabilidade e inovação tecnológica.\n\n" +
    "Pressione ENTER para iniciar a simulação.";

  text(infoText, 40, 70, width - 80, height - 30); // altura ajustada
}

function keyPressed() {
  if (keyCode === ENTER) {
    screen = "simulation";
  } else if (key === 'I' || key === 'i') {
    screen = "info";
  } else if (key === 'R' || key === 'r') {
    coffeePlants = []; // Resetar plantas
  }
}

