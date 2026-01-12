console.warn("Workingffe...");

import { world, system } from "@minecraft/server";
import * as fun from "./functions.js";
import { Parser } from "./parser.js";

//Command imports
import * as simple from "./commands/simple.js"
import * as fills from "./commands/fills.js";
import * as gen from "./commands/generation.js";

let overworld;
let entities;
let players;

system.run(() => {
    overworld = world.getDimension("overworld");
    players = overworld.getPlayers();
});


const selTool = "Selecc";
const pointyTool = "Pointy";

Math.eval = function (expr, x = 1) {
    return Parser.evaluate(expr.replace("x", x));
}

let selScoreObj;

function addScore(string) {
    if (!world.scoreboard.getObjective(string))
        world.scoreboard.addObjective(string);
}
system.runInterval(() => {
    overworld = world.getDimension("overworld");
    entities = overworld.getEntities();
    players = overworld.getPlayers();

    addScore("_flySpeed");

    addScore("sel.x1");
    addScore("sel.y1");
    addScore("sel.z1");

    addScore("sel.x2");
    addScore("sel.y2");
    addScore("sel.z2");

    selScoreObj = {
        x1: world.scoreboard.getObjective("sel.x1"),
        y1: world.scoreboard.getObjective("sel.y1"),
        z1: world.scoreboard.getObjective("sel.z1"),

        x2: world.scoreboard.getObjective("sel.x2"),
        y2: world.scoreboard.getObjective("sel.y2"),
        z2: world.scoreboard.getObjective("sel.z2")
    };
}, 8);

let selections;

system.runInterval(() => {

    for (let player of players) {
        if (selScoreObj.x1.hasParticipant(player) && selScoreObj.x2.hasParticipant(player))
            selections = {
                x1: selScoreObj.x1.getScore(player),
                y1: selScoreObj.y1.getScore(player),
                z1: selScoreObj.z1.getScore(player),
                x2: selScoreObj.x2.getScore(player),
                y2: selScoreObj.y2.getScore(player),
                z2: selScoreObj.z2.getScore(player)
            };
        function selBox() {
            if (selScoreObj.x1.hasParticipant(player) && selScoreObj.x2.hasParticipant(player)) {
                var c = [], d = [];
                d[0] = Math.sign(selections.x2 - selections.x1 + 0.1);
                d[1] = Math.sign(selections.y2 - selections.y1 - 0.1);
                d[2] = Math.sign(selections.z2 - selections.z1 - 0.1);
                c[0] = 0.01;
                c[1] = 0.01;
                c[2] = 0.01;
                if (selections.x1 > selections.x2)
                    c[0] = 1.01;
                if (selections.y1 < selections.y2)
                    c[1] = 1.01;
                if (selections.z1 < selections.z2)
                    c[2] = 1.01;
                // overworld.runCommand("particle minecraft:obsidian_glow_dust_particle " + (selections.x1 + c[0]) + " " + (selections.y1 + c[1] - d[1]) + " " + (selections.z1 + c[2] - d[2]));
                overworld.runCommand("particle minecraft:endrod " + (selections.x1 + c[0]) + " " + (selections.y1 + c[1] - d[1]) + " " + (selections.z1 + c[2] - d[2]));
                overworld.runCommand("particle minecraft:endrod " + (selections.x1 + c[0]) + " " + (selections.y2 + c[1]) + " " + (selections.z1 + c[2] - d[2]));
                overworld.runCommand("particle minecraft:endrod " + (selections.x1 + c[0]) + " " + (selections.y1 + c[1] - d[1]) + " " + (selections.z2 + c[2]));
                overworld.runCommand("particle minecraft:endrod " + (selections.x1 + c[0]) + " " + (selections.y2 + c[1]) + " " + (selections.z2 + c[2]));
                overworld.runCommand("particle minecraft:endrod " + (selections.x2 + c[0] + d[0]) + " " + (selections.y1 + c[1] - d[1]) + " " + (selections.z1 + c[2] - d[2]));
                overworld.runCommand("particle minecraft:endrod " + (selections.x2 + c[0] + d[0]) + " " + (selections.y2 + c[1]) + " " + (selections.z1 + c[2] - d[2]));
                overworld.runCommand("particle minecraft:endrod " + (selections.x2 + c[0] + d[0]) + " " + (selections.y1 + c[1] - d[1]) + " " + (selections.z2 + c[2]));
                overworld.runCommand("particle minecraft:endrod " + (selections.x2 + c[0] + d[0]) + " " + (selections.y2 + c[1]) + " " + (selections.z2 + c[2]));
            }
        }
        function selLine() {
            var m1 = 1, m2 = 1;
            if (selections.z2 - selections.z1 != 0)
                m1 = (selections.x2 - selections.x1) / (selections.z2 - selections.z1);
            if (selections.x2 - selections.x1 != 0)
                m1 = (selections.y2 - selections.y1) / (selections.x2 - selections.x1);
            if (selections.x2 - selections.x1 != 0)
                m2 = (selections.z2 - selections.z1) / (selections.x2 - selections.x1);
            for (let i = 0; i <= Math.abs(selections.x2 - selections.x1) && Math.abs(selections.x2 - selections.x1) / 8 != 0; i += Math.abs(selections.x2 - selections.x1) / 8) {
                if (selections.x2 - selections.x1 > 0 && selections.z2 - selections.z1 || selections.x2 - selections.x1 > 0 && selections.y2 - selections.y1 || selections.x2 - selections.x1 > 0 && selections.x2 - selections.x1)
                    overworld.runCommand("particle minecraft:blue_flame_particle " + (selections.x1 + i + 0.01) + " " + (selections.y1 + m1 * i + 0.01) + " " + (selections.z1 + m2 * i + 0.01));
                else if (selections.x2 - selections.x1 < 0 && selections.z2 - selections.z1 || selections.x2 - selections.x1 < 0 && selections.y2 - selections.y1 || selections.x2 - selections.x1 < 0 && selections.x2 - selections.x1)
                    overworld.runCommand("particle minecraft:blue_flame_particle " + (selections.x1 + i + selections.x2 - selections.x1 + 0.01) + " " + (selections.y1 + m1 * i + selections.y2 - selections.y1 + 0.01) + " " + (selections.z1 + m2 * i + selections.z2 - selections.z1 + 0.01));
            }
        }
        overworld = world.getDimension("overworld");
        entities = overworld.getEntities();

        try {
            selLine();
            selBox();
        } catch (err) {
            console.warn(err);
        }
    }
}, 16);

