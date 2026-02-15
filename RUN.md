# Reinstall and run

## Frontend

```powershell
cd "D:\cursor project\frontend"
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
````

Open: http://localhost:5173

## Backend (separate terminal)

```powershell
cd "D:\cursor project\backend"
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm run build
npm run start
```

Backend: http://localhost:4000  
Health: http://localhost:4000/health

## Optional .env

- Frontend: copy `frontend\.env.example` to `frontend\.env`, set `VITE_API_BASE_URL=http://localhost:4000/api`, restart dev.
- Backend: create `backend\.env` with `PORT=4000` if needed.
