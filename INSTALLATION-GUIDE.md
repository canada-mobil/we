# CinemaMax Pro - Complete Installation Guide

## Step-by-Step Installation

### Prerequisites

- WordPress 6.0 or higher
- PHP 7.4 or higher
- WooCommerce plugin (for e-commerce features)

---

## Part 1: Install the Theme

### Option A: Upload via WordPress Admin (Easiest)

1. **Download the theme ZIP file** to your computer
2. **Login to WordPress Admin** (yoursite.com/wp-admin)
3. **Navigate to** Appearance → Themes
4. **Click** "Add New" button at the top
5. **Click** "Upload Theme" button
6. **Click** "Choose File" and select the `cinemamaxpro.zip` file
7. **Click** "Install Now"
8. Wait for upload to complete
9. **Click** "Activate" button

### Option B: Upload via FTP

1. **Extract the ZIP file** on your computer
2. **Connect to your server** via FTP (using FileZilla, Cyberduck, etc.)
3. **Navigate to** `/wp-content/themes/`
4. **Upload the entire** `cinemamaxpro` folder
5. **Go to** WordPress Admin → Appearance → Themes
6. **Find** "CinemaMax Pro" and click "Activate"

---

## Part 2: Install Required Plugins

### 1. WooCommerce (Required for product pages)

1. Go to Plugins → Add New
2. Search for "WooCommerce"
3. Click "Install Now" → "Activate"
4. Complete the WooCommerce setup wizard

### 2. Contact Form Plugin (Required for contact page)

**Choose ONE:**

#### Option A: Contact Form 7 (Free, Simple)
1. Go to Plugins → Add New
2. Search for "Contact Form 7"
3. Click "Install Now" → "Activate"

#### Option B: WPForms (Free, Visual Builder)
1. Go to Plugins → Add New
2. Search for "WPForms"
3. Click "Install Now" → "Activate"

---

## Part 3: Configure Pages

### 1. Set Up Homepage (Landing Page)

The theme's landing page (`front-page.php`) automatically displays when you set a static homepage:

1. **Go to** Settings → Reading
2. **Select** "A static page" under "Your homepage displays"
3. **Homepage dropdown** → Select any page or create new page titled "Home"
4. **Click** "Save Changes"

The landing page with hero, benefits, and all sections will now appear automatically.

### 2. Create About Page

1. **Go to** Pages → Add New
2. **Title:** "About Us" (or "About")
3. **Page Attributes** (right sidebar) → Template → Select **"About Page"**
4. **Publish**

### 3. Create Contact Page

1. **Go to** Pages → Add New
2. **Title:** "Contact" (or "Contact Us")
3. **Page Attributes** (right sidebar) → Template → Select **"Contact Page"**
4. **Publish**

#### Add Contact Form (Important!)

After publishing, you need to add your contact form:

**If using Contact Form 7:**
1. Go to Contact → Contact Forms
2. Copy the shortcode (looks like `[contact-form-7 id="123"]`)
3. Edit your Contact page
4. Add the shortcode where you want the form
5. Update

**If using WPForms:**
1. Go to WPForms → Add New
2. Create your form
3. Copy the shortcode (looks like `[wpforms id="123"]`)
4. Edit your Contact page
5. Add the shortcode where you want the form
6. Update

---

## Part 4: WooCommerce Configuration

### 1. Complete WooCommerce Setup

After activating WooCommerce, complete the setup wizard:

1. **Store Details** - Enter your store location
2. **Industry** - Select "Electronics & Computers"
3. **Product Types** - Select "Physical products"
4. **Business Details** - Enter your info
5. **Theme** - Skip (you already have CinemaMax Pro)
6. **Complete** setup

### 2. Add Products

1. **Go to** Products → Add New
2. **Add product details:**
   - Product name
   - Description (use bullet points for benefits)
   - Short description
   - Price
   - Images (upload multiple for gallery)
   - Inventory
   - Attributes/Variations (if needed)
3. **Publish**

### 3. Product Page Template

The custom product page template (`woocommerce/single-product.php`) **automatically applies** to all products. No configuration needed!

### 4. Thank You Page

The custom thank you page **automatically applies** after checkout. No setup required!

---

## Part 5: Customize Theme Settings

### 1. Upload Logo

1. **Go to** Appearance → Customize → Site Identity
2. **Click** "Select logo"
3. **Upload** your logo image
4. **Adjust** size if needed
5. **Click** "Publish"

### 2. Set Contact Information

1. **Go to** Appearance → Customize → Contact Information
2. **Enter** support email
3. **Enter** WhatsApp number (with country code, e.g., +1234567890)
4. **Click** "Publish"

### 3. Create Menus

#### Primary Navigation (Top Menu)
1. **Go to** Appearance → Menus
2. **Create new menu** → Name: "Primary Menu"
3. **Add items:**
   - Home
   - Shop (WooCommerce shop page)
   - About
   - Contact
4. **Menu Settings** → Check "Primary Menu"
5. **Save Menu**

#### Footer Menu
1. **Create new menu** → Name: "Footer Menu"
2. **Add items:**
   - Privacy Policy
   - Terms of Service
   - Shipping Info
   - Returns
3. **Menu Settings** → Check "Footer Menu"
4. **Save Menu**

---

## Part 6: Test Your Site

### Test Checklist:

- [ ] Homepage loads correctly
- [ ] Product pages display properly
- [ ] About page is accessible
- [ ] Contact page shows form
- [ ] Add to cart works
- [ ] Checkout process works
- [ ] Thank you page displays after purchase
- [ ] Mobile responsive (test on phone)
- [ ] All images load
- [ ] Navigation menus work

---

## Troubleshooting

### Homepage doesn't show custom design
- Make sure Settings → Reading → "A static page" is selected
- Clear cache (if using caching plugin)
- Verify theme is activated

### Product page looks wrong
- Make sure WooCommerce is installed and activated
- Go to WooCommerce → Status → check for errors
- Verify product has images and price

### Contact form doesn't appear
- Make sure you added the contact form shortcode to the Contact page
- Verify Contact Form 7 or WPForms is installed

### Images missing
- Check `/assets/images/` folder exists
- Replace placeholder images with your own
- Use proper image paths in Customizer

### Styles look broken
- Go to Appearance → Themes → verify CinemaMax Pro is active
- Check `/assets/css/main.css` file exists
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

## Next Steps

### 1. Add Your Content
- Replace placeholder images
- Add real product descriptions
- Update About page with your brand story
- Add your actual contact information

### 2. SEO Setup
- Install Yoast SEO or Rank Math plugin
- Add meta descriptions to pages
- Submit sitemap to Google Search Console

### 3. Analytics
- Install Google Analytics
- Set up conversion tracking
- Monitor user behavior

### 4. Performance
- Install caching plugin (WP Rocket, W3 Total Cache)
- Optimize images (use WebP format)
- Enable CDN if available

---

## Support

If you encounter issues during installation:

1. Check WordPress.org support forums
2. Review WooCommerce documentation
3. Contact theme support (if purchased with support)

---

## Quick Reference

**Theme Files:**
- Landing: `front-page.php`
- Product: `woocommerce/single-product.php`
- About: `page-about.php`
- Contact: `page-contact.php`
- Thank You: `woocommerce/checkout/thankyou.php`

**Styles:** `/assets/css/main.css`
**Scripts:** `/assets/js/main.js`

**Theme Name:** CinemaMax Pro
**Version:** 1.0.0
**Min WordPress:** 6.0
**Min PHP:** 7.4
