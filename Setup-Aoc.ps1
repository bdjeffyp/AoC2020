# Ensure a folder name is provided
Param(
    [Parameter(mandatory)]
    [string]$folderName
)
Write-Host "folderName=$folderName"
if(-not($folderName)) { Throw "You must provide a name for the folder" }

# Create the new folder
mkdir $folderName
cd $folderName

# Initialize NPM and install packages
npm init -y
Write-Host "Installing dependencies..."
npm install --save-dev typescript @types/node ts-node nodemon

# Initialize TypeScript
npx tsc --init --rootDir ./ --outDir build --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs --allowJs true --noImplicitAny true

# Modify package.json
(Get-Content .\package.json) |
    Foreach-Object {
        # Modify the entry point line
        if ($_ -match '"main": "index.js",')
        {
            $_ -replace 'index.js', 'index.ts'
        }
        else {
            # Output a line
            $_
        }

        # Add the start script in the "scripts" section
        if ($_ -match '"scripts": {')
        {
            '    "start": "nodemon",'
        }
    } | Set-Content .\package.json

# Create initial entrypoint file
$entryFile = 'console.log("Hello world!");'
Set-Content -Value $entryFile -Path .\index.ts