world.beforeEvents.playerBreakBlock.subscribe((eventData) => {
    try {
        if (eventData.itemStack.nameTag == selTool && eventData.itemStack.typeId == "minecraft:stick") {
            system.run(() => {
                selScoreObj.x1.setScore(eventData.player, Math.floor(eventData.block.location.x));
                selScoreObj.y1.setScore(eventData.player, Math.floor(eventData.block.location.y));
                selScoreObj.z1.setScore(eventData.player, Math.floor(eventData.block.location.z));
                eventData.player.runCommand("titleraw @p actionbar {\"rawtext\":[{\"text\":\"Position 1 set to §d" + selScoreObj.x1.getScore(eventData.player) + ", " + selScoreObj.y1.getScore(eventData.player) + ", " + selScoreObj.z1.getScore(eventData.player) + "\\n§eDistance: " + Math.sqrt(Math.pow(selScoreObj.x2.getScore(eventData.player) - selScoreObj.x1.getScore(eventData.player), 2) + Math.pow(selScoreObj.y2.getScore(eventData.player) - selScoreObj.y1.getScore(eventData.player), 2) + Math.pow(selScoreObj.z2.getScore(eventData.player) - selScoreObj.z1.getScore(eventData.player), 2)) + "\"}]}");
                eventData.player.runCommand("playsound block.scaffolding.hit @a " + selScoreObj.x1.getScore(eventData.player) + " " + selScoreObj.y1.getScore(eventData.player) + " " + selScoreObj.z1.getScore(eventData.player));
            });
            eventData.cancel = true;
        }
    } catch (err) { }
});

