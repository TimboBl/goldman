import * as Discord from "discord.js";
import Logger from "./util/logger";
import { TOKEN } from "./config/constants";
import MessageController from "./controller/messageController";

const startBot = () => {
	const client = new Discord.Client();

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

startBot();
