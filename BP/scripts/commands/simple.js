	import { world, system } from "@minecraft/server";

let overworld;

system.run(() => {
    overworld = world.getDimension("overworld");
});


export function helpCmd({ sender, cmd, cmdList }) {
    if (cmd == "help" || cmd == "h" || cmd == "?")
        system.run(() => {
            sender.runCommand("say e");
            sender.runCommand("tellraw @s {\"rawtext\":[{\"text\":\"§2-------Main Command list-------\"}]}");
            for (let i = 0; i < cmdList.length; i++) {
                var n;
                if (i < 9)
                    n = (i + 1) + "-";
                else n = i + 1;
                sender.runCommand("tellraw @s {\"rawtext\":[{\"text\":\"§7" + n + "> §r" + cmdList[i] + "\"}]}");
            }
        });
}

export function posCmd({ sender, cmd, number, cmdSelections, selScoreObj }) {
    if (cmd == "pos")
        system.run(() => {
            if (number == "1") {
                selScoreObj.x1.setScore(sender, Math.floor(sender.location.x));
                selScoreObj.y1.setScore(sender, Math.floor(sender.location.y));
                selScoreObj.z1.setScore(sender, Math.floor(sender.location.z));
                system.run(() => {
                    sender.runCommand("tellraw @p {\"rawtext\":[{\"text\":\"Position 1 set to §d" + cmdSelections.x1 + ", " + cmdSelections.y1 + ", " + cmdSelections.z1 + "\"}]}");
                    sender.runCommand("playsound block.scaffolding.hit @a " + cmdSelections.x1 + " " + cmdSelections.y1 + " " + cmdSelections.z1);
                });
            }
            else if (number == "2") {
                selScoreObj.x2.setScore(sender, Math.floor(sender.location.x));
                selScoreObj.y2.setScore(sender, Math.floor(sender.location.y));
                selScoreObj.z2.setScore(sender, Math.floor(sender.location.z));
                system.run(() => {
                    sender.runCommand("tellraw @p {\"rawtext\":[{\"text\":\"Position 2 set to §b" + cmdSelections.x2 + ", " + cmdSelections.y2 + ", " + cmdSelections.z2 + "\"}]}");
                    sender.runCommand("playsound block.scaffolding.break @a " + cmdSelections.x2 + " " + cmdSelections.y2 + " " + cmdSelections.z2);
                });
            }
        });
}

export function gamemodeCmd({ sender, cmd }) {
    system.run(() => {
        switch (cmd) {
            case "c":
                sender.setGameMode("Creative");
                break;
            case "sp":
                sender.setGameMode("Spectator");
                break;
            case "s":
                sender.setGameMode("Survival");
                break;
            case "a":
                sender.setGameMode("Adventure");
                break;
        }
    });
}

export function disCmd({ cmd, cmdSelections }) {
    if (cmd == "dis" || cmd == "distance")
        world.sendMessage("Distance: §e" + Math.sqrt(Math.pow(cmdSelections.x2 - cmdSelections.x1, 2) + Math.pow(cmdSelections.y2 - cmdSelections.y1, 2) + Math.pow(cmdSelections.z2 - cmdSelections.z1, 2)));
}

export function ageCmd({ cmd }) {
    if (cmd == "age")
        world.sendMessage("Current tick: §b" + system.currentTick);
}