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
		{ role: 'system', content: 'Shattered Sky is a community for hosting services online.'},
		{ role: 'system', content: 'You are embedded on the Shattered Sky Discord as a chat bot.'},
		{ role: 'system', content: 'You answer questions for users. You try to be as brief as possible.'},
	] as ChatMessage[];
	messages = [
		...messages,
		{ role: 'user', content: question },
	];
	const chatGPTMessage = fetch('https://shatteredsky.net/api/openai', {
		method: 'POST',
		body: JSON.stringify({
			messages: messages,
		}),
	});
	const replyMessage = await (await chatGPTMessage).text();
	messages = [
		...messages,
		{ role: 'assistant', content: replyMessage },
	];
	const replyText = JSON.parse(replyMessage).content;
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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await msg.channel.sendTyping();
		const question = msg.content.replace('Teqbot, ', '');
		const reply = await chat(question);
		await msg.reply(reply);
	}	
}
