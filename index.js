const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ">";
const ytdl = require('ytdl-core');
const sounds = ["discord-ping","fbi_openup","microwave_earrape","cs_punch_earrape","nyan-cat","bruh","oh-no_troll_laugh","hamburger_earrape","bass-boost_earrape","earrape_bruh","nani_full","squish_that_cat","yeet_earrape","cricket","nope","suspense","quack","no","baby_scream","earrape_scream","winxp_error"];
require('dotenv').config();
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
function between(min, max) {return Math.floor(Math.random() * (max - min) + min)}
function newStatus() {
var statusIndex = between(0,3);
if (statusIndex===0) {client.user.setActivity('sounds | >help', { type: 'PLAYING' });}
if (statusIndex===1) {client.user.setActivity('pranks | >help', { type: 'WATCHING' });}
if (statusIndex===2) {client.user.setActivity(`${client.users.cache.size} listeners | >help`, { type: 'WATCHING' });}
if (statusIndex===3) {client.user.setActivity(`${client.guilds.cache.size} server(s) | >help`, { type: 'WATCHING' });}}
client.once('ready', () => {
console.log('Ready!');
console.log(`${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds detected`);
newStatus();
setInterval(function(){newStatus();},10000);
});
client.on("guildCreate", guild => {
console.log(`Joined to: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
const user = client.users.cache.get('718828195230515291');
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(":inbox_tray: | I've joined a server!")
.setDescription("Someone invited me to a server!")
.addField("Server name",guild.name)
.addField("Server ID",guild.id)
.addField("Server member count",guild.memberCount)
user.send(embed);
});
client.on("guildDelete", guild => {
console.log(`Removed from: ${guild.name} (id: ${guild.id})`);
const user = client.users.cache.get('718828195230515291');
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(":ioutbox_tray: | I've leaved a server!")
.setDescription("Someone made me to quit a server...")
.addField("Server name",guild.name)
.addField("Server ID",guild.id)
user.send(embed);
});
client.on('message', async message =>{
if (message.content.startsWith(prefix)===true) {
var command = message.content.substring(prefix.length,message.content.length);
var args = command.split(" ");
if (command.startsWith("help")===true) {
const embed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Help | Prefix: >')
.setDescription("Here's a list of commands that you can use.\r\nTo use soundboard, type `>sb ` and a sound that you would like to play in a voice channel.")
.addFields(
{name:":passport_control: | Support server",value:"https://discord.gg/c3aeNWm"},
{name:":tools: | Info & Tools",value:"help"},
{name:":musical_note: | Music",value:"play, stop"},
{name:":musical_keyboard: | Soundboard (sb)",value: sounds})
.setFooter("Muzikal | Help");
message.channel.send(embed);
}
if (command.startsWith("play")===true) {
if (args[1] !== undefined){
if (args[1].startsWith("http") === true) {
if (message.channel.type !== 'text') return;
const voiceChannel = message.member.voice.channel;
if (!voiceChannel) {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':musical_note: | Error')
.setDescription("You should join a voice channel before playing music!\rYou won't hear your music then!")
return message.channel.send(embed);
}
voiceChannel.join().then(connection => {
const stream = ytdl(args[1], { filter: 'audioonly' });
const dispatcher = connection.play(stream);
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':musical_note: | Music')
.setDescription('Music started at <#'+voiceChannel+'>')
.addField("Song URL/link", args[1])
.addField("Music started by", message.author)
message.channel.send(embed);
dispatcher.on('finish', () => voiceChannel.leave());
});
} else {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':musical_note: | Invalid link')
.setDescription('Please, enter a valid URL link')
message.channel.send(embed);
}
 }else {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':musical_note: | Invalid arguments')
.setDescription('Please, provide a valid link (URL)')
message.channel.send(embed);
}} else if (command.startsWith('stop') === true) {
 const voiceChannel = message.member.voice.channel;
if (!voiceChannel) {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':musical_note: | Error')
.setDescription("<@"+message.author.id+">You should join the music channel where you want to stop the music")
message.channel.send(embed);
}
 voiceChannel.leave();
 var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':musical_note: | Music')
.setDescription('Music stopped in <#'+voiceChannel+'>')
.addField("Music stopped by", message.author)
message.channel.send(embed);
}
if (command.startsWith("sb ")===true) {
message.channel.bulkDelete(1,true);
const voiceChannel = message.member.voice.channel;
var soundName = command.substring(3,command.length);
if (!voiceChannel) {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':musical_note: | Error')
.setDescription("Please, join a voice channel before ")
message.channel.send(embed);
} else {
if (sounds.includes(soundName)===true) {const connection = await voiceChannel.join();setTimeout(function(){var dispatcher=connection.play(soundName+".mp3");dispatcher.on('finish',()=>{voiceChannel.leave();});}, 5000);}
else {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':x: | Error')
.setDescription("That sound name does not exist, please type >help to get a list of commands.")
message.channel.send(embed);}
}}}});
client.login(process.env.TOKEN);