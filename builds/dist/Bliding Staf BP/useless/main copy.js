console.warn("Working...");

import { world, system } from "@minecraft/server";
import * as fun from "./functions.js";

let overworld = world.getDimension("overworld");
let entities = overworld.getEntities();
/*
world.scoreboard.removeObjective("sel.x1");
world.scoreboard.removeObjective("sel.y1");
world.scoreboard.removeObjective("sel.z1");

world.scoreboard.removeObjective("sel.x2");
world.scoreboard.removeObjective("sel.y2");
world.scoreboard.removeObjective("sel.z2");*/

let sel1 = [];
let sel2 = [];

function addScore(string) {
    if (!world.scoreboard.getObjective(string))
        world.scoreboard.addObjective(string);
}
system.runInterval(() => {
    overworld = world.getDimension("overworld");
    entities = overworld.getEntities();
    addScore("sel.x1");
    addScore("sel.y1");
    addScore("sel.z1");

    addScore("sel.x2");
    addScore("sel.y2");
    addScore("sel.z2");

    sel1[0] = world.scoreboard.getObjective("sel.x1");
    sel1[1] = world.scoreboard.getObjective("sel.y1");
    sel1[2] = world.scoreboard.getObjective("sel.z1");

    sel2[0] = world.scoreboard.getObjective("sel.x2");
    sel2[1] = world.scoreboard.getObjective("sel.y2");
    sel2[2] = world.scoreboard.getObjective("sel.z2");
}, 8);
/*world.scoreboard.addObjective("sel.x1");
world.scoreboard.addObjective("sel.y1");
world.scoreboard.addObjective("sel.z1");

world.scoreboard.addObjective("sel.x2");
world.scoreboard.addObjective("sel.y2");
world.scoreboard.addObjective("sel.z2");*/

const selTool = "Selecc";
/*let playerID = world.scoreboard.getObjective("playerid");
if (!playerID) {
    world.scoreboard.addObjective("playerid");
}*/

