import React from 'react';
import './TerminalScripts.css';

const sections = [
    {
        title: 'System Diagnostics',
        scripts: [
            {
                title: 'isMacOnPower',
                command: 'pmset -g batt | grep -qi "discharging" && echo "false" || echo "true"',
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
                command: `#!/bin/bash

isMacOnPower=$(pmset -g batt | grep -qi "discharging" && echo false || echo true)

freeStoragePercentage=$(df -k / | awk 'NR==2 {printf "%.0f", ($4/$2)*100}')

batteryPercentage=$(pmset -g batt | grep -Eo "[0-9]+%" | tr -d '%')

installedMacOsVersion=$(sw_vers -productVersion)

isFileVaultEnabled=$(fdesetup status | grep -qi "on" && echo true || echo false)

filePath="/path/to/file"
isFilePresent=$(test -f "$filePath" && echo true || echo false)

lastDateWhenPasswordChangedForLogedInUser=$(
dscl . -read /Users/$(whoami) accountPolicyData 2>/dev/null |
awk '/passwordLastSetTime/{getline; gsub(/<[^>]*>/,""); split($0,a,"."); print a[1]}' |
xargs -I{} date -r {} +"%m/%d/%Y" 2>/dev/null
)

loggedinUserCreationTime=$(
dscl . -read /Users/$(whoami) accountPolicyData 2>/dev/null |
awk '/creationTime/{getline; gsub(/<[^>]*>/,""); split($0,a,"."); print a[1]}' |
xargs -I{} date -u -r {} +"%m/%d/%Y" 2>/dev/null
)

lastSystemBootTime=$(sysctl -n kern.boottime | awk '{print $4}' | sed 's/,//' | xargs -I{} date -r {} "+%m/%d/%Y")

freeStorageAvaliableInGB=$(df -k / | awk 'NR==2 {printf "%.2f\\n", $4/1024/1024}')

BOOT=$(sysctl -n kern.boottime | awk -F'[ ,}]+' '{print $4}')
NOW=$(date +%s)
deviceUptimeInHours=$(awk -v now="$NOW" -v boot="$BOOT" 'BEGIN {printf "%.2f\\n", (now-boot)/3600}')

cat <<EOF
{
  "isMacOnPower": $isMacOnPower,
  "freeStoragePercentage": $freeStoragePercentage,
  "batteryPercentage": $batteryPercentage,
  "installedMacOsVersion": "$installedMacOsVersion",
  "isFileVaultEnabled": $isFileVaultEnabled,
  "isFilePresent": $isFilePresent,
  "lastDateWhenPasswordChangedForLogedInUser": "$lastDateWhenPasswordChangedForLogedInUser",
  "loggedinUserCreationTime": "$loggedinUserCreationTime",
  "lastSystemBootTime": "$lastSystemBootTime",
  "freeStorageAvaliableInGB": $freeStorageAvaliableInGB,
  "deviceUptimeInHours": $deviceUptimeInHours
}
EOF`,
                description: 'Generates a JSON report of system status including power, storage, battery, OS version, FileVault, file presence, password change date, user creation time, last boot time, free storage in GB, and device uptime.'
            },
            {
                title: 'lastDateWhenPasswordChangedForLogedInUser',
                command: 'dscl . -read /Users/$(whoami) accountPolicyData | awk \'/passwordLastSetTime/{getline; gsub(/<[^>]*>/,""); split($0,a,"."); print a[1]}\' | xargs -I{} date -r {} +"%m/%d/%Y"',
                description: 'Shows the last date the password was changed for the logged-in user.'
            },
            {
                title: 'loggedinUserCreationTime',
                command: 'dscl . -read /Users/$(whoami) accountPolicyData | awk \'/creationTime/{getline; gsub(/<[^>]*>/,""); split($0,a,"."); print a[1]}\' | xargs -I{} date -u -r {} +"%m/%d/%Y"',
                description: 'Shows the creation time of the logged-in user account.'
            },
            {
                title: 'lastSystemBootTime',
                command: 'sysctl -n kern.boottime | awk \'{print $4}\' | sed \'s/,//\' | xargs -I{} date -r {} "+%m/%d/%Y"',
                description: 'Shows the date of the last system boot.'
            },
            {
                title: 'freeStorageAvaliableInGB',
                command: 'df -k / | awk \'NR==2 {printf "%.2f\\n", $4/1024/1024}\'',
                description: 'Shows total free storage available in GB.'
            },
            {
                title: 'deviceUptimeInHours',
                command: `BOOT=$(sysctl -n kern.boottime | awk -F'[ ,}]+' '{print $4}')
NOW=$(date +%s)
awk -v now="$NOW" -v boot="$BOOT" 'BEGIN {printf "%.2f\\n", (now-boot)/3600}'`,
                description: 'Shows the device uptime in hours.'
            }
        ]
    },
    {
        title: 'Other Scripts',
        scripts: [
            {
                title: 'make everything in a folder 777 perm',
                command: 'chmod -R 777 .',
                description: 'Recursively change permissions of all files and folders to 777.'
            }
        ]
    }
];

const copyCommand = (command) => {
    if (navigator?.clipboard) {
        navigator.clipboard.writeText(command);
    }
};

const downloadScript = (title, command) => {
    const element = document.createElement("a");
    const file = new Blob([command], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    const filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ".sh";
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

const TerminalScripts = () => {
    return (
        <div className="terminal-scripts-container">
            <div className="simple-header">
                <h1>Terminal Scripts</h1>
                <p>Handy maintenance and troubleshooting commands for macOS.</p>
            </div>

            <div className="terminal-sections">
                {sections.map((section) => (
                    <div key={section.title} className="section-wrapper" style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                            {section.title}
                        </h2>
                        <div className="terminal-grid">
                            {section.scripts.map((script) => (
                                <article key={script.title} className="terminal-card">
                                    <div className="terminal-card-header">
                                        <h4>{script.title}</h4>
                                        <div className="terminal-actions">
                                            <button
                                                className="copy-btn"
                                                onClick={() => copyCommand(script.command)}
                                                title="Copy command"
                                            >
                                                Copy
                                            </button>
                                            <button
                                                className="download-btn"
                                                onClick={() => downloadScript(script.title, script.command)}
                                                title="Download as file"
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                    <pre className="terminal-command">{script.command}</pre>
                                    <p className="terminal-description">{script.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TerminalScripts;
