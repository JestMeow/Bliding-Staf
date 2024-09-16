console.warn("Working...");

import { world, system } from "@minecraft/server";
import * as fun from "./functions.js";

let overworld = world.getDimension("overworld");
let entities = overworld.getEntities();

let sel1 = [];
let sel2 = [];

const selTool = "Selecc";
/*let playerID = world.scoreboard.getObjective("playerid");
if (!playerID) {
    world.scoreboard.addObjective("playerid");
}*/
function selBox() {
    var c = [], d = [];
    d[0] = Math.sign(sel2[0] - sel1[0] + 0.1);
    d[1] = Math.sign(sel2[1] - sel1[1] - 0.1);
    d[2] = Math.sign(sel2[2] - sel1[2] - 0.1);
    c[0] = 0.01;
    c[1] = 0.01;
    c[2] = 0.01;
    if (sel1[0] > sel2[0])
        c[0] = 1.01;
    if (sel1[1] < sel2[1])
        c[1] = 1.01;
    if (sel1[2] < sel2[2])
        c[2] = 1.01;
    overworld.runCommand("particle minecraft:endrod " + (sel1[0] + c[0]) + " " + (sel1[1] + c[1] - d[1]) + " " + (sel1[2] + c[2] - d[2]));
    overworld.runCommand("particle minecraft:endrod " + (sel1[0] + c[0]) + " " + (sel2[1] + c[1]) + " " + (sel1[2] + c[2] - d[2]));
    overworld.runCommand("particle minecraft:endrod " + (sel1[0] + c[0]) + " " + (sel1[1] + c[1] - d[1]) + " " + (sel2[2] + c[2]));
    overworld.runCommand("particle minecraft:endrod " + (sel1[0] + c[0]) + " " + (sel2[1] + c[1]) + " " + (sel2[2] + c[2]));
    overworld.runCommand("particle minecraft:endrod " + (sel2[0] + c[0] + d[0]) + " " + (sel1[1] + c[1] - d[1]) + " " + (sel1[2] + c[2] - d[2]));
    overworld.runCommand("particle minecraft:endrod " + (sel2[0] + c[0] + d[0]) + " " + (sel2[1] + c[1]) + " " + (sel1[2] + c[2] - d[2]));
    overworld.runCommand("particle minecraft:endrod " + (sel2[0] + c[0] + d[0]) + " " + (sel1[1] + c[1] - d[1]) + " " + (sel2[2] + c[2]));
    overworld.runCommand("particle minecraft:endrod " + (sel2[0] + c[0] + d[0]) + " " + (sel2[1] + c[1]) + " " + (sel2[2] + c[2]));
}

system.runInterval(() => {
    overworld = world.getDimension("overworld");
    entities = overworld.getEntities();
    for (let entity of entities) {
        if (entity.typeId == "minecraft:armor_stand" && entity.nameTag == "Jeff") {
            entity.runCommand("execute as @s at @s if block ~~~ air [] run tp @s ~1 " + (-(4 * 12 * entity.location.x * (entity.location.x - 12)) / Math.pow(12, 2)) + "~");
            if (entity.location.y < -6) {
                entity.remove();
            }
        }
    }
    var m1 = 1, m2 = 1;
    if (sel2[2] - sel1[2] != 0)
        m1 = (sel2[0] - sel1[0]) / (sel2[2] - sel1[2]);
    if (sel2[0] - sel1[0] != 0)
        m1 = (sel2[1] - sel1[1]) / (sel2[0] - sel1[0]);
    if (sel2[0] - sel1[0] != 0)
        m2 = (sel2[2] - sel1[2]) / (sel2[0] - sel1[0]);
    for (let i = 0; i <= Math.abs(sel2[0] - sel1[0]) && Math.abs(sel2[0] - sel1[0]) / 6 != 0; i += Math.abs(sel2[0] - sel1[0]) / 6) {
        if (sel2[0] - sel1[0] > 0 && sel2[2] - sel1[2] || sel2[0] - sel1[0] > 0 && sel2[1] - sel1[1] || sel2[0] - sel1[0] > 0 && sel2[0] - sel1[0])
            overworld.runCommand("particle minecraft:blue_flame_particle " + (sel1[0] + i + 0.01) + " " + (sel1[1] + m1 * i + 0.01) + " " + (sel1[2] + m2 * i + 0.01));
        else if (sel2[0] - sel1[0] < 0 && sel2[2] - sel1[2] || sel2[0] - sel1[0] < 0 && sel2[1] - sel1[1] || sel2[0] - sel1[0] < 0 && sel2[0] - sel1[0])
            overworld.runCommand("particle minecraft:obsidian_glow_dust_particle " + (sel1[0] + i + sel2[0] - sel1[0] + 0.01) + " " + (sel1[1] + m1 * i + sel2[1] - sel1[1] + 0.01) + " " + (sel1[2] + m2 * i + sel2[2] - sel1[2] + 0.01));
    }
}, 8);
system.runInterval(() => {
    if (sel1[0] && sel2[0])
        selBox();
}, 32);

