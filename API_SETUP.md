# API Configuration Reference

## **Local Development Setup**

File: `.env.local` (on your machine)

```env
# Backend running on localhost
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Test:**
```bash
npm run dev
# Visit http://localhost:3000
```

---

## **Hostinger Production Setup**

File: `.env.local` (on Hostinger server)

### **Option 1: Backend on Different Domain**
```env
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### **Option 2: Backend Same Domain (Recommended)**
```env
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## **How Next.js Proxy Works**

**next.config.mjs এ:**
```javascript
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

**What happens:**
1. Frontend makes request to `/api/users`
2. Next.js intercepts and forwards to `NEXT_PUBLIC_API_BASE_URL/api/users`
3. Response sent back to frontend
4. **Benefit:** No CORS issues! ✅

---

## **API Endpoints (from app/config/api.js)**

All endpoints use `NEXT_PUBLIC_API_BASE_URL` as base:

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/register`

### Services
- `GET /api/services` - Get all
- `GET /api/services/{slug}` - Get single
- `POST /api/services/add`
- `PUT /api/services/update/{id}`

### Case Studies
- `GET /api/case-studies`
- `GET /api/case-studies/{slug}`

### Blogs
- `GET /api/blogs`
- `GET /api/blogs/{slug}`

### Theme Settings
- `GET /api/site/settings`

---

## **Testing API Connection**

### Browser Console
```javascript
// Test if API is accessible
fetch('/api/services')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('API Error:', err))
```

### Check Environment Variable
```javascript
// In any component
console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
```

---

## **Common Mistakes to Avoid**

❌ Committing `.env.local` to Git  
✅ Only commit `.env.example`

❌ Using hardcoded API URLs  
✅ Always use environment variables

❌ CORS errors with external API  
✅ Use Next.js rewrites (proxy)

❌ Forgetting to rebuild after env changes  
✅ `npm run build` after `.env` changes

---

## **Debugging**

### API calls not working in production?

1. Check `.env.local` on Hostinger server:
```bash
cat .env.local
```

2. Check Next.js build includes env:
```bash
npm run build
# Look for build output mentioning env vars
```

3. Check if `.next/` folder has your env values:
```bash
grep "NEXT_PUBLIC_API_BASE_URL" .next/server/pages/_document.js
```

4. Restart PM2:
```bash
pm2 restart hansi-trans
pm2 logs hansi-trans
```

---

**প্রশ্ন থাকলে জানাবেন! 🚀**
