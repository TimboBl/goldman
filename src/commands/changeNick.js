const changeNick = (params) => {
	const contents = {};
	if (params.length === 3) {
		contents.userId = params[0];
		contents.newNick = params[1];
		contents.message = params[2];
	} else {
		contents.newNick = params[0];
		contents.message = params[1];
	}
	const {userId, newNick, message} = contents;
	if (userId) {
		return message.guild.members.fetch(userId.slice(2, -1).replace("!", "").replace("&", "")).then(member => member.setNickname(newNick));
	} else {
		return message.guild.members.fetch(message.author.id).then(author => author.setNickname(newNick));
	}

};

export default changeNick;