function matchCmd(cmd, sender) {
    if (cmd[0] == "help" || cmd[0] == "h" || cmd[0] == "?") {
        system.run(() => {
            sender.runCommand("say e");
        });
    } else if (cmd[0] == "pos") {
        system.run(() => {
            if (cmd[1] == "1") {
                sel1[0] = Math.floor(sender.location.x);
                sel1[1] = Math.floor(sender.location.y);
                sel1[2] = Math.floor(sender.location.z);
                system.run(() => {
                    sender.runCommandAsync("tellraw @p {\"rawtext\":[{\"text\":\"Position 1 set to §d" + sel1[0] + ", " + sel1[1] + ", " + sel1[2] + "\"}]}");
                    sender.runCommandAsync("playsound block.scaffolding.hit @a " + sel1[0] + " " + sel1[1] + " " + sel1[2]);
                });
            }
            else if (cmd[1] == "2") {
                sel2[0] = Math.floor(sender.location.x);
                sel2[1] = Math.floor(sender.location.y);
                sel2[2] = Math.floor(sender.location.z);
                system.run(() => {
                    sender.runCommandAsync("tellraw @p {\"rawtext\":[{\"text\":\"Position 2 set to §b" + sel2[0] + ", " + sel2[1] + ", " + sel2[2] + "\"}]}");
                    sender.runCommandAsync("playsound block.scaffolding.break @a " + sel2[0] + " " + sel2[1] + " " + sel2[2]);
                });
            }
        });
    }
    else if (cmd == "a") {
        world.sendMessage("E");
    }
    else if (cmd[0] == "set" && cmd[1] != undefined && cmd[3] == undefined) {
        system.run(() => {
            var x1 = Math.min(sel1[0], sel2[0]), y1 = Math.min(sel1[1], sel2[1]), z1 = Math.min(sel1[2], sel2[2]), x2 = Math.max(sel1[0], sel2[0]), y2 = Math.max(sel1[1], sel2[1]), z2 = Math.max(sel1[2], sel2[2])
            if (cmd[2]) {
                if (x2 != x1 && y2 != y1 && z2 != z1)
                    for (let i = 0; i + Math.floor((x2 - x1) / 4) < Math.floor((x2 - x1)); i += Math.floor((x2 - x1) / 4)) {
                        world.sendMessage("w" + i)
                        for (let j = 0; j + Math.floor((y2 - y1) / 4) < Math.floor((y2 - y1)); j += Math.floor((y2 - y1) / 4)) {
                            for (let k = 0; k + Math.floor((z2 - z1) / 4) < Math.floor((z2 - z1)); k += Math.floor((z2 - z1) / 4)) {
                                overworld.runCommandAsync("fill " + (x1 + i) + " " + (y1 + j) + " " + (z1 + k) + " " + (x2 - (i / (x2 - x1)) * (x2 - x1)) + " " + (y2 - (j / (y2 - y1)) * (y2 - y1)) + " " + (z2 - (k / (z2 - z1)) * (z2 - z1)) + " " + cmd[1] + " " + cmd[2]);
                                world.sendMessage("fill " + (x1 + i) + " " + (y1 + j) + " " + (z1 + k) + " " + (x2 + i) + " " + (y2 + j * 2) + " " + (z2 + k * 2) + " " + cmd[1] + " " + cmd[2]);
                            }
                        }
                    }
                else
                    overworld.runCommandAsync("fill " + sel1[0] + " " + sel1[1] + " " + sel1[2] + " " + sel2[0] + " " + sel2[1] + " " + sel2[2] + " " + cmd[1] + " " + cmd[2]);
            } else if (!cmd[2]) {
                overworld.runCommandAsync("fill " + sel1[0] + " " + sel1[1] + " " + sel1[2] + " " + sel2[0] + " " + sel2[1] + " " + sel2[2] + " " + cmd[1]);
            }
        });
    }
    else if (cmd[0] == "set" && cmd[1] != undefined && cmd[2] != undefined && cmd[3] != undefined) {
        system.run(() => {
            if (cmd[3] == "replace") {
                overworld.runCommandAsync("fill " + sel1[0] + " " + sel1[1] + " " + sel1[2] + " " + sel2[0] + " " + sel2[1] + " " + sel2[2] + " " + cmd[1] + " " + cmd[2] + " " + cmd[3] + " " + cmd[4]);
            } else {
                overworld.runCommandAsync("fill " + sel1[0] + " " + sel1[1] + " " + sel1[2] + " " + sel2[0] + " " + sel2[1] + " " + sel2[2] + " " + cmd[1] + " " + cmd[2] + " " + cmd[3]);
            }
        });
    }
    else if (cmd[0] == "recf" && cmd[1] != undefined) {
        system.run(() => {
            if (cmd[1]) {
                for (let i = 0; i <= Math.abs(sel2[0] - sel1[0]); i++) {
                    for (let j = 0; j <= Math.abs(sel2[1] - sel1[1]); j++) {
                        for (let k = 0; k <= Math.abs(sel2[2] - sel1[2]); k++) {
                            overworld.runCommand("setblock " + (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))) + " " + (sel1[1] + (j * Math.sign(sel2[1] - sel1[1]))) + " " + (sel1[2] + (k * Math.sign(sel2[2] - sel1[2]))) + " " + cmd[1] + " " + cmd[2]);
                            sender.runCommand("title @s actionbar Progress: " + i + ", " + j + ", " + k);
                        }
                    }
                }
            }
        });
        if (world.gameRules.commandBlockOutput == true)
            world.sendMessage("Placed " + ((Math.abs(sel2[0] - sel1[0]) + 1) * (Math.abs(sel2[1] - sel1[1]) + 1) * (Math.abs(sel2[2] - sel1[2]) + 1)) + " blocks");
        console.warn("s");
    }
    else if (cmd[0] == "noise") {
        fun.noiseSeed(Number(cmd[4]));
        system.run(() => {
            if (cmd[1] == "gen" && !cmd[7])
                for (let i = 0; i <= Math.abs(sel2[0] - sel1[0]); i++) {
                    for (let j = 0; j <= Math.abs(sel2[2] - sel1[2]); j++) {
                        overworld.runCommand("fill " + (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))) + " " + Math.min(sel1[1], sel2[1]) + " " + (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))) + " " + (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))) + " " + (Math.min(sel1[1], sel2[1]) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))), Number(cmd[3]) * (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))))) + " " + (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))) + " " + cmd[5] + " " + cmd[6]);
                    }
                }
            else if (cmd[1] == "gen" && cmd[7])
                for (let i = 0; i <= Math.abs(sel2[0] - sel1[0]); i++) {
                    for (let j = 0; j <= Math.abs(sel2[2] - sel1[2]); j++) {
                        overworld.runCommand("fill " + (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))) + " " + Math.min(sel1[1], sel2[1]) + " " + (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))) + " " + (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))) + " " + (Math.min(sel1[1], sel2[1]) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))), Number(cmd[3]) * (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))))) + " " + (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))) + " " + cmd[5] + " " + cmd[6] + " " + cmd[7]);
                    }
                }
            else if (cmd[1] == "grass")
                for (let i = 0; i <= Math.abs(sel2[0] - sel1[0]); i++) {
                    for (let j = 0; j <= Math.abs(sel2[2] - sel1[2]); j++) {
                        overworld.runCommand("fill " + (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))) + " " + Math.min(sel1[1], sel2[1]) + " " + (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))) + " " + (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))) + " " + (Math.min(sel1[1], sel2[1]) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))), Number(cmd[3]) * (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))))) + " " + (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))) + " dirt []");
                        overworld.runCommand("setblock " + (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))) + " " + (1 + Math.min(sel1[1], sel2[1]) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (sel1[0] + (i * Math.sign(sel2[0] - sel1[0]))), Number(cmd[3]) * (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))))) + " " + (sel1[2] + (j * Math.sign(sel2[2] - sel1[2]))) + " grass_block []");
                    }
                }
        });
        if (!cmd[1])
            overworld.runCommandAsync("tellraw " + sender.name + " {\"rawtext\"[{\"text\":\"" + fun.pref + "noise <grass/gen> <amplitude> <frequency> <seed> <block(gen)>\"}]}")
    }
    else if (cmd[0] == "shoot" && cmd[1] != undefined) {
        system.run(() => {
            if (cmd[4]) {
                for (let i = 0; i <= Math.floor(cmd[1]); i++) {
                    sender.runCommand("execute as @s at @s positioned ~~1.65~ run setblock ^^^" + i + " " + cmd[2] + " " + cmd[3] + " " + cmd[4]);
                }
            }
            else if (!cmd[4]) {
                for (let i = 0; i <= Math.floor(cmd[1]); i++) {
                    sender.runCommand("execute as @s at @s positioned ~~1.65~ run setblock ^^^" + i + " " + cmd[2] + " " + cmd[3]);
                }
            }
        })
    }
    else if (cmd[0] == "up") {
        system.run(() => {
            var x1 = Math.min(sel1[0], sel2[0]), y1 = Math.min(sel1[1], sel2[1]), z1 = Math.min(sel1[2], sel2[2]), x2 = Math.max(sel1[0], sel2[0]), y2 = Math.max(sel1[1], sel2[1]), z2 = Math.max(sel1[2], sel2[2]);
            overworld.runCommand("structure save my " + x1 + " " + y1 + " " + z1 + " " + x2 + " " + y2 + " " + z2 + " false");
            overworld.runCommandAsync("structure load my " + Math.min(sel1[0], sel2[0]) + " " + (Math.min(sel1[1], sel2[1]) + Number(cmd[1])) + " " + Math.min(sel1[2], sel2[2]));
            //if
            overworld.runCommandAsync("execute positioned " + x1 + " " + y1 + " " + z1 + " as @e[dx=" + (x2 - x1) + ",dy=" + (y2 - y1 + 1) + ",dz=" + (z2 - z1) + "] at @s run tp @s ~~" + Number(cmd[1]) + "~");
            if (Number(cmd[1]) > 0)
                overworld.runCommandAsync("fill " + x1 + " " + y1 + " " + z1 + " " + x2 + " " + (y1 + Number(cmd[1]) - 1) + " " + z2 + " air []");
            else if (Number(cmd[1]) < 0)
                overworld.runCommandAsync("fill " + x1 + " " + (sel1[1] + Math.abs(sel2[1] - sel1[1])) + " " + z1 + " " + x2 + " " + (sel1[1] + Number(cmd[1]) + 1 + Math.abs(sel2[1] - sel1[1])) + " " + z2 + " air []");
            sel1[1] += Number(cmd[1]);
            sel2[1] += Number(cmd[1]);
        });
    }
    else if (cmd[0] == "dis" || cmd[0] == "distance") {
        world.sendMessage("Distance: " + Math.sqrt(Math.pow(Math.sqrt(Math.pow(sel2[0] - sel1[0], 2) + Math.pow(sel2[1] - sel1[1], 2)), 2) + Math.pow(sel2[2] - sel1[2], 2)));
    }
    else if (cmd[0] == "del" || cmd[0] == "delete") {
        system.run(() => {
            overworld.runCommandAsync("fill " + sel1[0] + " " + sel1[1] + " " + sel1[2] + " " + sel2[0] + " " + sel2[1] + " " + sel2[2] + " air []");
        });
    }
}
world.beforeEvents.chatSend.subscribe((eventData) => {
    if (eventData.message.substr(0, 1) == fun.pref) {
        eventData.cancel = true;
        matchCmd(eventData.message.substr(1, eventData.message.length).split(" "), eventData.sender);
    }
});
//selecc

