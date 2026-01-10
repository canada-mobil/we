#!/bin/bash

# 🚀 Lumina4K Deployment Script for Ubuntu 22.04 VPS
# Target: lumina4k.com (91.219.239.47)

set -e

echo "🚀 Starting Lumina4K deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="lumina4k"
PROJECT_PATH="/var/www/lumina4k"
DOMAIN="lumina4k.com"
NODE_VERSION="20"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential packages
print_status "Installing essential packages..."
sudo apt install -y nginx ufw fail2ban git curl build-essential

# Configure firewall
print_status "Configuring firewall..."
sudo ufw --force reset
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Install Node.js 20
print_status "Installing Node.js ${NODE_VERSION}..."
if ! command -v node &> /dev/null || [[ $(node -v | cut -d'v' -f2 | cut -d'.' -f1) -lt ${NODE_VERSION} ]]; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt install -y nodejs
fi

print_status "Node.js version: $(node -v)"
print_status "NPM version: $(npm -v)"

# Install PM2
print_status "Installing PM2..."
sudo npm install -g pm2@latest

# Create project directory
print_status "Setting up project directory..."
sudo mkdir -p ${PROJECT_PATH}
sudo chown -R $USER:$USER ${PROJECT_PATH}

# Create log directory
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# Navigate to project directory
cd ${PROJECT_PATH}

print_status "Project directory ready at ${PROJECT_PATH}"

# Install dependencies and build
if [ -f "package.json" ]; then
    print_status "Installing dependencies..."
    npm install --production=false
    
    print_status "Building application..."
    npm run build
    
    # Check if standalone build exists
    if [ -f ".next/standalone/server.js" ]; then
        print_status "✅ Standalone build successful!"
    else
        print_error "❌ Standalone build failed - server.js not found"
        exit 1
    fi
else
    print_warning "package.json not found. Make sure to upload your project files first."
fi

# Setup environment variables
if [ -f ".env.production" ]; then
    print_status "Setting up environment variables..."
    cp .env.production .env.local
    print_warning "Please edit .env.local with your production values:"
    print_warning "nano ${PROJECT_PATH}/.env.local"
fi

# Configure Nginx
print_status "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/${PROJECT_NAME} > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Static assets caching
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /img/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/${PROJECT_NAME} /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
if sudo nginx -t; then
    print_status "✅ Nginx configuration is valid"
    sudo systemctl reload nginx
else
    print_error "❌ Nginx configuration is invalid"
    exit 1
fi

# Start application with PM2
if [ -f "ecosystem.config.js" ]; then
    print_status "Starting application with PM2..."
    
    # Stop existing process if running
    pm2 delete ${PROJECT_NAME} 2>/dev/null || true
    
    # Start new process
    pm2 start ecosystem.config.js --env production
    pm2 save
    
    # Setup startup script
    pm2 startup | grep -E '^sudo' | bash || true
    
    print_status "✅ Application started successfully!"
else
    print_error "❌ ecosystem.config.js not found"
    exit 1
fi

# Install SSL certificate
print_status "Installing SSL certificate..."
sudo apt install -y certbot python3-certbot-nginx

print_warning "To complete SSL setup, run:"
print_warning "sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"

# Setup auto-renewal
print_status "Setting up SSL auto-renewal..."
(sudo crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | sudo crontab -

# Final status check
print_status "Checking application status..."
pm2 status

print_status "🎉 Deployment completed successfully!"
print_status "Your site should be available at:"
print_status "  HTTP:  http://${DOMAIN}"
print_status "  HTTPS: https://${DOMAIN} (after SSL setup)"
print_status ""
print_status "Next steps:"
print_status "1. Edit environment variables: nano ${PROJECT_PATH}/.env.local"
print_status "2. Setup SSL: sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
print_status "3. Test your site: curl -I http://${DOMAIN}"
print_status ""
print_status "Useful commands:"
print_status "  pm2 status          - Check app status"
print_status "  pm2 logs ${PROJECT_NAME}     - View logs"
print_status "  pm2 restart ${PROJECT_NAME}  - Restart app"
print_status "  sudo nginx -t       - Test Nginx config"
print_status "  sudo systemctl reload nginx - Reload Nginx"
