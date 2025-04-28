const addCustomActiveClass = (linkId, subLinkId, collapseId, arrowDirection) => {
  const link = document.getElementById(linkId);
  const subLink = document.getElementById(subLinkId);
  const collapse = document.getElementById(collapseId);

  link.classList.add("custom-active");
  subLink.classList.add("custom-active-sub");

  if (link.getAttribute("aria-expanded") !== "true") {
    link.setAttribute("aria-expanded", "true");
    collapse.classList.add("show");
  }

  //configurar arrow
  let arrow = document.getElementById(arrowDirection);
  arrow.classList.remove("fa-angle-down");
  arrow.classList.add("fa-angle-up");
};

export { addCustomActiveClass };
