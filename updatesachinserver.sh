#!/usr/bin/expect -f

set timeout -1

# ===== SERVER DETAILS =====
set server "157.245.111.35"
set user "root"
set password "SECtor@160036sachin"

# ===== CORRECT APP DIRECTORY =====
# Added 'npm run build' to ensure the React app is built for production
set remote_cmd "
cd /opt/sachinserver && \
git pull && \
npm install --no-audit --no-fund && \
npm run build && \
pm2 restart sachinserver
"

# ===== SSH EXECUTION =====
spawn ssh -o StrictHostKeyChecking=no $user@$server "$remote_cmd"
expect {
    "*assword:*" { send "$password\r" }
}
interact
