import { app } from "./app";
import { getServerEnv } from "./env";

const { PORT } = getServerEnv();
app.listen(PORT, () => {
  console.log(`TDTS API listening on http://localhost:${PORT}`);
});
