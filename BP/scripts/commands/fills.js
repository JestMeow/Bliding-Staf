import { world, system } from "@minecraft/server";

let overworld;

system.run(() => {
    overworld = world.getDimension("overworld");
});

export function setCmd({ sender, cmd, block, blockState, mode, replacedBlock, cmdSelections }) {
    if (cmd == "set") {
        system.run(() => {
            function filly(c1, c2 = "[]", c3 = "replace", c4 = "") {
                overworld.runCommand("fill " + cmdSelections.x1 + " " + (Math.min(cmdSelections.y1, cmdSelections.y2) + i) + " " + cmdSelections.z1 + " " + cmdSelections.x2 + " " + (Math.min(cmdSelections.y1, cmdSelections.y2) + i) + " " + cmdSelections.z2 + " " + c1 + " " + c2 + " " + c3 + " " + c4);
            }
            let i = 0;
            let tim = system.runInterval(() => {
                if (i <= Math.abs(cmdSelections.y2 - cmdSelections.y1)) {
                    filly(block, blockState, mode, replacedBlock)
                    i++;
                } else system.clearRun(tim);
                if (world.gameRules.sendCommandFeedback == true)
                    overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(cmdSelections.y2 - cmdSelections.y1) + 1)) / 100) + "%\"}]}");
            }, 1);
        });
    }
}

export function delCmd({ cmd, sender, cmdSelections }) {
    if (cmd == "del" || cmd == "delete")
        system.run(() => {
            var i = 0;
            var tim = system.runInterval(() => {
                if (i <= Math.abs(cmdSelections.y2 - cmdSelections.y1)) {
                    overworld.runCommand("fill " + cmdSelections.x1 + " " + (Math.min(cmdSelections.y1, cmdSelections.y2) + i) + " " + cmdSelections.z1 + " " + cmdSelections.x2 + " " + (Math.min(cmdSelections.y1, cmdSelections.y2) + i) + " " + cmdSelections.z2 + " air");
                    i++;
                } else system.clearRun(tim);
                if (world.gameRules.sendCommandFeedback == true)
                    overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(cmdSelections.y2 - cmdSelections.y1) + 1)) / 100) + "%\"}]}");
            }, 1);
        });
}


let face

export function stackCmd({ sender, cmd, repetition, includeEntities, cmdSelections }) {
    if (cmd == "stack") {
        face = {
            x: -Math.round(Math.round(sender.getRotation().x * 3 / 100) / 3),
            y: -(Math.round(Math.round(sender.getRotation().y * 4 / 100) / 4) - Math.abs(Math.round(Math.round(sender.getRotation().x * 3 / 100) / 3)/*face.x*/) * Math.round(Math.round(sender.getRotation().y * 4 / 100) / 4))
        };
        let facString;

        if ((face.y == 2 || face.y == -2) && face.x == 0)
            facString = "North";
        else if (face.y == 0 && face.x == 0)
            facString = "South";
        else if (face.y == 1 && face.x == 0)
            facString = "East";
        else if (face.y == -1 && face.x == 0)
            facString = "West";
        else if (face.x == 1)
            facString = "Up";
        else if (face.x == -1)
            facString = "Down";


        system.run(() => {
            sender.runCommand("title @s actionbar Direction: §d" + facString);
            function stackySave(c2 = "") {
                overworld.runCommand("structure save stacky " + Math.min(cmdSelections.x1, cmdSelections.x2) + " " + Math.min(cmdSelections.y1, cmdSelections.y2) + " " + Math.min(cmdSelections.z1, cmdSelections.z2) + " " + Math.max(cmdSelections.x1, cmdSelections.x2) + " " + Math.max(cmdSelections.y1, cmdSelections.y2) + " " + Math.max(cmdSelections.z1, cmdSelections.z2) + " " + c2);
            }
            stackySave(includeEntities);
            for (let i = 0; i <= repetition; i++) {
                if ((face.y == 2 || face.y == -2) && face.x == 0)
                    overworld.runCommand("structure load stacky " + Math.min(cmdSelections.x1, cmdSelections.x2) + " " + Math.min(cmdSelections.y1, cmdSelections.y2) + " " + (Math.min(cmdSelections.z1, cmdSelections.z2) - (Math.abs(cmdSelections.z1 - cmdSelections.z2) + 1) * i));
                else if (face.y == 0 && face.x == 0)
                    overworld.runCommand("structure load stacky " + Math.min(cmdSelections.x1, cmdSelections.x2) + " " + Math.min(cmdSelections.y1, cmdSelections.y2) + " " + (Math.min(cmdSelections.z1, cmdSelections.z2) + (Math.abs(cmdSelections.z1 - cmdSelections.z2) + 1) * i));
                else if (face.y == 1 && face.x == 0)
                    overworld.runCommand("structure load stacky " + (Math.min(cmdSelections.x1, cmdSelections.x2) + (Math.abs(cmdSelections.x1 - cmdSelections.x2) + 1) * i) + " " + Math.min(cmdSelections.y1, cmdSelections.y2) + " " + Math.min(cmdSelections.z1, cmdSelections.z2));
                else if (face.y == -1 && face.x == 0)
                    overworld.runCommand("structure load stacky " + (Math.min(cmdSelections.x1, cmdSelections.x2) - (Math.abs(cmdSelections.x1 - cmdSelections.x2) + 1) * i) + " " + Math.min(cmdSelections.y1, cmdSelections.y2) + " " + Math.min(cmdSelections.z1, cmdSelections.z2));
                else if (face.x == 1)
                    overworld.runCommand("structure load stacky " + Math.min(cmdSelections.x1, cmdSelections.x2) + " " + (Math.min(cmdSelections.y1, cmdSelections.y2) + (Math.abs(cmdSelections.y1 - cmdSelections.y2) + 1) * i) + " " + Math.min(cmdSelections.z1, cmdSelections.z2));
                else if (face.x == -1)
                    overworld.runCommand("structure load stacky " + Math.min(cmdSelections.x1, cmdSelections.x2) + " " + (Math.min(cmdSelections.y1, cmdSelections.y2) - (Math.abs(cmdSelections.y1 - cmdSelections.y2) + 1) * i) + " " + Math.min(cmdSelections.z1, cmdSelections.z2));
            }
        });
    }
}

export function shootCmd({ sender, cmd }) {
    if (cmd[0] == "shoot" && cmd[1] != undefined) {
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
}



export function calcCmd({ cmd }) {
    if (cmd[0] == "calc")
        if (!cmd[2])
            try {
                world.sendMessage("Output: " + Math.eval(cmd[1]));
            } catch (err) {
                world.sendMessage(err);
            }
        else
            world.sendMessage("Expression must not contain spaces.")
}