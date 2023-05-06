import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const URI =
  "mongodb+srv://lautydp:lautydp@cluster0.mbl12o1.mongodb.net/ecommerce?retryWrites=true&w=majority";
