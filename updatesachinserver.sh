#!/usr/bin/expect -f

set timeout -1

# ===== SERVER DETAILS =====
set server "157.245.111.35"
set user "root"
set password "SECtor@160036sachin"

# ===== REMOTE COMMANDS =====
# 1. Clean Slate: Delete existing PM2 process to remove bad configs
# 2. Build: Install and Build with memory tweaks
# 3. Start: Launch fresh process explicitly on PORT 3000 (Standard for Nginx)
set remote_cmd "
cd /opt/sachinserver && \
git reset --hard HEAD && \
git pull && \
npm install --no-audit --no-fund && \
export NODE_OPTIONS=--max-old-space-size=4096 && \
export GENERATE_SOURCEMAP=false && \
npm run build && \
pm2 delete sachinserver || true && \
PORT=3000 pm2 start npm --name 'sachinserver' -- start && \
pm2 save
"

# ===== SSH EXECUTION =====
spawn ssh -o StrictHostKeyChecking=no $user@$server "$remote_cmd"
expect {
    "*assword:*" { send "$password\r" }
}
interact
