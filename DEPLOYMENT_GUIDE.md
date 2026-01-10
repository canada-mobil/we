# 🚀 Lumina4K Production Deployment Guide
**Target:** Ubuntu 22.04 VPS (91.219.239.47) → lumina4k.com

## 📋 Pre-Deployment Checklist
- ✅ Next.js standalone output enabled
- ✅ PM2 ecosystem config created
- ✅ Environment variables configured
- ✅ Production optimizations applied
- ✅ WordPress/PHP files removed

---

## 🖥️ VPS Setup Commands (Ubuntu 22.04)

### 1️⃣ Initial Server Setup & Security
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install nginx ufw fail2ban git curl -y

# Configure firewall
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Configure fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 2️⃣ Install Node.js 20 LTS
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Verify installation
node -v  # Should show v20.x.x
npm -v   # Should show 10.x.x
```

### 3️⃣ Install PM2 Process Manager
```bash
sudo npm install -g pm2
pm2 --version
```

### 4️⃣ Setup Project Directory
```bash
# Create project directory
sudo mkdir -p /var/www/lumina4k
sudo chown -R $USER:$USER /var/www/lumina4k
cd /var/www/lumina4k

# Create log directory for PM2
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2
```

---

## 📁 Upload Project Files

### Option A: Using Git (Recommended)
```bash
cd /var/www/lumina4k
git clone YOUR_REPOSITORY_URL .
```

### Option B: Using SFTP/SCP
```bash
# From your local machine
scp -r /path/to/project/* user@91.219.239.47:/var/www/lumina4k/
```

---

## 🔧 Build & Deploy

### 1️⃣ Install Dependencies & Build
```bash
cd /var/www/lumina4k

# Install dependencies
npm install --production

# Build the application
npm run build

# Verify standalone build
ls -la .next/standalone/  # Should contain server.js
```

### 2️⃣ Setup Environment Variables
```bash
# Copy and edit production environment
cp .env.production .env.local

# Edit with your production values
nano .env.local
```

**Important:** Update these values in `.env.local`:
- Replace Stripe test keys with live keys
- Verify Telegram bot configuration
- Set correct domain URLs

### 3️⃣ Start with PM2
```bash
# Start the application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions shown by the command above
```

---

## 🌐 Nginx Configuration

### 1️⃣ Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 2️⃣ Create Site Configuration
```bash
sudo nano /etc/nginx/sites-available/lumina4k
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name lumina4k.com www.lumina4k.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static assets caching
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Images caching
    location /img/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}
```

### 3️⃣ Enable Site
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/lumina4k /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 SSL Certificate (Let's Encrypt)

### 1️⃣ Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2️⃣ Generate SSL Certificate
```bash
sudo certbot --nginx -d lumina4k.com -d www.lumina4k.com
```

### 3️⃣ Auto-renewal Setup
```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Setup cron job for auto-renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔍 Monitoring & Maintenance

### PM2 Commands
```bash
# Check application status
pm2 status

# View logs
pm2 logs lumina4k

# Restart application
pm2 restart lumina4k

# Monitor resources
pm2 monit
```

### System Monitoring
```bash
# Check Nginx status
sudo systemctl status nginx

# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
htop
```

---

## 🚨 Troubleshooting

### Common Issues

**1. Build fails:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**2. PM2 app won't start:**
```bash
# Check logs
pm2 logs lumina4k --lines 50

# Restart with fresh config
pm2 delete lumina4k
pm2 start ecosystem.config.js --env production
```

**3. Nginx errors:**
```bash
# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t
```

**4. SSL certificate issues:**
```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew --force-renewal
```

---

## 📊 Performance Optimization

### 1️⃣ Enable HTTP/2
Already enabled with SSL certificate.

### 2️⃣ Database Optimization
Not applicable (static site with external APIs).

### 3️⃣ CDN Setup (Optional)
Consider Cloudflare for additional performance and security.

---

## 🎯 Final Verification

After deployment, verify:
- ✅ https://lumina4k.com loads correctly
- ✅ All pages are accessible
- ✅ Checkout process works
- ✅ Telegram notifications function
- ✅ SSL certificate is valid
- ✅ Performance is optimal

---

## 📞 Support Information

**Server Details:**
- IP: 91.219.239.47
- Domain: lumina4k.com
- OS: Ubuntu 22.04
- Node.js: 20 LTS
- PM2: Latest
- Nginx: Latest

**Important Files:**
- Application: `/var/www/lumina4k/`
- Nginx config: `/etc/nginx/sites-available/lumina4k`
- PM2 logs: `/var/log/pm2/`
- SSL certificates: `/etc/letsencrypt/`

---

🚀 **Your Lumina4K e-commerce site is now production-ready!**
