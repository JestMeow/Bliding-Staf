console.warn("Working...");

import { world, system } from "@minecraft/server";

let overworld = world.getDimension("overworld");
let entities = overworld.getEntities();

const pref = "_";

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
}, 5);

function matchFunc(cmd, target) {
    if (cmd[0] == "a" && cmd[1] == "b") {
        console.warn("A");
        target.removeTag(pref + cmd[0] + "." + cmd[1]);
    }
    /*else if (cmd[0] == "sin" && cmd[1]) {
        if (cmd[2] == "deg") {
            world.scoreboard.getObjective(cmd[1]).setScore(target, Math.sin(world.scoreboard.getObjective(cmd[1]).getScore(target) * Math.PI / 180000) * 1000);
        } else if (cmd[2] == "rad") {
            world.scoreboard.getObjective(cmd[1]).setScore(target, Math.sin(world.scoreboard.getObjective(cmd[1]).getScore(target) / 1000) * 1000);
        }
        target.removeTag(pref + cmd[0] + "." + cmd[1] + "." + cmd[2]);
    }
    else if (cmd[0] == "cos" && cmd[1]) {
        if (cmd[2] == "deg") {
            world.scoreboard.getObjective(cmd[1]).setScore(target, Math.cos(world.scoreboard.getObjective(cmd[1]).getScore(target) * Math.PI / 180000) * 1000);
        } else if (cmd[2] == "rad") {
            world.scoreboard.getObjective(cmd[1]).setScore(target, Math.cos(world.scoreboard.getObjective(cmd[1]).getScore(target) / 1000) * 1000);
        }
        target.removeTag(pref + cmd[0] + "." + cmd[1] + "." + cmd[2]);
    }
    else if (cmd[0] == "tan" && cmd[1]) {
        if (cmd[2] == "deg") {
            world.scoreboard.getObjective(cmd[1]).setScore(target, Math.tan(world.scoreboard.getObjective(cmd[1]).getScore(target) * Math.PI / 180000) * 1000);
        } else if (cmd[2] == "rad") {
            world.scoreboard.getObjective(cmd[1]).setScore(target, Math.tan(world.scoreboard.getObjective(cmd[1]).getScore(target) / 1000) * 1000);
        }
        target.removeTag(pref + cmd[0] + "." + cmd[1] + "." + cmd[2]);
    }*/
    else if (cmd[2] == "deg") {
        if (cmd[0] == "sin") world.scoreboard.getObjective(cmd[1]).setScore(target, Math.sin(world.scoreboard.getObjective(cmd[1]).getScore(target) * Math.PI / 180000) * 1000);
        else if (cmd[0] == "cos") world.scoreboard.getObjective(cmd[1]).setScore(target, Math.cos(world.scoreboard.getObjective(cmd[1]).getScore(target) * Math.PI / 180000) * 1000);
        else if (cmd[0] == "tan") world.scoreboard.getObjective(cmd[1]).setScore(target, Math.tan(world.scoreboard.getObjective(cmd[1]).getScore(target) * Math.PI / 180000) * 1000);
        target.removeTag(pref + cmd[0] + "." + cmd[1] + "." + cmd[2]);
    }
    else if (cmd[2] == "rad") {
        if (cmd[0] == "sin") world.scoreboard.getObjective(cmd[1]).setScore(target, Math.sin(world.scoreboard.getObjective(cmd[1]).getScore(target) / 1000) * 1000);
        else if (cmd[0] == "cos") world.scoreboard.getObjective(cmd[1]).setScore(target, Math.cos(world.scoreboard.getObjective(cmd[1]).getScore(target) / 1000) * 1000);
        else if (cmd[0] == "tan") world.scoreboard.getObjective(cmd[1]).setScore(target, Math.tan(world.scoreboard.getObjective(cmd[1]).getScore(target) / 1000) * 1000);
        target.removeTag(pref + cmd[0] + "." + cmd[1] + "." + cmd[2]);
    }
}

system.runInterval(() => {
    for (let entity of entities) {
        for (let tag of entity.getTags()) {
            if (tag.substr(0, 1) == pref) {
                matchFunc(tag.substr(1, tag.length).split("."), entity);
            }
        }
    }
}, 5);