world.beforeEvents.playerInteractWithBlock.subscribe((eventData) => {
    const item = eventData.itemStack;
    if (!item) return;
    if (item.nameTag == selTool && item.typeId == "minecraft:stick") {
        system.run(() => {
            selScoreObj.x2.setScore(eventData.player, Math.floor(eventData.block.location.x));
            selScoreObj.y2.setScore(eventData.player, Math.floor(eventData.block.location.y));
            selScoreObj.z2.setScore(eventData.player, Math.floor(eventData.block.location.z));
            eventData.player.runCommand("titleraw @p actionbar {\"rawtext\":[{\"text\":\"Position 2 set to §b" + Math.floor(eventData.block.location.x) + ", " + Math.floor(eventData.block.location.y) + ", " + Math.floor(eventData.block.location.z) + "\\n§eDistance: " + Math.sqrt(Math.pow(selScoreObj.x2.getScore(eventData.player) - selScoreObj.x1.getScore(eventData.player), 2) + Math.pow(selScoreObj.y2.getScore(eventData.player) - selScoreObj.y1.getScore(eventData.player), 2) + Math.pow(selScoreObj.z2.getScore(eventData.player) - selScoreObj.z1.getScore(eventData.player), 2)) + "\"}]}");
            eventData.player.runCommand("playsound block.scaffolding.break @a " + selScoreObj.x2.getScore(eventData.player) + " " + selScoreObj.y2.getScore(eventData.player) + " " + selScoreObj.z2.getScore(eventData.player));
        });
        eventData.cancel = true;
    }
});

//--------------------------------------------------------------------
//----------------------------COMMANDS--------------------------------
//--------------------------------------------------------------------
const cmdList = ["set", "noise", "shape", "shoot", "up", "distance", "age", "delete", "mode", "calc", "help"];

let cmdSelections;

