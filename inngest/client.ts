// inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({ 
  id: "aether-careers",
  // This tells the SDK exactly where to look for the dev server
  baseUrl: "http://127.0.0.1:8288/v1" 
});