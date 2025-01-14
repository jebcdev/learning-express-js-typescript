import "dotenv/config";
import { app } from "./server";

const PORT: number = parseInt(process.env.PORT as string) || 4000;
const GLOBAL_PREFIX: string = process.env.GLOBAL_PREFIX || "/api/v1";


app.listen(PORT, () => {
    console.log(
        `Server is running on http://localhost:${PORT}${GLOBAL_PREFIX}`
    );
});