function matchCmd(cmd, sender) {
    cmdSelections = {
        x1: selScoreObj.x1.getScore(sender),
        y1: selScoreObj.y1.getScore(sender),
        z1: selScoreObj.z1.getScore(sender),

        x2: selScoreObj.x2.getScore(sender),
        y2: selScoreObj.y2.getScore(sender),
        z2: selScoreObj.z2.getScore(sender)
    };

    // c, s, a, sp Chamge sender's gamemodes
    simple.gamemodeCmd({
        sender: sender,
        cmd: cmd[0]
    });

    // help, h, ? => Gives list of commands
    simple.helpCmd({
        sender: sender,
        cmd: cmd[0],
        cmdList: cmdList
    });

    // pos => Set selection points
    simple.posCmd({
        sender: sender,
        cmd: cmd[0],
        number: cmd[1],
        cmdSelections: cmdSelections,
        selScoreObj: selScoreObj
    });

    // set => Fills selection with a given block type
    fills.setCmd({
        sender: sender,
        cmd: cmd[0],
        block: cmd[1],
        blockState: cmd[2],
        mode: cmd[3],
        replacedBlock: cmd[4],
        cmdSelections: cmdSelections
    });

    fills.delCmd({
        cmd: cmd[0],
        sender: sender,
        cmdSelections: cmdSelections
    });

    // stack => Copies and pastes selection in a row
    fills.stackCmd({
        sender: sender,
        cmd: cmd[0],
        repetition: cmd[1],
        includeEntities: cmd[2],
        cmdSelections: cmdSelections
    });

    // noise => Noise-related commands, i.e. perlin noise and static generation
    gen.noiseCmd({
        sender: sender,
        cmd: cmd,
        cmdSelections: cmdSelections
    });

    // shape => Generate various 3D shapes
    gen.shapeCmd({
        sender: sender,
        cmd: cmd
    });

    // shoot => "Shoots" a straight line where sender's facing
    fills.shootCmd({
        sender: sender,
        cmd: cmd
    });

    // dis => Calculate the distance between selections 1 and 2
    simple.disCmd({
        cmd: cmd[0],
        cmdSelections: cmdSelections
    });

    // age => Tells the current tick of the world
    simple.ageCmd({
        cmd: cmd[0]
    });

    // calc => Evaluates an expression.
    fills.calcCmd({
        cmd: cmd
    });


    // mode => Changes mode of something
    if (cmd[0] == "mode") {
        if (cmd[1]) {
            system.run(() => {
                if (cmd[1] == "flySpeed") {
                    if (!world.scoreboard.getObjective("_flySpeed"))
                        world.scoreboard.addObjective("_flySpeed");
                    else
                        var flySpeed = world.scoreboard.getObjective("_flySpeed");
                    if (Number(cmd[2]) > 1 && Number.isInteger(Number(cmd[2]))) {
                        flySpeed.setScore(sender, Number(cmd[2]));
                        overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"Set fly speed to " + cmd[2] + "\"}]}");
                    }
                    else {
                        flySpeed.removeParticipant(sender);
                        overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"Fly speed is now default\"}]}");
                    }
                }
                if (cmd[1] == "placement" && cmd[2] == "force") {
                    sender.addTag("_force");
                    sender.removeTag("_replace");
                } else if (cmd[1] == "placement" && cmd[2] == "replace") {
                    sender.addTag("_replace");
                    sender.removeTag("_force");
                } else if (cmd[1] == "placement" && cmd[2] == "normal") {
                    sender.removeTag("_force");
                    sender.removeTag("_replace");
                }
                else if (cmd[1] == "pointy" && cmd[2] == "move") {
                    sender.removeTag("__tp");
                }
                else if (cmd[1] == "pointy" && cmd[2] == "teleport") {
                    sender.addTag("__tp");
                }
                if (cmd[1] == "placement" && (cmd[2] == "force" || cmd[2] == "replace" || cmd[2] == "normal"))
                    overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"Updated placement mode\"}]}");
                else if (cmd[1] == "pointy" && (cmd[2] == "teleport" || cmd[2] == "move"))
                    overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"Updated pointy mode\"}]}");
                if (cmd[1] == "pointy" && !cmd[2]) overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"" + fun.pref + "mode pointy <move/teleport>\"}]}");
                if (cmd[1] == "placement" && !cmd[2]) overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"" + fun.pref + "mode placement <force/replace/normal>\"}]}");
            });
        } else system.run(() => {
            overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"" + fun.pref + "mode <placement/pointy> <mode type>\"}]}");
        });
    }







    // else if (cmd[0] == "gen") {
    //     //gen 9, h 5
    //     system.run(() => {
    //         //overworld.runCommand("fill " + Math.min(x_1, x_2) + " " + Math.min(y_1, y_2) + " " + Math.min(z_1, z_2) + " gold_block");
    //         var maze = fun.generateMaze(Math.abs(x_2 - x_1), Math.abs(z_2 - z_1), Number(cmd[1]));
    //         var i = 0;
    //         var scale = Number(cmd[1]), height = Number(cmd[2]);
    //         function rand(min, max) {
    //             return Math.floor(Math.random() * (max - min + 1)) + min;
    //         }

    //         function buildFeatures(i, j) {
    //             overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - 1) + " " + (Math.min(y_1, y_2) + 1) + " " + (Math.min(z_1, z_2) + j + scale / 2 - 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + 1) + " " + (Math.min(y_1, y_2) + 1) + " " + (Math.min(z_1, z_2) + j - scale / 2 + 1) + " grass");
    //             overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - 1) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j + scale / 2 - 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + 1) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j - scale / 2 + 1) + " iron_bars");
    //             overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - 2) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j + scale / 2 - 2) + " " + (Math.min(x_1, x_2) + i - scale / 2 + 2) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j - scale / 2 + 2) + " azalea_leaves_flowered");
    //         }
    //         var tim = system.runInterval(() => {
    //             if (i <= Math.abs(x_2 - x_1)) {
    //                 //try {
    //                 for (let j = 0; j <= Math.abs(z_2 - z_1); j++) {
    //                     if (maze[i][j] == 1)
    //                         overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2) + " " + (Math.min(y_1, y_2)) + " " + (Math.min(z_1, z_2) + j + scale / 2) + " " + (Math.min(x_1, x_2) + i - scale / 2) + " " + (Math.min(y_1, y_2)) + " " + (Math.min(z_1, z_2) + j - scale / 2) + " stone");
    //                     else if (maze[i][j] == 2 || maze[i][j] == 3) {
    //                         overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 + 1) + " " + (Math.min(y_1, y_2)) + " " + (Math.min(z_1, z_2) + j + scale / 2 + 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 - 1) + " " + (Math.min(y_1, y_2) + 1) + " " + (Math.min(z_1, z_2) + j - scale / 2 - 1) + " smooth_stone");
    //                         if (Math.random() <= 0.85)
    //                             fun.buildHouse(i, j, x_1, x_2, y_1, y_2, z_1, z_2, scale, height, sender.dimension, maze[i][j])
    //                         else {
    //                             buildFeatures(i, j);
    //                         }
    //                     }

    //                 }
    //                 //} catch (err) { }
    //                 i++;
    //             } else system.clearRun(tim);
    //             if (world.gameRules.sendCommandFeedback == true)
    //                 overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(y_2 - y_1) + 1)) / 100) + "%\"}]}");
    //         }, 1);

    //     });
    // }




}
world.beforeEvents.chatSend.subscribe((eventData) => {
    if (eventData.message.substr(0, 1) == fun.pref) {
        eventData.cancel = true;
        matchCmd(eventData.message.substr(1, eventData.message.length).split(" "), eventData.sender);
    }
});

