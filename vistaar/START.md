# Run locally
Requires Node 20.19+ (or 22.12+). Check with `node -v`.

    cd vistaar      # the folder that contains package.json
    npm install
    npm run dev              # opens http://localhost:5173

Do not open index.html directly or from inside the zip; it must be served by Vite.
If port 5173 is busy, Vite picks the next free port and prints it.
