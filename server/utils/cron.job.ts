import cron from "node-cron";
import { broadcastVerse } from "../bot/commands/quran";
import bot from "../bot";

cron.schedule("0 7,11,19 * * *", () => broadcastVerse(bot));
// cron.schedule("30 14 * * *", () => broadcastVerse(bot));
