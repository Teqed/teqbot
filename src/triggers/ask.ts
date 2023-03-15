import {Message} from 'discord.js';

import {Trigger} from './trigger.js';

const chat = async (question: string): Promise<string> => {

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
	
	// Add the user's message to the messages array.
	messages = [
		...messages,
		{ role: 'user', content: question },
	];
	
		// const chatGPTMessage: any = $fetch('/api/openai', {
			const chatGPTMessage = fetch('https://shatteredsky.net/api/openai', {
			method: 'POST',
			body: JSON.stringify({
				messages: messages,
			}),
		});

		const replyMessage = await (await chatGPTMessage).text();


		// Add the GPT-3 response to the messages array.
		messages = [
			...messages,
			{ role: 'assistant', content: replyMessage },
		];

		// Convert from this format to just the reply message.
		// {"role":"assistant","content":"Here is a brief recipe for pie crust:\n\nIngredients:\n- 2 and 1/2 cups all-purpose flour\n- 1 tsp. salt\n- 1 tsp. granulated sugar\n- 1 cup unsalted butter (cold and cubed)\n- 1/4 to 1/2 cup ice water\n\nInstructions:\n1. In a mixing bowl, combine the flour, salt, and sugar.\n2. Add in the cold, cubed butter and mix until the butter pieces are pea-sized.\n3. Gradually add in the ice water, mixing until the dough just comes together.\n4. Form the dough into a round, flat disc and wrap in plastic wrap. Chill for at least one hour before using.\n\nFor the pie filling and baking instructions, you can find a wide variety of recipes online depending on what type of pie you'd like to make."}

		const replyText = JSON.parse(replyMessage).content;
	
		return replyText;
	
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
