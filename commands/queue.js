/* eslint-disable linebreak-style */
/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

//init currentQ dictionary
var currentQ = {};
exports.run = (client, message, args, level) => {
  //if no arguments are added after the command, add them to the queue
  if (!args[0]) {
    joinQ(message);
  } else {
    if (args[0] === "show") {
      if (Object.keys(currentQ).length === 0) {
        message.channel.send("The queue is empty!");
      } else {
        message.channel.send("Current queue: " + getUsernames());
      }
    } else if (args[0] === "join") {
      joinQ(message);
    } else if (args[0] === "leave") {
      try {
        delete currentQ[message.author];
        message.channel.send("You have been removed from the queue.");
      }
      catch (error) {
        message.channel.send("You weren't in the queue, you silly goose!");
      }
    }
  }
};

function getUsernames() {
  let usernames = "";
  for (const key in currentQ) {
    usernames += currentQ[key] + ", ";
  }
  return usernames;
}

function getUsers() {
  let users = "";
  for (const key in currentQ) {
    users += key + ", ";
  }
  return users;
}

function joinQ(message) {
  currentQ[message.author] = message.author.username;
  switch (Object.keys(currentQ).length) {
    case 1:
      //create a new queue since this is the first person in the queue
      message.channel.send("New queue started! You're first in line!");
      break;
    case 4:
      //queue is now full and ready to start!
      message.channel.send("Let's get ready to rumble!");
      message.channel.send(getUsers());
      currentQ = {};
      break;
    default:
      //if the queue is 2 or 3, add them to queue and show the current queue
      message.channel.send("You have joined the queue!\n\nCurrent queue: " + getUsernames());
      break;
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["q"],
  permLevel: "User"
};

exports.help = {
  name: "queue",
  category: "System",
  description: "Enters the current 4mans queue, or starts a new one if there is not a queue currently",
  usage: "queue"
};
