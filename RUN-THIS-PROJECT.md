# AI DevOps Architecture Generator – run this project only

**Project root:** `D:\cursor project`  
(Contains: frontend/, backend/, docker-compose.yml)

**Folder structure:**
```
D:\cursor project\
  backend/
  frontend/
  docker-compose.yml
  .env
  README.md
```

---

## 1. Stop other servers and free ports

In PowerShell (Run as Administrator if ports are in use):

```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

---

## 2. Open project root

```powershell
cd "D:\cursor project"
```

(There is no `ai-devops-architecture-generator` folder; this project lives at `D:\cursor project`.)

---

## 3. Start backend (Terminal 1)

```powershell
cd "D:\cursor project\backend"
npm install
npm run dev
```

Leave this running. Backend: http://localhost:4000

---

## 4. Start frontend (Terminal 2)

```powershell
cd "D:\cursor project\frontend"
npm install
npm run dev
```

Leave this running. Frontend: http://localhost:5173

---

## 5. Open the app

In the browser go to: **http://localhost:5173**

Tab title must be: **AI DevOps Architecture Generator**

---

## If the wrong project appears

- Confirm you ran `npm run dev` from `D:\cursor project\frontend`, not from another folder.
- Close all other terminals that run Vite or `npm run dev`.
- Run the “Stop other servers” step, then start again from step 3 and 4.
