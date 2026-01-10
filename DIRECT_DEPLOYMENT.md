# 🚀 Lumina4K Direct Deployment (Sans Git)
**Target:** Ubuntu 22.04 VPS (91.219.239.47) → lumina4k.com

## 📋 Méthode de Déploiement Direct

### 🎯 **Option 1: Upload via SFTP/FileZilla (Recommandé)**

#### 1️⃣ Télécharger FileZilla
- Site: https://filezilla-project.org/
- Installer FileZilla Client

#### 2️⃣ Configuration FileZilla
```
Host: 91.219.239.47
Username: root (ou votre utilisateur)
Password: [votre mot de passe]
Port: 22
Protocol: SFTP
```

#### 3️⃣ Upload du Projet
1. **Connectez-vous** à votre VPS via FileZilla
2. **Naviguez** vers `/var/www/` sur le serveur (côté droit)
3. **Créez** le dossier `lumina4k` si nécessaire
4. **Uploadez** tout le contenu de votre projet local vers `/var/www/lumina4k/`

---

### 🎯 **Option 2: Upload via SCP (Ligne de commande)**

#### Depuis Windows (PowerShell)
```powershell
# Upload du ZIP
scp "c:\Users\yoyof\Downloads\lumina4k-production.zip" root@91.219.239.47:/tmp/

# Connexion SSH pour extraire
ssh root@91.219.239.47
```

#### Sur le VPS (après connexion SSH)
```bash
# Créer le répertoire
mkdir -p /var/www/lumina4k

# Extraire le ZIP
cd /tmp
unzip lumina4k-production.zip -d /var/www/lumina4k/

# Ajuster les permissions
chown -R www-data:www-data /var/www/lumina4k
chmod -R 755 /var/www/lumina4k

# Nettoyer
rm lumina4k-production.zip
```

---

### 🎯 **Option 3: Upload via WinSCP (Windows)**

#### 1️⃣ Télécharger WinSCP
- Site: https://winscp.net/
- Installer WinSCP

#### 2️⃣ Configuration
```
File protocol: SFTP
Host name: 91.219.239.47
User name: root
Password: [votre mot de passe]
```

#### 3️⃣ Transfer
1. **Glissez-déposez** votre dossier projet vers `/var/www/lumina4k/`

---

## 🖥️ **Commandes VPS Complètes (Après Upload)**

### 1️⃣ Connexion SSH
```bash
ssh root@91.219.239.47
```

### 2️⃣ Préparation du Système
```bash
# Mise à jour
apt update && apt upgrade -y

# Packages essentiels
apt install -y nginx ufw fail2ban curl

# Firewall
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw --force enable

# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# PM2
npm install -g pm2

# Vérification
node -v
npm -v
```

### 3️⃣ Configuration du Projet
```bash
# Aller dans le projet
cd /var/www/lumina4k

# Permissions
chown -R www-data:www-data /var/www/lumina4k
chmod -R 755 /var/www/lumina4k

# Installation des dépendances
npm install

# Build de production
npm run build

# Vérifier le build standalone
ls -la .next/standalone/
```

### 4️⃣ Variables d'Environnement
```bash
# Copier le template
cp .env.production .env.local

# Éditer avec vos vraies valeurs
nano .env.local
```

**⚠️ Important:** Remplacez dans `.env.local`:
```bash
# Clés Stripe LIVE (pas test!)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE_LIVE
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_SECRETE_LIVE

# Domaine correct
NEXT_PUBLIC_SITE_URL=https://lumina4k.com
```

### 5️⃣ Démarrage avec PM2
```bash
# Démarrer l'application
pm2 start ecosystem.config.js --env production

# Sauvegarder la config
pm2 save

# Auto-start au boot
pm2 startup
# Exécuter la commande affichée par pm2 startup

# Vérifier le statut
pm2 status
```

### 6️⃣ Configuration Nginx
```bash
# Créer la config Nginx
cat > /etc/nginx/sites-available/lumina4k << 'EOF'
server {
    listen 80;
    server_name lumina4k.com www.lumina4k.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript;

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

# Activer le site
ln -sf /etc/nginx/sites-available/lumina4k /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Tester et recharger
nginx -t
systemctl reload nginx
```

### 7️⃣ SSL avec Let's Encrypt
```bash
# Installer Certbot
apt install -y certbot python3-certbot-nginx

# Générer le certificat
certbot --nginx -d lumina4k.com -d www.lumina4k.com

# Auto-renouvellement
crontab -e
# Ajouter cette ligne:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## ✅ **Vérification Finale**

### Tests à effectuer:
```bash
# Statut de l'application
pm2 status

# Logs en temps réel
pm2 logs lumina4k

# Test HTTP
curl -I http://lumina4k.com

# Test HTTPS (après SSL)
curl -I https://lumina4k.com

# Statut Nginx
systemctl status nginx
```

### Vérifications dans le navigateur:
- ✅ https://lumina4k.com charge correctement
- ✅ Toutes les pages fonctionnent
- ✅ Checkout Stripe opérationnel
- ✅ Notifications Telegram actives
- ✅ Certificat SSL valide

---

## 🔧 **Commandes de Maintenance**

### Redémarrer l'application:
```bash
pm2 restart lumina4k
```

### Voir les logs:
```bash
pm2 logs lumina4k --lines 50
```

### Mettre à jour le code:
```bash
# Après avoir uploadé les nouveaux fichiers
cd /var/www/lumina4k
npm run build
pm2 restart lumina4k
```

### Monitoring:
```bash
pm2 monit
htop
df -h
```

---

## 🚨 **Dépannage Rapide**

### Si l'app ne démarre pas:
```bash
cd /var/www/lumina4k
npm install
npm run build
pm2 delete lumina4k
pm2 start ecosystem.config.js --env production
```

### Si Nginx ne fonctionne pas:
```bash
nginx -t
systemctl status nginx
tail -f /var/log/nginx/error.log
```

### Si SSL ne fonctionne pas:
```bash
certbot certificates
certbot renew --dry-run
```

---

## 🎯 **Résumé des Étapes**

1. **📤 Upload** - Transférer les fichiers via SFTP/SCP
2. **🔧 Setup** - Installer Node.js, PM2, Nginx
3. **🏗️ Build** - Compiler l'application Next.js
4. **⚙️ Config** - Variables d'environnement + Nginx
5. **🚀 Start** - Lancer avec PM2
6. **🔒 SSL** - Certificat Let's Encrypt
7. **✅ Test** - Vérifier que tout fonctionne

**🎉 Votre site Lumina4K sera en ligne sans Git !**
