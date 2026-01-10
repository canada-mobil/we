# 📤 Instructions d'Upload Direct - Lumina4K

## 🎯 **Méthode Recommandée: FileZilla SFTP**

### 1️⃣ **Téléchargement et Installation**
- Téléchargez FileZilla Client: https://filezilla-project.org/download.php?type=client
- Installez FileZilla sur votre ordinateur

### 2️⃣ **Configuration de Connexion**
Ouvrez FileZilla et configurez:
```
Hôte: sftp://91.219.239.47
Nom d'utilisateur: root
Mot de passe: [votre mot de passe VPS]
Port: 22
```

### 3️⃣ **Connexion et Upload**
1. **Connectez-vous** en cliquant sur "Connexion rapide"
2. **Côté serveur** (droite): Naviguez vers `/var/www/`
3. **Créez le dossier** `lumina4k` sur le serveur
4. **Côté local** (gauche): Naviguez vers votre projet
5. **Sélectionnez tout** le contenu de votre dossier projet
6. **Glissez-déposez** ou clic droit → "Envoyer vers le serveur"

---

## 🖥️ **Commandes VPS Après Upload**

### Connexion SSH
```bash
ssh root@91.219.239.47
```

### Installation Automatique
```bash
# Aller dans le projet
cd /var/www/lumina4k

# Rendre le script exécutable et le lancer
chmod +x deploy.sh
./deploy.sh
```

**C'est tout !** Le script `deploy.sh` va automatiquement:
- ✅ Installer Node.js 20
- ✅ Installer PM2
- ✅ Configurer Nginx
- ✅ Builder l'application
- ✅ Démarrer le site

### Configuration Finale
Après le script, éditez vos variables:
```bash
nano /var/www/lumina4k/.env.local
```

Remplacez par vos vraies clés Stripe LIVE:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_SECRETE
```

### SSL Certificate
```bash
sudo certbot --nginx -d lumina4k.com -d www.lumina4k.com
```

---

## ✅ **Vérification**
- Visitez: https://lumina4k.com
- Testez le checkout
- Vérifiez les notifications Telegram

**🎉 Votre site sera en ligne !**
