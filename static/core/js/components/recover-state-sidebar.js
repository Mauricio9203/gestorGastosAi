const recoverStateSidebar = () => {
  const sidebar = document.getElementById("sidebarMenu");
  const icon = document.getElementById("toggleSidebarBtn").querySelector("i");

  // Evita transición inicial
  sidebar.classList.add("no-transition");

  const sidebarHidden = localStorage.getItem("sidebarHidden");

  if (sidebarHidden === "true") {
    sidebar.classList.add("hidden");
    icon.classList.remove("fa-chevron-left");
    icon.classList.add("fa-bars");
  } else {
    sidebar.classList.remove("hidden");
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-chevron-left");
  }

  // Permite transición después de aplicar el estado
  requestAnimationFrame(() => {
    sidebar.classList.remove("no-transition");
  });
};

export { recoverStateSidebar };
