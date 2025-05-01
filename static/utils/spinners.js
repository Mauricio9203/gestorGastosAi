//showSpinner
const showSpinner = (idSpinner,idDiv) => { 
    document.getElementById(idSpinner).style.display = "block";
    document.getElementById(idDiv).style.display = "none";
}

//hideSpinner
const hideSpinner = (idSpinner,idDiv) => {
    document.getElementById(idSpinner).style.display = "none";
    document.getElementById(idDiv).style.display = "block";
 }


 export {
    hideSpinner,
    showSpinner
 }