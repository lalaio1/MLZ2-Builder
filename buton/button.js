function toggleOptions(checkboxId, textFieldId, optionsId) {
    var checkbox = document.getElementById(checkboxId);
    var textField = document.getElementById(textFieldId);
    var options = document.getElementById(optionsId);

    textField.style.display = checkbox.checked ? 'block' : 'none';
    options.style.display = checkbox.checked ? 'block' : 'none';
    options.style.maxHeight = "100px"; // ou outra medida que seja maior que a altura real

}


// Função para exibir/ocultar o campo de entrada do webhook
function toggleWebhookInput() {
    var webhookInput = document.getElementById("webhookInput");
    if (document.getElementById("logsCheckbox").checked) {
        webhookInput.style.display = "block";
    } else {
        webhookInput.style.display = "none";
    }
}