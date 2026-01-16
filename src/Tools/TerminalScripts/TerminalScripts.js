import React from 'react';
import './TerminalScripts.css';

const scripts = [


    {
        title: 'isMacOnPower',
        command: 'pmset -g batt | grep -qi \"discharging\" && echo \"false\" || echo \"true\"',
        description: 'Quickly check if the machine is on power or battery.'
    },
    {
        title: 'freeStoragePercentage',
        command: `df -k / | awk 'NR==2 {printf "%.0f\\n", ($4/$2)*100}'`,
        description: 'Shows the percentage of free space on the root volume.'
    },
    {
        title: 'batteryPercentage',
        command: 'pmset -g batt | grep -Eo "[0-9]+%" | tr -d \'%\'',
        description: 'Outputs current battery percentage as a number.'
    },
    {
        title: 'installedMacOsVersion',
        command: 'sw_vers -productVersion',
        description: 'Prints the currently installed macOS version.'
    },
    {
        title: 'isFileVaultEnabled',
        command: 'fdesetup status | grep -qi "on" && echo true || echo false',
        description: 'Returns true if FileVault is enabled, false otherwise.'
    },
    {
        title: 'isFilePresent',
        command: 'test -f "/path/to/file" && echo true || echo false',
        description: 'Replace /path/to/file with the file you want to check.'
    },
    {
        title: 'System Health Check (JSON)',
        command: `isMacOnPower=$(pmset -g batt | grep -qi "discharging" && echo false || echo true)

freeStoragePercentage=$(df -k / | awk 'NR==2 {printf "%.0f", ($4/$2)*100}')

batteryPercentage=$(pmset -g batt | grep -Eo "[0-9]+%" | tr -d '%')

installedMacOsVersion=$(sw_vers -productVersion)

isFileVaultEnabled=$(fdesetup status | grep -qi "on" && echo true || echo false)

filePath="/path/to/file"
isFilePresent=$(test -f "$filePath" && echo true || echo false)

cat <<EOF
{
  "isMacOnPower": $isMacOnPower,
  "freeStoragePercentage": $freeStoragePercentage,
  "batteryPercentage": $batteryPercentage,
  "installedMacOsVersion": "$installedMacOsVersion",
  "isFileVaultEnabled": $isFileVaultEnabled,
  "isFilePresent": $isFilePresent
}
EOF`,
        description: 'Generates a JSON report of system status including power, storage, battery, OS version, FileVault, and file presence.'
    }
];

const copyCommand = (command) => {
    if (navigator?.clipboard) {
        navigator.clipboard.writeText(command);
    }
};

const TerminalScripts = () => {
    return (
        <div className="terminal-scripts-container">
            <div className="simple-header">
                <h1>Terminal Scripts</h1>
                <p>Handy maintenance and troubleshooting commands for macOS.</p>
            </div>

            <div className="terminal-grid">
                {scripts.map((script) => (
                    <article key={script.title} className="terminal-card">
                        <div className="terminal-card-header">
                            <h4>{script.title}</h4>
                            <button
                                className="copy-btn"
                                onClick={() => copyCommand(script.command)}
                                title="Copy command"
                            >
                                Copy
                            </button>
                        </div>
                        <pre className="terminal-command">{script.command}</pre>
                        <p className="terminal-description">{script.description}</p>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default TerminalScripts;
