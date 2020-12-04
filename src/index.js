import * as Discord from "discord.js";
import Logger from "./util/logger";
import { TOKEN } from "./config/constants";
import MessageController from "./controller/messageController";
let client;

const startBot = () => {
	client = new Discord.Client();

	client.login(TOKEN);

	client.on("ready", () => {
		Logger.info(`Logged in as ${client.user.tag}`);
	});

	client.on("message", msg => {
		if (msg.content.startsWith("!jaxs") && msg.channel.isText) {
			MessageController(msg, client);
		}
	});

};

process.on('SIGTERM', () => {
	Logger.info("SIGTERM received. Shutting down.")
	client.destroy();
});
process.on('SIGINT', () => {
	Logger.info("SIGINT received. Shutting down.");
	client.destroy();
});

startBot();
