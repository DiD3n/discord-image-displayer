import { Client } from 'discord.js';

import { bot as config } from '../config.json';
import { wsBroadcast } from "../app/helpers/wsBroadcast";

const client = new Client();

client.login(config.token)
    .then(() => {
        console.log(`Login in as ${client.user.tag}`);
    })
    .catch( error => {
        console.error(`Failed to login`, error);
    });


client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.id !== config.channel) return;

    let url: string;

    if (message.content.match(/^https?:\/\/[^ ]+\.(png|jpe?g|gif|webp)[^ ]*$/)) {
        url = message.content;
    } else {
        const attachments = message.attachments.array();
        if (attachments.length === 0) {
            await message.react(`😠`);
            await message.reply('Please attach an image (or image url)!');
            return;
        }
        url = attachments[0].proxyURL;
    }

    if (url) {
        wsBroadcast({
            type: 'image',
            url: url
        });
        await message.react(`👍`);
    }
});

client.on('error', console.error)
