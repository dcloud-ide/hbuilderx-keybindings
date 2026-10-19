# 导出本仓库（HBuilderV / VS Code）的官方默认键位，供与插件 package.json 比对。
#
# 用法（在仓库根目录先执行 npm run build-fast）:
#   powershell -ExecutionPolicy Bypass -File extensions\hbuilderx-keymap\lib\scripts\export-default-keybindings.ps1
#
# 输出: lib\default-keybindings\doc.keybindings.{win,osx,linux}.json
# 说明: 导出期间会临时把本插件 package.json 改名，避免插件自身键位污染导出结果。

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$libDir = Split-Path -Parent $scriptDir
$extDir = Split-Path -Parent $libDir
$repoRoot = Split-Path -Parent (Split-Path -Parent $extDir)
$outDir = Join-Path $libDir 'default-keybindings'
$userDataDir = Join-Path $repoRoot '.build\keymap-export-user-data'
$userDataMarker = 'keymap-export-user-data'

if (-not (Test-Path (Join-Path $repoRoot 'out\vs\workbench\workbench.desktop.main.js'))) {
	Write-Error '未找到编译产物 out\vs\...，请先在仓库根目录执行 npm run build-fast'
}

$targets = 'doc.keybindings.win.json', 'doc.keybindings.osx.json', 'doc.keybindings.linux.json'
New-Item -ItemType Directory -Force -Path $outDir, $userDataDir | Out-Null
foreach ($target in $targets) {
	Remove-Item -LiteralPath (Join-Path $outDir $target) -ErrorAction SilentlyContinue
}

function Stop-ExportInstances {
	Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
		Where-Object { $_.CommandLine -like "*$userDataMarker*" } |
		ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}

$pkgPath = Join-Path $extDir 'package.json'
$pkgOff = "$pkgPath.keymap-off"
Rename-Item -LiteralPath $pkgPath -NewName 'package.json.keymap-off'
try {
	Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
	$env:VSCODE_SKIP_PRELAUNCH = '1'
	$process = Start-Process -FilePath 'cmd.exe' `
		-ArgumentList '/c', 'scripts\code.bat', '--export-default-keybindings', $outDir, '--user-data-dir', $userDataDir `
		-WorkingDirectory $repoRoot -PassThru

	$done = $false
	for ($i = 0; $i -lt 150; $i++) {
		Start-Sleep -Seconds 2
		$generated = @($targets | Where-Object { Test-Path (Join-Path $outDir $_) })
		if ($generated.Count -eq $targets.Count) { $done = $true; break }
		if ($process.HasExited) { break }
	}

	if (-not $done) {
		throw '导出超时或失败，未生成全部 3 个默认键位文件'
	}

	# 等待导出实例退出，超时则按独有的 user-data-dir 标记结束进程
	for ($i = 0; $i -lt 15; $i++) {
		if ($process.HasExited) { break }
		Start-Sleep -Seconds 2
	}
	Stop-ExportInstances

	Write-Host "已导出: $(($targets | ForEach-Object { Join-Path $outDir $_ }) -join ', ')"
} finally {
	if (Test-Path -LiteralPath $pkgOff) {
		Rename-Item -LiteralPath $pkgOff -NewName 'package.json'
	}
	Remove-Item Env:VSCODE_SKIP_PRELAUNCH -ErrorAction SilentlyContinue
}
