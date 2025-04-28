const disableButtonsItems = () => {
  document.getElementById("agregarItem").disabled = true;
  document.getElementById("eliminarItem").disabled = true;
  document.getElementById("send_data_purchase").disabled = true;
};

const enableButtonsItems = () => {
  document.getElementById("agregarItem").disabled = false;
  document.getElementById("eliminarItem").disabled = false;
  document.getElementById("send_data_purchase").disabled = false;
};

export { enableButtonsItems, disableButtonsItems };
