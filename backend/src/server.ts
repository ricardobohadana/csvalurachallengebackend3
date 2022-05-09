import { app, PORT } from "./app";

app.listen(PORT || 3333, () => console.log("API is online"));
