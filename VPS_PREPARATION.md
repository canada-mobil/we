# 🖥️ Préparation VPS Ubuntu 22.04 - Lumina4K
**IP:** 91.219.239.47 → lumina4k.com

## ⚠️ **ÉTAPES OBLIGATOIRES AVANT UPLOAD**

### 1️⃣ **Connexion SSH Initiale**
```bash
ssh root@91.219.239.47
```

### 2️⃣ **Mise à Jour du Système**
```bash
# Mise à jour des packages
apt update && apt upgrade -y

# Redémarrer si nécessaire
reboot
```

### 3️⃣ **Création des Répertoires Nécessaires**
```bash
# Créer le répertoire web principal
mkdir -p /var/www

# Créer le répertoire pour votre projet
mkdir -p /var/www/lumina4k

# Créer le répertoire pour les logs PM2
mkdir -p /var/log/pm2

# Vérifier que les répertoires existent
ls -la /var/www/
```

### 4️⃣ **Installation des Outils de Base**
```bash
# Installer les packages essentiels
apt install -y curl wget unzip nginx ufw fail2ban

# Vérifier les installations
which curl
which nginx
```

### 5️⃣ **Configuration Firewall de Base**
```bash
# Configurer le firewall
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw --force enable

# Vérifier le statut
ufw status
```

### 6️⃣ **Installation Node.js 20**
```bash
# Ajouter le repository Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Installer Node.js
apt install -y nodejs

# Vérifier les versions
node -v    # Doit afficher v20.x.x
npm -v     # Doit afficher 10.x.x
```

### 7️⃣ **Installation PM2**
```bash
# Installer PM2 globalement
npm install -g pm2

# Vérifier l'installation
pm2 --version
```

### 8️⃣ **Configuration des Permissions**
```bash
# Ajuster les permissions pour /var/www
chown -R www-data:www-data /var/www
chmod -R 755 /var/www

# Permettre à l'utilisateur actuel d'écrire
chown -R $USER:www-data /var/www/lumina4k
chmod -R 775 /var/www/lumina4k
```

---

## ✅ **Vérification que Tout est Prêt**

Exécutez ces commandes pour vérifier:
```bash
# Vérifier les répertoires
ls -la /var/www/
ls -la /var/www/lumina4k/

# Vérifier Node.js
node -v
npm -v

# Vérifier PM2
pm2 --version

# Vérifier Nginx
nginx -v

# Vérifier le firewall
ufw status
```

**Résultat attendu:**
- ✅ `/var/www/lumina4k/` existe
- ✅ Node.js v20.x.x installé
- ✅ NPM v10.x.x installé  
- ✅ PM2 installé
- ✅ Nginx installé
- ✅ Firewall configuré

---

## 📤 **Maintenant Vous Pouvez Uploader**

Une fois ces étapes terminées, vous pouvez:

### **Via FileZilla:**
1. **Connectez-vous** : `sftp://91.219.239.47`
2. **Naviguez** vers `/var/www/lumina4k/` (côté serveur)
3. **Uploadez** tout votre projet local

### **Via SCP (Windows PowerShell):**
```powershell
scp -r "c:\Users\yoyof\Downloads\word-press-landing-page (3)\*" root@91.219.239.47:/var/www/lumina4k/
```

---

## 🚀 **Après Upload - Déploiement Final**

```bash
# Aller dans le projet
cd /var/www/lumina4k

# Rendre le script exécutable
chmod +x deploy.sh

# Lancer le déploiement automatique
./deploy.sh
```

Le script `deploy.sh` va automatiquement:
- ✅ Installer les dépendances npm
- ✅ Builder l'application Next.js
- ✅ Configurer Nginx
- ✅ Démarrer avec PM2
- ✅ Configurer les logs

---

## 🔧 **Configuration Finale**

### Variables d'environnement:
```bash
nano /var/www/lumina4k/.env.local
```

Remplacez par vos vraies clés:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_SECRETE
NEXT_PUBLIC_SITE_URL=https://lumina4k.com
```

### SSL Certificate:
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d lumina4k.com -d www.lumina4k.com
```

---

## 🎯 **Ordre des Opérations**

1. **🖥️ Préparer le VPS** (cette page)
2. **📤 Uploader le projet** (FileZilla/SCP)
3. **🚀 Déployer** (`./deploy.sh`)
4. **🔧 Configurer** (variables + SSL)
5. **✅ Tester** (https://lumina4k.com)

**Votre site Lumina4K sera en ligne ! 🎉**