for (let player of overworld.getPlayers()) {
    sel1[0] = world.scoreboard.getObjective("sel.x1");
    sel1[1] = world.scoreboard.getObjective("sel.y1");
    sel1[2] = world.scoreboard.getObjective("sel.z1");

    sel2[0] = world.scoreboard.getObjective("sel.x2");
    sel2[1] = world.scoreboard.getObjective("sel.y2");
    sel2[2] = world.scoreboard.getObjective("sel.z2");
    var x1, y1, z1, x2, y2, z2;
    system.runInterval(() => {
        if (sel1[0].hasParticipant(player) && sel2[0].hasParticipant(player))
            x1 = sel1[0].getScore(player), y1 = sel1[1].getScore(player), z1 = sel1[2].getScore(player), x2 = sel2[0].getScore(player), y2 = sel2[1].getScore(player), z2 = sel2[2].getScore(player);
    }, 5);
    function selBox() {
        if (sel1[0].hasParticipant(player) && sel2[0].hasParticipant(player)) {
            var c = [], d = [];
            d[0] = Math.sign(x2 - x1 + 0.1);
            d[1] = Math.sign(y2 - y1 - 0.1);
            d[2] = Math.sign(z2 - z1 - 0.1);
            c[0] = 0.01;
            c[1] = 0.01;
            c[2] = 0.01;
            if (x1 > x2)
                c[0] = 1.01;
            if (y1 < y2)
                c[1] = 1.01;
            if (z1 < z2)
                c[2] = 1.01;
            overworld.runCommand("particle minecraft:endrod " + (x1 + c[0]) + " " + (y1 + c[1] - d[1]) + " " + (z1 + c[2] - d[2]));
            overworld.runCommand("particle minecraft:endrod " + (x1 + c[0]) + " " + (y2 + c[1]) + " " + (z1 + c[2] - d[2]));
            overworld.runCommand("particle minecraft:endrod " + (x1 + c[0]) + " " + (y1 + c[1] - d[1]) + " " + (z2 + c[2]));
            overworld.runCommand("particle minecraft:endrod " + (x1 + c[0]) + " " + (y2 + c[1]) + " " + (z2 + c[2]));
            overworld.runCommand("particle minecraft:endrod " + (x2 + c[0] + d[0]) + " " + (y1 + c[1] - d[1]) + " " + (z1 + c[2] - d[2]));
            overworld.runCommand("particle minecraft:endrod " + (x2 + c[0] + d[0]) + " " + (y2 + c[1]) + " " + (z1 + c[2] - d[2]));
            overworld.runCommand("particle minecraft:endrod " + (x2 + c[0] + d[0]) + " " + (y1 + c[1] - d[1]) + " " + (z2 + c[2]));
            overworld.runCommand("particle minecraft:endrod " + (x2 + c[0] + d[0]) + " " + (y2 + c[1]) + " " + (z2 + c[2]));
        }
    }
    function selLine() {
        var m1 = 1, m2 = 1;
        if (z2 - z1 != 0)
            m1 = (x2 - x1) / (z2 - z1);
        if (x2 - x1 != 0)
            m1 = (y2 - y1) / (x2 - x1);
        if (x2 - x1 != 0)
            m2 = (z2 - z1) / (x2 - x1);
        for (let i = 0; i <= Math.abs(x2 - x1) && Math.abs(x2 - x1) / 6 != 0; i += Math.abs(x2 - x1) / 6) {
            if (x2 - x1 > 0 && z2 - z1 || x2 - x1 > 0 && y2 - y1 || x2 - x1 > 0 && x2 - x1)
                overworld.runCommand("particle minecraft:blue_flame_particle " + (x1 + i + 0.01) + " " + (y1 + m1 * i + 0.01) + " " + (z1 + m2 * i + 0.01));
            else if (x2 - x1 < 0 && z2 - z1 || x2 - x1 < 0 && y2 - y1 || x2 - x1 < 0 && x2 - x1)
                overworld.runCommand("particle minecraft:blue_flame_particle " + (x1 + i + x2 - x1 + 0.01) + " " + (y1 + m1 * i + y2 - y1 + 0.01) + " " + (z1 + m2 * i + z2 - z1 + 0.01));
        }
    }
    system.runInterval(() => {
        overworld = world.getDimension("overworld");
        entities = overworld.getEntities();
        addScore("sel.x1");
        addScore("sel.y1");
        addScore("sel.z1");

        addScore("sel.x2");
        addScore("sel.y2");
        addScore("sel.z2");

        sel1[0] = world.scoreboard.getObjective("sel.x1");
        sel1[1] = world.scoreboard.getObjective("sel.y1");
        sel1[2] = world.scoreboard.getObjective("sel.z1");

        sel2[0] = world.scoreboard.getObjective("sel.x2");
        sel2[1] = world.scoreboard.getObjective("sel.y2");
        sel2[2] = world.scoreboard.getObjective("sel.z2");
        selLine();
    }, 8);
    system.runInterval(() => {
        selBox();
    }, 24);
    //selecc

    world.beforeEvents.playerBreakBlock.subscribe((eventData) => {
        try {
            if (eventData.itemStack.nameTag == selTool && eventData.itemStack.typeId == "minecraft:stick") {
                system.run(() => {
                    sel1[0].setScore(eventData.player, Math.floor(eventData.block.location.x));
                    sel1[1].setScore(eventData.player, Math.floor(eventData.block.location.y));
                    sel1[2].setScore(eventData.player, Math.floor(eventData.block.location.z));
                    eventData.player.runCommandAsync("titleraw @p actionbar {\"rawtext\":[{\"text\":\"Position 1 set to §d" + sel1[0].getScore(eventData.player) + ", " + sel1[1].getScore(eventData.player) + ", " + sel1[2].getScore(eventData.player) + "\\n§eDistance: " + Math.sqrt(Math.pow(sel2[0].getScore(eventData.player) - sel1[0].getScore(eventData.player), 2) + Math.pow(sel2[1].getScore(eventData.player) - sel1[1].getScore(eventData.player), 2) + Math.pow(sel2[2].getScore(eventData.player) - sel1[2].getScore(eventData.player), 2)) + "\"}]}");
                    eventData.player.runCommandAsync("playsound block.scaffolding.hit @a " + sel1[0].getScore(eventData.player) + " " + sel1[1].getScore(eventData.player) + " " + sel1[2].getScore(eventData.player));
                    selBox();
                });
                eventData.cancel = true;
            }
        } catch (err) { }
    });
    world.beforeEvents.itemUseOn.subscribe((eventData) => {
        if (eventData.itemStack.nameTag == selTool && eventData.itemStack.typeId == "minecraft:stick") {
            system.run(() => {
                sel2[0].setScore(eventData.source, Math.floor(eventData.block.location.x));
                sel2[1].setScore(eventData.source, Math.floor(eventData.block.location.y));
                sel2[2].setScore(eventData.source, Math.floor(eventData.block.location.z));
                eventData.source.runCommandAsync("titleraw @p actionbar {\"rawtext\":[{\"text\":\"Position 2 set to §b" + Math.floor(eventData.block.location.x) + ", " + Math.floor(eventData.block.location.y) + ", " + Math.floor(eventData.block.location.z) + "\\n§eDistance: " + Math.sqrt(Math.pow(sel2[0].getScore(eventData.source) - sel1[0].getScore(eventData.source), 2) + Math.pow(sel2[1].getScore(eventData.source) - sel1[1].getScore(eventData.source), 2) + Math.pow(sel2[2].getScore(eventData.source) - sel1[2].getScore(eventData.source), 2)) + "\"}]}");
                eventData.source.runCommandAsync("playsound block.scaffolding.break @a " + sel2[0].getScore(eventData.source) + " " + sel2[1].getScore(eventData.source) + " " + sel2[2].getScore(eventData.source));
                selBox();
            });
            eventData.cancel = true;
        }
    });
}
//--------------------------------------------------------------------
//--------------------COMMANDS__________________--------------------
//-------------------------------------------------------------------
async function matchCmd(cmd, sender) {
    var x_1 = sel1[0].getScore(sender), y_1 = sel1[1].getScore(sender), z_1 = sel1[2].getScore(sender), x_2 = sel2[0].getScore(sender), y_2 = sel2[1].getScore(sender), z_2 = sel2[2].getScore(sender);
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
        world.sendMessage("" + fun.noise(1, 3, 2));
    }
    else if (cmd[0] == "set" && cmd[1] != "loop" && cmd[3] == undefined) {
        system.run(() => {
            try {
                if (cmd[2]) {
                    overworld.runCommandAsync("fill " + x_1 + " " + y_1 + " " + z_1 + " " + x_2 + " " + y_2 + " " + z_2 + " " + cmd[1] + " " + cmd[2]);
                } else if (!cmd[2]) {
                    overworld.runCommandAsync("fill " + x_1 + " " + y_1 + " " + z_1 + " " + x_2 + " " + y_2 + " " + z_2 + " " + cmd[1]);
                }
            } finally { world.sendMessage(fun.pref + "fill <block> <cmd[2]> <cmd[3]> <cmd[4]>"); }
        });
    }
    else if (cmd[0] == "set" && cmd[1] != "loop" && cmd[2] != undefined && cmd[3] != undefined) {
        system.run(() => {
            try {
                if (cmd[3] == "replace") {
                    overworld.runCommandAsync("fill " + x_1 + " " + y_1 + " " + z_1 + " " + x_2 + " " + y_2 + " " + z_2 + " " + cmd[1] + " " + cmd[2] + " " + cmd[3] + " " + cmd[4]);
                } else {
                    overworld.runCommandAsync("fill " + x_1 + " " + y_1 + " " + z_1 + " " + x_2 + " " + y_2 + " " + z_2 + " " + cmd[1] + " " + cmd[2] + " " + cmd[3]);
                }
            } finally { world.sendMessage(fun.pref + "fill <block> <cmd[2]> <cmd[3]> <cmd[4]>"); }
        });
    }
    else if (cmd[0] == "set" && cmd[1] == "loop") {
        system.run(() => {
            try {
                var i = 0;
                var tim = system.runInterval(() => {
                    if (i <= Math.abs(y2 - y1)) {
                        if (cmd[3] && !cmd[4]) {
                            overworld.runCommandAsync("fill " + x_1 + " " + (Math.min(y_1, y_2) + i) + " " + z_1 + " " + x_2 + " " + (Math.min(y_1, y_2) + i) + " " + z_2 + " " + cmd[2] + " " + cmd[3]);
                        } else if (!cmd[3] && !cmd[4]) {
                            overworld.runCommandAsync("fill " + x_1 + " " + (Math.min(y_1, y_2) + i) + " " + z_1 + " " + x2 + " " + (Math.min(y_1, y_2) + i) + " " + z_2 + " " + cmd[2]);
                        } else if (cmd[4] && cmd[4] != "replace") {
                            overworld.runCommandAsync("fill " + x_1 + " " + (Math.min(y_1, y_2) + i) + " " + z_1 + " " + x_2 + " " + (Math.min(y_1, y_2) + i) + " " + z_2 + " " + cmd[2] + " " + cmd[3] + " " + cmd[4]);
                        } else if (cmd[4] == "replace") {
                            overworld.runCommandAsync("fill " + x_1 + " " + (Math.min(y_1, y_2) + i) + " " + z_1 + " " + x_2 + " " + (Math.min(y_1, y_2) + i) + " " + z_2 + " " + cmd[2] + " " + cmd[3] + " replace " + cmd[5]);
                        }
                        i++;
                    } else system.clearRun(tim);
                    if (world.gameRules.sendCommandFeedback == true)
                        overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(y2 - y1) + 1)) / 100) + "%\"}]}");
                }, 1);
            } finally { world.sendMessage(fun.pref + "fill loop <block> <cmd[2]> <cmd[3]> <cmd[4]>"); }
        });
    }

    else if (cmd[0] == "noise") {
        fun.noiseSeed(Number(cmd[4]));
        system.run(() => {
            if (cmd[1] == "gen" && !cmd[7]) {
                var i = 0;
                var tim = system.runInterval(() => {
                    if (i <= Math.abs(x_2 - x_1)) {
                        for (let j = 0; j <= Math.abs(z_2 - z_1); j++) {
                            overworld.runCommand("fill " + (x_1 + (i * Math.sign(x_2 - x_1))) + " " + Math.min(y_1, y_2) + " " + (z_1 + (j * Math.sign(z_2 - z_1))) + " " + (x_1 + (i * Math.sign(x_2 - x_1))) + " " + (Math.min(y_1, y_2) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (x_1 + (i * Math.sign(x_2 - x_1))), Number(cmd[3]) * (z_1 + (j * Math.sign(z_2 - z_1))))) + " " + (z_1 + (j * Math.sign(z_2 - z_1))) + " " + cmd[5] + " " + cmd[6]);
                        }
                        i++;
                    } else system.clearRun(tim);
                    if (world.gameRules.sendCommandFeedback == true)
                        overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(x_2 - x_1) + 1)) / 100) + "%\"}]}");
                }, 1);
            }
            else if (cmd[1] == "gen" && cmd[7]) {
                var i = 0;
                var tim = system.runInterval(() => {
                    if (i <= Math.abs(x_2 - x_1)) {
                        for (let j = 0; j <= Math.abs(z_2 - z_1); j++) {
                            overworld.runCommand("fill " + (x_1 + (i * Math.sign(x_2 - x_1))) + " " + Math.min(y_1, y_2) + " " + (z_1 + (j * Math.sign(z_2 - z_1))) + " " + (x_1 + (i * Math.sign(x_2 - x_1))) + " " + (Math.min(y_1, y_2) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (x_1 + (i * Math.sign(x_2 - x_1))), Number(cmd[3]) * (z_1 + (j * Math.sign(z_2 - z_1))))) + " " + (z_1 + (j * Math.sign(z_2 - z_1))) + " " + cmd[5] + " " + cmd[6] + " " + cmd[7]);
                        }
                        i++;
                    } else system.clearRun(tim);
                    if (world.gameRules.sendCommandFeedback == true)
                        overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(x_2 - x_1) + 1)) / 100) + "%\"}]}");
                }, 1);
            }
            else if (cmd[1] == "grass") {
                var i = 0;
                var tim = system.runInterval(() => {
                    if (i <= Math.abs(x_2 - x_1)) {
                        for (let j = 0; j <= Math.abs(z_2 - z_1); j++) {
                            overworld.runCommand("fill " + (x_1 + (i * Math.sign(x_2 - x_1))) + " " + Math.min(y_1, y_2) + " " + (z_1 + (j * Math.sign(z_2 - z_1))) + " " + (x_1 + (i * Math.sign(x_2 - x_1))) + " " + (Math.min(y_1, y_2) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (x_1 + (i * Math.sign(x_2 - x_1))), Number(cmd[3]) * (z_1 + (j * Math.sign(z_2 - z_1))))) + " " + (z_1 + (j * Math.sign(z_2 - z_1))) + " dirt []");
                            overworld.runCommand("setblock " + (x_1 + (i * Math.sign(x_2 - x_1))) + " " + (1 + Math.min(y_1, y_2) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (x_1 + (i * Math.sign(x_2 - x_1))), Number(cmd[3]) * (z_1 + (j * Math.sign(z_2 - z_1))))) + " " + (z_1 + (j * Math.sign(z_2 - z_1))) + " grass_block []");
                        }
                        i++;
                    } else system.clearRun(tim);
                    if (world.gameRules.sendCommandFeedback == true)
                        overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(x_2 - x_1) + 1)) / 100) + "%\"}]}");
                }, 1);
            }
            else if (cmd[1] == "fillStatic") {
                var i = 0, m = 2, vx_1 = x_1, vy_1 = y_1, vz_1 = z_1, vx_2 = x_2, vy_2 = y_2, vz_2 = z_2, block, rand;
                if (cmd[2] && !cmd[8])
                    var tim = system.runInterval(() => {
                        if (i <= Math.abs(vx_2 - vx_1)) {
                            var j = 0;
                            m = 0;
                            var tim2 = system.runInterval(() => {
                                if (j <= Math.abs(vy_2 - vy_1)) {
                                    for (let k = 0; k <= Math.abs(vz_2 - vz_1); k++) {
                                        rand = Math.random();
                                        if (!cmd[4]) {
                                            if (0.5 <= rand) block = cmd[2];
                                            else block = cmd[3];
                                        }
                                        else if (cmd[4] != undefined && !cmd[5]) {
                                            if (rand < 0.33) block = cmd[2];
                                            else if (rand < 0.67 && rand >= 0.33) block = cmd[3];
                                            else block = cmd[4];
                                        }
                                        else if (cmd[5] != undefined && !cmd[6]) {
                                            if (rand < 0.25) block = cmd[2];
                                            else if (rand < 0.5 && rand >= 0.25) block = cmd[3];
                                            else if (rand < 0.75 && rand >= 0.5) block = cmd[4];
                                            else block = cmd[5];
                                        }
                                        else if (cmd[6] != undefined && !cmd[7]) {
                                            if (rand < 0.2) block = cmd[2];
                                            else if (rand < 0.4 && rand >= 0.2) block = cmd[3];
                                            else if (rand < 0.6 && rand >= 0.4) block = cmd[4];
                                            else if (rand < 0.8 && rand >= 0.6) block = cmd[5];
                                            else block = cmd[6];
                                        }
                                        else if (cmd[7] != undefined && !cmd[8]) {
                                            if (rand < 0.17) block = cmd[2];
                                            else if (rand < 0.33 && rand >= 0.17) block = cmd[3];
                                            else if (rand < 0.5 && rand >= 0.33) block = cmd[4];
                                            else if (rand < 0.67 && rand >= 0.5) block = cmd[5];
                                            else if (rand < 0.83 && rand >= 0.67) block = cmd[6];
                                            else block = cmd[7];
                                        }
                                        overworld.runCommand("setblock " + (vx_1 + (i * Math.sign(vx_2 - vx_1)) - Math.sign(vx_2 - vx_1)) + " " + (vy_1 + (j * Math.sign(vy_2 - vy_1))) + " " + (vz_1 + (k * Math.sign(vz_2 - vz_1))) + " " + block);
                                    }
                                } else system.clearRun(tim2);
                                j++;
                            }, 1);
                        } else system.clearRun(tim);
                        i++;
                        if (world.gameRules.sendCommandFeedback == true)
                            overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(vx_2 - vx_1) + 2)) / 100) + "%\"}]}");
                    }, (Math.abs(vy_2 - vy_1) + m));
                else world.sendMessage("Maximum block types for noise fillStatic is 6 a");
            }
            else if (cmd[1] == "keepStatic") {
                var i = 0, m = 2, vx_1 = x_1, vy_1 = y_1, vz_1 = z_1, vx_2 = x_2, vy_2 = y_2, vz_2 = z_2, block, rand;
                if (cmd[2] && !cmd[8])
                    var tim = system.runInterval(() => {
                        if (i <= Math.abs(vx_2 - vx_1)) {
                            var j = 0;
                            m = 0;
                            var tim2 = system.runInterval(() => {
                                if (j <= Math.abs(vy_2 - vy_1)) {
                                    for (let k = 0; k <= Math.abs(vz_2 - vz_1); k++) {
                                        rand = Math.random();
                                        if (!cmd[4]) {
                                            if (0.5 <= rand) block = cmd[2];
                                            else block = cmd[3];
                                        }
                                        else if (cmd[4] != undefined && !cmd[5]) {
                                            if (rand < 0.33) block = cmd[2];
                                            else if (rand < 0.67 && rand >= 0.33) block = cmd[3];
                                            else block = cmd[4];
                                        }
                                        else if (cmd[5] != undefined && !cmd[6]) {
                                            if (rand < 0.25) block = cmd[2];
                                            else if (rand < 0.5 && rand >= 0.25) block = cmd[3];
                                            else if (rand < 0.75 && rand >= 0.5) block = cmd[4];
                                            else block = cmd[5];
                                        }
                                        else if (cmd[6] != undefined && !cmd[7]) {
                                            if (rand < 0.2) block = cmd[2];
                                            else if (rand < 0.4 && rand >= 0.2) block = cmd[3];
                                            else if (rand < 0.6 && rand >= 0.4) block = cmd[4];
                                            else if (rand < 0.8 && rand >= 0.6) block = cmd[5];
                                            else block = cmd[6];
                                        }
                                        else if (cmd[7] != undefined && !cmd[8]) {
                                            if (rand < 0.17) block = cmd[2];
                                            else if (rand < 0.33 && rand >= 0.17) block = cmd[3];
                                            else if (rand < 0.5 && rand >= 0.33) block = cmd[4];
                                            else if (rand < 0.67 && rand >= 0.5) block = cmd[5];
                                            else if (rand < 0.83 && rand >= 0.67) block = cmd[6];
                                            else block = cmd[7];
                                        }
                                        overworld.runCommand("setblock " + (vx_1 + (i * Math.sign(vx_2 - vx_1)) - Math.sign(vx_2 - vx_1)) + " " + (vy_1 + (j * Math.sign(vy_2 - vy_1))) + " " + (vz_1 + (k * Math.sign(vz_2 - vz_1))) + " " + block + " keep");
                                    }
                                } else system.clearRun(tim2);
                                j++;
                            }, 1);
                        } else system.clearRun(tim);
                        i++;
                        if (world.gameRules.sendCommandFeedback == true)
                            overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(vx_2 - vx_1) + 2)) / 100) + "%\"}]}");
                    }, (Math.abs(vy_2 - vy_1) + m));
                else world.sendMessage("Maximum block types for noise keepStatic is 6 a");
            }
            else if (cmd[1] == "fillPerlin") {
                fun.noiseSeed(Number(cmd[3]));
                var i = 0, m = 2, vx_1 = x_1, vy_1 = y_1, vz_1 = z_1, vx_2 = x_2, vy_2 = y_2, vz_2 = z_2, block, rand;
                if (cmd[4])
                    var tim = system.runInterval(() => {
                        if (i <= Math.abs(vx_2 - vx_1)) {
                            var j = 0;
                            m = 0;
                            var tim2 = system.runInterval(() => {
                                if (j <= Math.abs(vy_2 - vy_1)) {
                                    for (let k = 0; k <= Math.abs(vz_2 - vz_1); k++) {
                                        rand = fun.noise(Number(cmd[2]) * (vx_1 + (i * Math.sign(vx_2 - vx_1))), Number(cmd[2]) * (vy_1 + (j * Math.sign(vy_2 - vy_1))), Number(cmd[2]) * (vz_1 + (k * Math.sign(vz_2 - vz_1))));
                                        if (!cmd[6]) {
                                            if (0.5 <= rand) block = cmd[4];
                                            else block = cmd[5];
                                        }
                                        else if (cmd[6] != undefined && !cmd[7]) {
                                            if (rand < 0.33) block = cmd[4];
                                            else if (rand < 0.67 && rand >= 0.33) block = cmd[5];
                                            else block = cmd[6];
                                        }
                                        else if (cmd[7] != undefined && !cmd[8]) {
                                            if (rand < 0.25) block = cmd[4];
                                            else if (rand < 0.5 && rand >= 0.25) block = cmd[5];
                                            else if (rand < 0.75 && rand >= 0.5) block = cmd[6];
                                            else block = cmd[7];
                                        }
                                        else if (cmd[8] != undefined && !cmd[9]) {
                                            if (rand < 0.2) block = cmd[4];
                                            else if (rand < 0.4 && rand >= 0.2) block = cmd[5];
                                            else if (rand < 0.6 && rand >= 0.4) block = cmd[6];
                                            else if (rand < 0.8 && rand >= 0.6) block = cmd[7];
                                            else block = cmd[8];
                                        }
                                        else if (cmd[9] != undefined && !cmd[10]) {
                                            if (rand < 0.17) block = cmd[4];
                                            else if (rand < 0.33 && rand >= 0.17) block = cmd[5];
                                            else if (rand < 0.5 && rand >= 0.33) block = cmd[6];
                                            else if (rand < 0.67 && rand >= 0.5) block = cmd[7];
                                            else if (rand < 0.83 && rand >= 0.67) block = cmd[8];
                                            else block = cmd[9];
                                        }
                                        overworld.runCommand("setblock " + (vx_1 + (i * Math.sign(vx_2 - vx_1)) - Math.sign(vx_2 - vx_1)) + " " + (vy_1 + (j * Math.sign(vy_2 - vy_1))) + " " + (vz_1 + (k * Math.sign(vz_2 - vz_1))) + " " + block);
                                    }
                                } else system.clearRun(tim2);
                                j++;
                            }, 1);
                        } else system.clearRun(tim);
                        i++;
                        if (world.gameRules.sendCommandFeedback == true)
                            overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(vx_2 - vx_1) + 2)) / 100) + "%\"}]}");
                    }, (Math.abs(vy_2 - vy_1) + m));
                else world.sendMessage("Maximum block types for noise fillPerlin is 6");
            }
            else if (!cmd[1])
                overworld.runCommandAsync("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"" + fun.pref + "noise <grass/gen> <amplitude> <frequency> <seed> <block(gen)>\"}]}");
        });
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
        });
    }
    else if (cmd[0] == "up") {
        system.run(() => {
            var vx1 = Math.min(x_1, x_2), vy1 = Math.min(y_1, y_2), vz1 = Math.min(z_1, z_2), vx2 = Math.max(x_1, x_2), vy2 = Math.max(y_1, y_2), vz2 = Math.max(z_1, z_2);
            overworld.runCommand("structure save my " + vx1 + " " + vy1 + " " + vz1 + " " + vx2 + " " + vy2 + " " + vz2 + " false");
            overworld.runCommandAsync("structure load my " + vx1 + " " + (vy1 + Number(cmd[1])) + " " + vz1);
            //if
            overworld.runCommandAsync("execute positioned " + vx1 + " " + vy1 + " " + vz1 + " as @e[dx=" + (vx2 - vx1) + ",dy=" + (vy2 - vy1 + 1) + ",dz=" + (vz2 - vz1) + "] at @s run tp @s ~~" + Number(cmd[1]) + "~");
            if (Number(cmd[1]) > 0)
                overworld.runCommandAsync("fill " + x_1 + " " + y_1 + " " + z_1 + " " + x_2 + " " + (y_1 + Number(cmd[1]) - 1) + " " + z_2 + " air []");
            else if (Number(cmd[1]) < 0)
                overworld.runCommandAsync("fill " + vx1 + " " + (y_1 + Math.abs(y_2 - y_1)) + " " + vz1 + " " + vx2 + " " + (y_1 + Number(cmd[1]) + 1 + Math.abs(y_2 - y_1)) + " " + vz2 + " air []");
            sel1[1].addScore(player, Number(cmd[1]));
            sel2[1].addScore(player, Number(cmd[1]));
        });
    }
    else if (cmd[0] == "dis" || cmd[0] == "distance") {
        world.sendMessage("Distance: §e" + Math.sqrt(Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) + Math.pow(z_2 - z_1, 2)));
    }
    else if (cmd[0] == "age") {
        world.sendMessage("Current tick: §b" + system.currentTick);
    }
    else if (cmd[0] == "del" || cmd[0] == "delete") {
        system.run(() => {
            var i = 0;
            var tim = system.runInterval(() => {
                if (i <= Math.abs(y_2 - y_1)) {
                    overworld.runCommandAsync("fill " + x_1 + " " + (Math.min(y_1, y_2) + i) + " " + z_1 + " " + x_2 + " " + (Math.min(y_1, y_2) + i) + " " + z_2 + " air");
                    i++;
                } else system.clearRun(tim);
                if (world.gameRules.sendCommandFeedback == true)
                    overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(y_2 - y_1) + 1)) / 100) + "%\"}]}");
            }, 1);
        });
    }
    else if (cmd[0] == "mode") {
        system.run(() => {
            if (cmd[1] == "placement" && cmd[2] == "true") {
                sender.addTag("_blockPlace");
            } else if (cmd[1] == "placement" && cmd[2] == "false") {
                sender.removeTag("_blockPlace");
            }
        });
    }
}
world.beforeEvents.chatSend.subscribe((eventData) => {
    if (eventData.message.substr(0, 1) == fun.pref) {
        eventData.cancel = true;
        matchCmd(eventData.message.substr(1, eventData.message.length).split(" "), eventData.sender);
    }
});

world.beforeEvents.playerPlaceBlock.subscribe((eventData) => {
    if (eventData.player.hasTag("_blockPlace")) {
        eventData.cancel = true;
    }
});
world.beforeEvents.itemUseOn.subscribe((eventData) => {
    if (eventData.source.hasTag("_blockPlace")) {
        var loc = eventData.block, fac = eventData.blockFace;
        var vx = 0, vy = 0, vz = 0;
        if (fac == "West") vx = -1;
        else if (fac == "East") vx = 1;
        if (fac == "North") vz = -1;
        else if (fac == "South") vz = 1;
        if (fac == "Down") vy = -1;
        else if (fac == "Up") vy = 1;
        var p = eventData.source.runCommandAsync("setblock " + (loc.x + vx) + " " + (loc.y + vy) + " " + (loc.z + vz) + " " + eventData.itemStack.typeId);
        p.catch(() => { });
        return p;
    }
});