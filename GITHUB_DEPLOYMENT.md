# 🚀 Déploiement GitHub - Lumina4K
**Repo:** git@github.com:canada-mobil/we.git

## 📤 **Upload vers GitHub**

### **Méthode 1: Interface Web GitHub**
1. Allez sur https://github.com/canada-mobil/we
2. Cliquez "Add file" → "Upload files"
3. **Glissez-déposez** tout le contenu de votre dossier projet
4. Commit message: "Add Lumina4K e-commerce website"
5. Cliquez "Commit changes"

### **Méthode 2: Git Command Line (si Git installé)**
```bash
# Dans votre dossier projet local
git init
git remote add origin git@github.com:canada-mobil/we.git
git add .
git commit -m "Add Lumina4K e-commerce website"
git push -u origin main
```

---

## 🖥️ **Déploiement VPS depuis GitHub**

### **1️⃣ Nettoyer et Cloner**
```bash
# Connexion SSH
ssh root@91.219.239.47

# Nettoyer l'ancien projet
cd /var/www
rm -rf lumina4k

# Cloner depuis GitHub
git clone git@github.com:canada-mobil/we.git lumina4k
cd lumina4k
```

### **2️⃣ Installation et Build**
```bash
# Installer les dépendances
npm install

# Corriger next.config.mjs si nécessaire
nano next.config.mjs
# Enlever la ligne "swcMinify: false," si présente

# Build (forcer si erreurs)
npm run build

# Si échec, forcer le build
NEXT_IGNORE_BUILD_ERRORS=true npm run build

# Vérifier que server.js existe
ls -la .next/standalone/server.js
```

### **3️⃣ Configuration Environnement**
```bash
# Copier et éditer les variables
cp .env.production .env.local
nano .env.local
```

**Variables importantes à configurer :**
```bash
NEXT_PUBLIC_SITE_URL=https://lumina4k.com
NEXT_PUBLIC_DOMAIN=lumina4k.com

# Clés Stripe LIVE (remplacer par vos vraies clés)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_SECRETE

# Telegram (garder les mêmes)
TELEGRAM_BOT_TOKEN=8318165972:AAFUvKuh1EMqEs0HmWtR6_7uTQomyVVymZ8
TELEGRAM_CHAT_ID=-5217100062

NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### **4️⃣ Démarrage PM2**
```bash
# Arrêter les anciens processus
pm2 delete all

# Démarrer l'application
pm2 start ecosystem.config.js --env production

# Vérifier le statut
pm2 status
pm2 logs lumina4k

# Sauvegarder
pm2 save
```

### **5️⃣ Configuration Nginx (si pas déjà fait)**
```bash
# Créer la config Nginx
cat > /etc/nginx/sites-available/lumina4k << 'EOF'
server {
    listen 80;
    server_name lumina4k.com www.lumina4k.com;

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
}
EOF

# Activer le site
ln -sf /etc/nginx/sites-available/lumina4k /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Tester et recharger
nginx -t
systemctl reload nginx
```

### **6️⃣ SSL Certificate**
```bash
# Installer Certbot si pas déjà fait
apt install -y certbot python3-certbot-nginx

# Générer le certificat SSL
certbot --nginx -d lumina4k.com -d www.lumina4k.com
```

---

## ✅ **Vérification Finale**

### **Tests à effectuer :**
```bash
# Statut des services
pm2 status
systemctl status nginx

# Test HTTP/HTTPS
curl -I http://lumina4k.com
curl -I https://lumina4k.com

# Test du port 3000 local
curl http://localhost:3000

# Logs si problème
pm2 logs lumina4k --lines 50
tail -f /var/log/nginx/error.log
```

### **Dans le navigateur :**
- ✅ https://lumina4k.com charge correctement
- ✅ Toutes les pages fonctionnent
- ✅ Checkout Stripe opérationnel
- ✅ Notifications Telegram actives
- ✅ Images et assets chargent
- ✅ Responsive design fonctionne

---

## 🔄 **Mises à Jour Futures**

Pour mettre à jour le site après modifications :
```bash
cd /var/www/lumina4k
git pull origin main
npm install
npm run build
pm2 restart lumina4k
```

---

## 🚨 **Dépannage Rapide**

### **502 Bad Gateway :**
```bash
pm2 status  # Vérifier si l'app tourne
pm2 logs lumina4k  # Voir les erreurs
pm2 restart lumina4k  # Redémarrer
```

### **Build qui échoue :**
```bash
NEXT_IGNORE_BUILD_ERRORS=true npm run build
```

### **Port 3000 occupé :**
```bash
lsof -ti:3000 | xargs kill -9
pm2 restart lumina4k
```

---

## 🎯 **Avantages de la Méthode GitHub**

- ✅ **Déploiement rapide** avec `git clone`
- ✅ **Mises à jour faciles** avec `git pull`
- ✅ **Versioning automatique**
- ✅ **Backup sécurisé** sur GitHub
- ✅ **Collaboration possible**
- ✅ **Rollback facile** si problème

**Votre site Lumina4K sera en ligne ! 🎉**
