export function updateDate() {
    const dateDisplay = document.getElementById("date-container");
    dateDisplay.innerHTML = new Date().getUTCFullYear();
}
