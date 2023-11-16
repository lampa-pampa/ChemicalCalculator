class InputUI
{
    alert(message)
    {
        const alert = document.createElement("span")
        alert.classList.add("alert")
        alert.textContent = message
        main_ui.output_write(alert)
    }
}