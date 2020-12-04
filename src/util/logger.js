import * as winston from "winston";
import { LOG_LEVEL } from "../config/constants";

const Logger = (() => {
	const logger = winston.createLogger({
		level: LOG_LEVEL,
		format: winston.format.combine(
			//winston.format.colorize(),
			winston.format.timestamp(),
			winston.format.align(),
			winston.format.json(),
			winston.format.metadata(),
			winston.format.prettyPrint(),
		),
		transports: [new winston.transports.Console()],
	});

	if (process.env.NODE_ENV === "production") {
		logger.add(new winston.transports.File({filename: 'error.log', level: 'error'}));
		logger.add(new winston.transports.File({filename: 'combined.log'}));
	}

	return logger;
})();

export default Logger;
