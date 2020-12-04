import changeNick from "../commands/changeNick";
import Logger from "../util/logger";

const MessageController = (message, client) => {
	const commandMap = {
		changeNick,
	};

	const sendHelpMessage = (channel) => {
		const message = `You were trying to call a command from my palette. Yet you were unable to do so correctly. 
		Currently supported commands are: 
		changeNick: @user_you_want_to_change_nick_for new_nick (changes another edgelords nickname)
		changeNick: new_nick (changes your nickname)`;
		client.channels.cache.get(channel).send(message);
	};

	const sendErrorMessage = (err, channel) => {
		const message = `I encountered an error when executing you command! ${err}`;
		client.channel.cache.get(channel).send(message);
	};

	let messageParts;
	if (message.content.includes("'")) {
		const quotedPart = message.content.split("'");
		messageParts = quotedPart[0].split(" ");
		messageParts.push(quotedPart[1]);
		messageParts = messageParts.filter(x => x !== '');
	} else {
		messageParts = message.content.split(" ");
	}
	messageParts.splice(0, 1);
	const command = messageParts.shift();
	messageParts.push(message);
	if (commandMap[command]) {
		commandMap[command](messageParts).catch(err => {
			Logger.error("There was an error when executing a command!", err);
			sendErrorMessage(err, message.channel.id);
		});
	} else {
		sendHelpMessage(message.channel.id);
	}
};
export default MessageController;
