import {Message} from 'discord.js';
import fetch from 'node-fetch';

import {Trigger} from './trigger.js';

const chat = async (question: string): Promise<string> => {
	try {
	interface ChatMessage {
		role: 'assistant' | 'loading' | 'system' | 'user';
		content: string;
		image?: string;
	}	
	let messages = [
		{ role: 'system', content: 'You are embedded in a Discord chat bot so that users contact you by DM or on the Shattered Sky guild.'},
	] as ChatMessage[];
	messages = [
		...messages,
		{ role: 'user', content: question },
	];
	const chatGPTMessage = fetch('https://shatteredsky.net/api/openai', {
		method: 'POST',
		body: JSON.stringify({
			messages: messages,
			requestType: 'chatCompletion',
		}),
	});
	const replyText = await chatGPTMessage as any as string;
	messages = [
		...messages,
		{ role: 'assistant', content: replyText },
	];
	return replyText;
	} catch (err) {
		console.error(err);
		const noAnswer = 'An error occurred while trying to chat with you.';
		return noAnswer;
	}
};

export class AskTrigger implements Trigger {
	public requireGuild = false;
	public triggered(msg: Message): boolean {
		return msg.content.includes('Teqbot, ');
	}
	public async execute(msg: Message): Promise<void> {
		let waiting = true;
		// Every 5 seconds, send the typing indicator
		const typingInterval = setInterval(() => {
			if (waiting) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				msg.channel.sendTyping();
			} else {
				clearInterval(typingInterval);
			}
		}, 5000);
		const question = msg.content.replace('Teqbot, ', '');
		const reply = await chat(question);
		await msg.reply(reply);
		waiting = false;
	}	
}
