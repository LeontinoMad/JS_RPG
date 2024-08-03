const char = createGuerreiro("Leo");
const monster = createMonstrinho();

stage.start(
  char,
  monster,
  document.querySelector("#char"),
  document.querySelector("#monster")
);
