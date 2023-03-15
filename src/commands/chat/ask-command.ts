import { ChatInputCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/index.js';
import { EventData } from '../../models/internal-models.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const chatGPTMessage: any = fetch('https://shatteredsky.net/api/openai', {
		method: 'POST',
		body: JSON.stringify({
			messages: messages,
		}),
	});

	const replyMessage = await chatGPTMessage;
	// Add the GPT-3 response to the messages array.
    messages = [
        ...messages,
        { role: 'assistant', content: replyMessage },
    ];

    return replyMessage;

};

export class AskCommand implements Command {
    public names = [Lang.getRef('chatCommands.ask', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction, data: EventData): Promise<void> {

        // const response = await chat(intr.options.getString('question', true));


        await InteractionUtils.send(intr, Lang.getEmbed('displayEmbeds.ask', data.lang));
    }
}
