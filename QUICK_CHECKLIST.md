# 📋 Hostinger Deploy করার Quick Checklist

## **Pre-Deployment (Local এ)**

- [ ] সকল code commit করেছি
- [ ] `.env.local` add করেছি local এ
- [ ] `.gitignore` এ `.env.local` আছে
- [ ] `npm run build` successfully run হয়েছে
- [ ] Local development test করেছি (`npm run dev`)

---

## **GitHub Repository**

- [ ] Code GitHub এ push করেছি
- [ ] `.env.example` file আছে
- [ ] Sensitive data commit হয়নি
- [ ] README.md update করেছি (optional)

---

## **Hostinger Server Setup**

### Node.js Setup
- [ ] Node.js 20.x+ installed
- [ ] npm installed
- [ ] GitHub SSH key added

### Project Files
- [ ] Repository cloned
- [ ] `.env.local` manually created in server
- [ ] `npm install` completed
- [ ] `npm run build` successful
- [ ] No build errors

### Process Manager (PM2)
- [ ] PM2 globally installed
- [ ] Application started with PM2
- [ ] Startup enabled (`pm2 startup`)
- [ ] Logs accessible (`pm2 logs`)

### Web Server Configuration
- [ ] Reverse proxy configured (.htaccess/nginx)
- [ ] Domain pointing to localhost:3000
- [ ] SSL certificate enabled (HTTPS)

---

## **Testing & Verification**

- [ ] Frontend accessible via domain
- [ ] API calls working (check browser console)
- [ ] Admin login working
- [ ] Middleware redirect working
- [ ] Images loading correctly
- [ ] No CORS errors

---

## **Monitoring**

```bash
# Regular checks
pm2 status
pm2 logs hansi-trans --lines 50
pm2 monit
```

---

## **Troubleshooting**

| Issue | Solution |
|-------|----------|
| API not connecting | Check `.env.local` URLs |
| Port 3000 already in use | `pm2 restart hansi-trans` or change port |
| Build failed | `rm -rf .next node_modules && npm install && npm run build` |
| Changes not reflecting | `git pull && npm install && npm run build && pm2 restart hansi-trans` |
| Middleware not working | Check `app/` folder structure |

---

## **Update Workflow**

```bash
# Server এ নতুন code pull করতে
cd ~/public_html/frontend
git pull origin main
npm install
npm run build
pm2 restart hansi-trans
```

---

**Version:** v1.0  
**Last Updated:** 2024
