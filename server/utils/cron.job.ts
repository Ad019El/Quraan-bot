import cron from "node-cron";
import { broadcastVerse } from "../bot/commands/quran";
import bot from "../bot";

cron.schedule("0 8,12,20 * * *", () => broadcastVerse(bot));
cron.schedule("30 14 * * *", () => broadcastVerse(bot));
