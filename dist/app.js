"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = require("./server");
const PORT = parseInt(process.env.PORT) || 4000;
const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX || "/api/v1";
server_1.app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${GLOBAL_PREFIX}`);
});