world.beforeEvents.playerBreakBlock.subscribe((eventData) => {
    if (eventData.itemStack.nameTag == selTool && eventData.itemStack.typeId == "minecraft:stick") {
        eventData.cancel = true;
        sel1[0] = Math.floor(eventData.block.location.x);
        sel1[1] = Math.floor(eventData.block.location.y);
        sel1[2] = Math.floor(eventData.block.location.z);
        system.run(() => {
            eventData.player.runCommandAsync("titleraw @p actionbar {\"rawtext\":[{\"text\":\"Position 1 set to §d" + sel1[0] + ", " + sel1[1] + ", " + sel1[2] + "\\n§eDistance: " + Math.sqrt(Math.pow(Math.sqrt(Math.pow(sel2[0] - sel1[0], 2) + Math.pow(sel2[1] - sel1[1], 2)), 2) + Math.pow(sel2[2] - sel1[2], 2)) + "\"}]}");
            eventData.player.runCommandAsync("playsound block.scaffolding.hit @a " + sel1[0] + " " + sel1[1] + " " + sel1[2]);
            if (sel2[0])
                selBox();
        });
    }
});
world.beforeEvents.itemUseOn.subscribe((eventData) => {
    if (eventData.itemStack.nameTag == selTool && eventData.itemStack.typeId == "minecraft:stick") {
        sel2[0] = Math.floor(eventData.block.location.x);
        sel2[1] = Math.floor(eventData.block.location.y);
        sel2[2] = Math.floor(eventData.block.location.z);
        system.run(() => {
            eventData.source.runCommandAsync("titleraw @p actionbar {\"rawtext\":[{\"text\":\"Position 2 set to §b" + sel2[0] + ", " + sel2[1] + ", " + sel2[2] + "\\n§eDistance: " + Math.sqrt(Math.pow(Math.sqrt(Math.pow(sel2[0] - sel1[0], 2) + Math.pow(sel2[1] - sel1[1], 2)), 2) + Math.pow(sel2[2] - sel1[2], 2)) + "\"}]}");
            eventData.source.runCommandAsync("playsound block.scaffolding.break @a " + sel2[0] + " " + sel2[1] + " " + sel2[2]);
            if (sel1[0])
                selBox();
        });
        eventData.cancel = true;
    }
});