world.beforeEvents.playerPlaceBlock.subscribe((eventData) => {
    if (eventData.player.hasTag("_force") || eventData.player.hasTag("_replace")) {
        eventData.cancel = true;
    }
});
world.beforeEvents.playerInteractWithBlock.subscribe((eventData) => {
    let loc = eventData.block, fac = eventData.blockFace;
    let vx = 0, vy = 0, vz = 0;
    if (eventData.player.hasTag("_force")) {
        eventData.cancel = true;
        if (fac == "West") vx = -1;
        else if (fac == "East") vx = 1;
        if (fac == "North") vz = -1;
        else if (fac == "South") vz = 1;
        if (fac == "Down") vy = -1;
        else if (fac == "Up") vy = 1;

        system.run(() => {
            eventData.player.runCommand("setblock " + (loc.x + vx) + " " + (loc.y + vy) + " " + (loc.z + vz) + " " + eventData.itemStack.typeId);
        });
    }
    if (eventData.player.hasTag("_replace")) {
        system.run(() => {
            eventData.player.runCommand("setblock " + loc.x + " " + loc.y + " " + loc.z + " " + eventData.itemStack.typeId);
        });
    }
});
world.afterEvents.itemUse.subscribe((eventData) => {
    if (eventData.itemStack.typeId == "minecraft:arrow" && eventData.itemStack.nameTag == pointyTool) {
        let source = eventData.source;
        let selectionPos = {
            x1: selScoreObj.x1.getScore(source),
            y1: selScoreObj.y1.getScore(source),
            z1: selScoreObj.z1.getScore(source),

            x2: selScoreObj.x2.getScore(source),
            y2: selScoreObj.y2.getScore(source),
            z2: selScoreObj.z2.getScore(source)
        };

        let vcoords = {
            x1: Math.min(selectionPos.x1, selectionPos.x2),
            y1: Math.min(selectionPos.y1, selectionPos.y2),
            z1: Math.min(selectionPos.z1, selectionPos.z2),

            x2: Math.max(selectionPos.x1, selectionPos.x2),
            y2: Math.max(selectionPos.y1, selectionPos.y2),
            z2: Math.max(selectionPos.z1, selectionPos.z2)
        };

        if (!eventData.source.hasTag("__tp")) {
            let facX = -Math.round(Math.round(eventData.source.getRotation().x * 3 / 100) / 3), facY = -(Math.round(Math.round(eventData.source.getRotation().y * 4 / 100) / 4) - Math.abs(facX) * Math.round(Math.round(eventData.source.getRotation().y * 4 / 100) / 4)), cxz = 1 - Math.abs(facY);
            let facString;
            if ((facY == 2 || facY == -2) && facX == 0)
                facString = "North";
            else if (facY == 0 && facX == 0)
                facString = "South";
            else if (facY == 1 && facX == 0)
                facString = "East";
            else if (facY == -1 && facX == 0)
                facString = "West";
            else if (facX == 1)
                facString = "Up";
            else if (facX == -1)
                facString = "Down";
            try {
                source.runCommand("title @s actionbar Direction: §d" + facString);
                if (facX != 0) {
                    system.run(() => {
                        overworld.runCommand("structure save my " + vcoords.x1 + " " + vcoords.y1 + " " + vcoords.z1 + " " + vcoords.x2 + " " + vcoords.y2 + " " + vcoords.z2 + " false");
                        overworld.runCommand("fill " + vcoords.x1 + " " + vcoords.y1 + " " + vcoords.z1 + " " + vcoords.x2 + " " + vcoords.y2 + " " + vcoords.z2 + " air []");
                        overworld.runCommand("structure load my " + vcoords.x1 + " " + (vcoords.y1 + facX) + " " + vcoords.z1);
                        overworld.runCommand("execute positioned " + vcoords.x1 + " " + vcoords.y1 + " " + vcoords.z1 + " as @e[dx=" + (vcoords.x2 - vcoords.x1) + ",dy=" + (vcoords.y2 - vcoords.y1 + 1) + ",dz=" + (vcoords.z2 - vcoords.z1) + "] at @s run tp @s ~~" + facX + "~");
                        selScoreObj.y1.addScore(source, facX);
                        selScoreObj.y2.addScore(source, facX);
                    });
                }
                else if (facX == 0) {
                    if (facY != -2 && facY != 2 && facY != 0)
                        system.run(() => {
                            overworld.runCommand("structure save my " + vcoords.x1 + " " + vcoords.y1 + " " + vcoords.z1 + " " + vcoords.x2 + " " + vcoords.y2 + " " + vcoords.z2 + " false");
                            overworld.runCommand("fill " + vcoords.x1 + " " + vcoords.y1 + " " + vcoords.z1 + " " + vcoords.x2 + " " + vcoords.y2 + " " + vcoords.z2 + " air []");
                            overworld.runCommand("structure load my " + (vcoords.x1 + facY) + " " + vcoords.y1 + " " + vcoords.z1);
                            overworld.runCommand("execute positioned " + vcoords.x1 + " " + vcoords.y1 + " " + vcoords.z1 + " as @e[dx=" + (vcoords.x2 - vcoords.x1) + ",dy=" + (vcoords.y2 - vcoords.y1) + ",dz=" + (vcoords.z2 - vcoords.z1) + "] at @s run tp @s ~" + facY + "~~");
                            selScoreObj.x1.addScore(source, facY);
                            selScoreObj.x2.addScore(source, facY);
                        });
                    else if (cxz < 2 && cxz > -2) {
                        system.run(() => {
                            overworld.runCommand("structure save my " + vcoords.x1 + " " + vcoords.y1 + " " + vcoords.z1 + " " + vcoords.x2 + " " + vcoords.y2 + " " + vcoords.z2 + " false");
                            overworld.runCommand("fill " + vcoords.x1 + " " + vcoords.y1 + " " + vcoords.z1 + " " + vcoords.x2 + " " + vcoords.y2 + " " + vcoords.z2 + " air []");
                            overworld.runCommand("structure load my " + vcoords.x1 + " " + vcoords.y1 + " " + (vcoords.z1 + cxz));
                            overworld.runCommand("execute positioned " + vcoords.x1 + " " + vcoords.y1 + " " + vcoords.z1 + " as @e[dx=" + (vcoords.x2 - vcoords.x1) + ",dy=" + (vcoords.y2 - vcoords.y1) + ",dz=" + (vcoords.z2 - vcoords.z1) + "] at @s run tp @s ~~~" + cxz);
                            selScoreObj.z1.addScore(source, cxz);
                            selScoreObj.z2.addScore(source, cxz);
                        });
                    }
                }
            } catch { source.runCommand("title @s actionbar §cError"); }
        }
        else if (eventData.source.hasTag("__tp")) {
            try {
                let vx = 0, vy = 0, vz = 0;
                let blocc = eventData.source.getBlockFromViewDirection().block, fac = eventData.source.getBlockFromViewDirection().face;
                if (fac == "West") vx = -1;
                else if (fac == "East") vx = 1;
                if (fac == "North") vz = -1;
                else if (fac == "South") vz = 1;
                if (fac == "Down") vy = -1;
                else if (fac == "Up") vy = 1;
                eventData.source.teleport({ x: blocc.x + vx, y: blocc.y + vy, z: blocc.z + vz });
            } catch (err) { eventData.source.runCommand("title @s actionbar Error: §cToo far") }
        }
    }
});
system.runInterval(() => {
    for (let player of players) {
        if (player.isSprinting && player.isFlying) {
            let flySpeed = world.scoreboard.getObjective("_flySpeed");
            if (flySpeed.getScore(player) > 1) {
                let vewx = player.getViewDirection().x, vewz = player.getViewDirection().z;
                // player.applyKnockback(vewx, vewz, flySpeed.getScore(player) / 2, flySpeed.getScore(player) * player.getViewDirection().y / 2);
                player.applyKnockback({ x: vewx * flySpeed.getScore(player) / 2, z: vewz * flySpeed.getScore(player) / 2 }, flySpeed.getScore(player) * player.getViewDirection().y / 2);
            }
        }
    }
});