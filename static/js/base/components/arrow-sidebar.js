const arrowSidebar = () => {
  //módulo dashboard
  document.getElementById("dashboardLink").addEventListener("click", function () {
    arrowDiection(document.getElementById("dashboardArrow"));
  });

  //módulo Settings
  document.getElementById("configuracionesLink").addEventListener("click", function () {
    arrowDiection(document.getElementById("configuracionesArrow"));
  });

  //módulo Registro Gastos
  document.getElementById("registroGastosLink").addEventListener("click", function () {
    arrowDiection(document.getElementById("registroGastosArrow"));
  });
};

const arrowDiection = (arrow) => {
  if (arrow.classList.contains("fa-angle-down")) {
    arrow.classList.remove("fa-angle-down");
    arrow.classList.add("fa-angle-up");
  } else {
    arrow.classList.remove("fa-angle-up");
    arrow.classList.add("fa-angle-down");
  }
};

export { arrowSidebar };
