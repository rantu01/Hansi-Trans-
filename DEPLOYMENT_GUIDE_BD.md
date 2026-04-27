# 🚀 Hostinger এ Next.js Deploy করার সম্পূর্ণ গাইড

## **কী কী আমরা সেটআপ করেছি?**

### 1. **Middleware.js - এটা কী?**
```javascript
// এটা একটি "গেটকিপার" যা সকল requests এ প্রথমে চেক করে
// Admin page এ access এর আগে token verify করে
```
✅ **কাজ:** Authentication protection  
❌ **এটা proxy নয়** - এটা শুধু security check করে

### 2. **Proxy কী? (যেটা আপনার বন্ধু বলেছে)**
```javascript
// next.config.mjs এর rewrites ব্যবহার করে API proxy করা হয়
async rewrites() {
  return {
    beforeFiles: [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
      },
    ],
  };
}
```

**Proxy মানে:** 
- Frontend `/api/users` কে call করলে
- Backend `http://your-api.com/api/users` এ forward হয়
- এটা CORS সমস্যা সমাধান করে

---

## **Hostinger এ Deploy করার পদক্ষেপ:**

### **Step 1: GitHub এ Push করুন**
```bash
# ১. Local তে সব commit করুন
git add .
git commit -m "Deploy setup for Hostinger"
git push origin main
```

**⚠️ গুরুত্বপূর্ণ: .env.local কখনও commit করবেন না!**
- `.gitignore` ইতিমধ্যে সেটা handle করছে

### **Step 2: Hostinger এ Node.js Environment Setup**

**Hostinger এ যা করতে হবে:**
1. ✅ cPanel/hPanel open করুন
2. ✅ **Node.js & NPM** section খুঁজুন
3. ✅ **Node.js Version:** `20.x` বা তার চেয়ে নতুন
4. ✅ **Package Manager:** npm (default)

### **Step 3: GitHub থেকে Clone করুন (Hostinger Server এ)**

**SSH Access এর মাধ্যমে:**
```bash
# Hostinger server এ login করুন
ssh username@your-server-ip

# Project folder এ যান
cd /home/username/public_html  # অথবা যেখানে আপনি রাখতে চান

# Repository clone করুন
git clone https://github.com/your-username/Hansi-Trans-dev.git
cd frontend
```

### **Step 4: Environment Variables Setup (Hostinger)**

**Hostinger server এ:**
```bash
# .env.local ফাইল তৈরি করুন
nano .env.local
```

**এতে লিখুন:**
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com
```

**Save করুন:** Ctrl+X, Y, Enter

### **Step 5: Dependencies Install করুন**

```bash
# npm install করুন
npm install

# Build করুন
npm run build
```

### **Step 6: PM2 দিয়ে Application Start করুন**

**Hostinger এ PM2 setup:**
```bash
# PM2 globally install করুন
npm install -g pm2

# Application start করুন
pm2 start npm --name "hansi-trans" -- start

# Startup এ auto start করতে
pm2 startup
pm2 save
```

### **Step 7: Reverse Proxy Setup (Apache/Nginx)**

**Hostinger এ cPanel এ:**
1. ✅ Addon Domains খুলুন
2. ✅ Domain select করুন
3. ✅ Document Root: `/home/username/public_html/frontend`

**Apache Configuration (.htaccess):**

`.htaccess` ফাইল তৈর করুন frontend folder এ:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
  ProxyPreserveHost On
  ProxyPassReverse / http://localhost:3000/
</IfModule>
```

---

## **API Connection সেটআপ**

### **Local Development:**
```
.env.local:
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### **Hostinger Production:**
```
.env.local (server এ):
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com
```

**নোট:** Backend API এবং Frontend একই Hostinger account এ থাকলে:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-domain.com/api
```

---

## **Middleware.js ব্যাখ্যা**

```javascript
export function middleware(request) {
  // প্রতিটি request এ এটা চলে
  
  const pathname = request.nextUrl.pathname;
  const adminToken = request.cookies.get("adminToken")?.value;

  // যদি /admin path এবং token নেই
  if (pathname.startsWith("/admin") && !adminToken) {
    // login page এ রিডাইরেক্ট করো
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // সবকিছু ঠিক থাকলে এগিয়ে যাও
  return NextResponse.next();
}
```

**এটা কি করে:**
✅ Admin page protected  
✅ Unauthorized access block  
✅ Login page এ redirect  

---

## **Common Issues এবং সমাধান**

### **Issue 1: API Connection Error**
```
Error: Cannot connect to API
```
**সমাধান:**
- `.env.local` এ সঠিক API URL আছে কি চেক করুন
- CORS enabled আছে কি backend এ check করুন

### **Issue 2: PM2 Process Not Running**
```bash
# Status check করুন
pm2 list

# Logs দেখুন
pm2 logs hansi-trans

# Restart করুন
pm2 restart hansi-trans
```

### **Issue 3: Build Failure**
```bash
# Cache clear করুন
rm -rf .next node_modules

# পুনরায় install এবং build করুন
npm install
npm run build
```

---

## **GitHub থেকে Updates Pull করা**

**Production এ নতুন code আনতে:**
```bash
# Server এ SSH login
ssh username@server-ip

# Project folder এ যান
cd ~/public_html/frontend

# Latest code pull করুন
git pull origin main

# নতুন dependencies থাকলে
npm install

# Rebuild করুন
npm run build

# PM2 restart করুন
pm2 restart hansi-trans
```

---

## **Security Checklist**

- ✅ `.env.local` কখনও git এ commit না করা
- ✅ Admin token securely store করা
- ✅ API endpoints HTTPS এ থাকা
- ✅ CORS properly configured
- ✅ Environment variables server এ set করা

---

## **Monitoring**

```bash
# Log দেখতে
pm2 logs hansi-trans --lines 100

# Real-time monitoring
pm2 monit

# CPU/Memory usage
pm2 status
```

---

**কোনো প্রশ্ন থাকলে যোগাযোগ করুন! 🚀**
