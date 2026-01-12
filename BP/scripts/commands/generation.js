import { world, system } from "@minecraft/server";
import * as fun from "../functions.js";

let overworld;

system.run(() => {
    overworld = world.getDimension("overworld");
});

export function noiseCmd({ sender, cmd, cmdSelections }) {
    if (cmd[0] == "noise") {
        // Base function for 2D perlin noise?
        function perlin2d(c5, c6 = "[]", c7 = "replace", c8 = "") {
            let i = 0;
            var tim = system.runInterval(() => {
                if (i <= Math.abs(cmdSelections.x2 - cmdSelections.x1)) {
                    for (let j = 0; j <= Math.abs(cmdSelections.z2 - cmdSelections.z1); j++) {
                        try {
                            overworld.runCommand("fill " + (cmdSelections.x1 + (i * Math.sign(cmdSelections.x2 - cmdSelections.x1))) + " " + Math.min(cmdSelections.y1, cmdSelections.y2) + " " + (cmdSelections.z1 + (j * Math.sign(cmdSelections.z2 - cmdSelections.z1))) + " " + (cmdSelections.x1 + (i * Math.sign(cmdSelections.x2 - cmdSelections.x1))) + " " + (Math.min(cmdSelections.y1, cmdSelections.y2) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (cmdSelections.x1 + (i * Math.sign(cmdSelections.x2 - cmdSelections.x1))), Number(cmd[3]) * (cmdSelections.z1 + (j * Math.sign(cmdSelections.z2 - cmdSelections.z1))))) + " " + (cmdSelections.z1 + (j * Math.sign(cmdSelections.z2 - cmdSelections.z1))) + " " + c5 + " " + c6 + " " + c7 + " " + c8);
                            if (cmd[1] == "grass")
                                overworld.runCommand("setblock " + (cmdSelections.x1 + (i * Math.sign(cmdSelections.x2 - cmdSelections.x1))) + " " + (1 + Math.min(cmdSelections.y1, cmdSelections.y2) + Number(cmd[2]) * fun.noise(Number(cmd[3]) * (cmdSelections.x1 + (i * Math.sign(cmdSelections.x2 - cmdSelections.x1))), Number(cmd[3]) * (cmdSelections.z1 + (j * Math.sign(cmdSelections.z2 - cmdSelections.z1))))) + " " + (cmdSelections.z1 + (j * Math.sign(cmdSelections.z2 - cmdSelections.z1))) + " grass_block []");
                        } catch (err) {
                            world.sendMessage("Error: §c" + err);
                            system.clearRun(tim);
                            break;
                        }
                    }
                    i++;
                } else system.clearRun(tim);
                if (world.gameRules.sendCommandFeedback == true)
                    overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(cmdSelections.x2 - cmdSelections.x1) + 1)) / 100) + "%\"}]}");
            }, 1);
        }
        fun.noiseSeed(Number(cmd[4]));
        system.run(() => {
            if (cmd[1] == "gen") {
                perlin2d(cmd[5], cmd[6], cmd[7], cmd[8]);
            }
            else if (cmd[1] == "grass") {
                perlin2d("dirt", cmd[6], cmd[7], cmd[8]);
            }
            else if (cmd[1] == "fillStatic") {
                let i = 0, m = 2, vx1 = cmdSelections.x1, vy1 = cmdSelections.y1, vz1 = cmdSelections.z1, vx2 = cmdSelections.x2, vy2 = cmdSelections.y2, vz2 = cmdSelections.z2, block;
                let blocks = [], weight = [], pass = true;
                let n = 2;
                for (let j = 0; j < cmd.length - 2; j++) {
                    if (j % 2 == 0) {
                        if (Number.isInteger(Number(cmd[n])))
                            weight.push(Number(cmd[n]));
                        else {
                            overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"§cError: §rSyntax error.\"}]}");
                            pass = false;
                            break;
                        }
                    }
                    else blocks.push(cmd[n]);
                    n++;
                }
                for (let j = 0; j < weight.length; j++) {
                    for (let k = 0; k < weight[j]; k++) {
                        blocks.push(blocks[j]);
                    }
                }
                if (cmd[2] && pass == true)
                    var tim = system.runInterval(() => {
                        if (i <= Math.abs(vx2 - vx1)) {
                            let j = 0;
                            m = 0;
                            var tim2 = system.runInterval(() => {
                                if (j <= Math.abs(vy2 - vy1)) {
                                    for (let k = 0; k <= Math.abs(vz2 - vz1); k++) {
                                        block = blocks[Math.floor(Math.random() * blocks.length)];
                                        overworld.runCommand("setblock " + (Math.min(vx1, vx2) + i - 1) + " " + (Math.min(vy1, vy2) + j) + " " + (Math.min(vz1, vz2) + k) + " " + block);
                                    }
                                } else system.clearRun(tim2);
                                j++;
                            });
                        } else system.clearRun(tim);
                        i++;
                        if (world.gameRules.sendCommandFeedback == true)
                            overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(vx2 - vx1) + 2)) / 100) + "%\"}]}");
                    }, (Math.abs(vy2 - vy1) + m));
            }
            else if (cmd[1] == "keepStatic") {
                let i = 0, m = 2, vx1 = cmdSelections.x1, vy1 = cmdSelections.y1, vz1 = cmdSelections.z1, vx2 = cmdSelections.x2, vy2 = cmdSelections.y2, vz2 = cmdSelections.z2, block;
                let blocks = [], weight = [], pass = true;
                let n = 2;
                for (let j = 0; j < cmd.length - 2; j++) {
                    if (j % 2 == 0) {
                        if (Number.isInteger(Number(cmd[n])))
                            weight.push(Number(cmd[n]));
                        else {
                            overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"§cError: §rSyntax error.\"}]}");
                            pass = false;
                            break;
                        }
                    }
                    else blocks.push(cmd[n]);
                    n++;
                }
                for (let j = 0; j < weight.length; j++) {
                    for (let k = 0; k < weight[j]; k++) {
                        blocks.push(blocks[j]);
                    }
                }
                if (cmd[2] && pass == true)
                    var tim = system.runInterval(() => {
                        if (i <= Math.abs(vx2 - vx1)) {
                            let j = 0;
                            m = 0;
                            var tim2 = system.runInterval(() => {
                                if (j <= Math.abs(vy2 - vy1)) {
                                    for (let k = 0; k <= Math.abs(vz2 - vz1); k++) {
                                        block = blocks[Math.floor(Math.random() * blocks.length)];
                                        overworld.runCommand("setblock " + (Math.min(vx1, vx2) + i - 1) + " " + (Math.min(vy1, vy2) + j) + " " + (Math.min(vz1, vz2) + k) + " " + block + " [] keep");
                                    }
                                } else system.clearRun(tim2);
                                j++;
                            });
                        } else system.clearRun(tim);
                        i++;
                        if (world.gameRules.sendCommandFeedback == true)
                            overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(vx2 - vx1) + 2)) / 100) + "%\"}]}");
                    }, (Math.abs(vy2 - vy1) + m));
            }

            else if (cmd[1] == "fillPerlin") {

                //1 = fillPerlin, 2 = Amplitude, 3 = frequency, 4 = Seed, 5 = n, 6 = block
                //.noise fillPerlin 0.05 0.5 10 1 stone 3 air 1 stone
                //.noise fillPerlin 0.36 0.5 10 2 mud_bricks 2 packed_mud 4 dirt_with_roots

                //Thank you past self for writing the command format ^

                fun.noiseSeed(Number(cmd[4]));

                let i = 0, m = 2, vx1 = cmdSelections.x1, vy1 = cmdSelections.y1, vz1 = cmdSelections.z1, vx2 = cmdSelections.x2, vy2 = cmdSelections.y2, vz2 = cmdSelections.z2, block, rand;
                let blocks = [], weight = [], pass = true;
                let n = 5;
                for (let j = 0; j < cmd.length - 5; j++) {
                    if (j % 2 == 0) {
                        if (Number.isInteger(Number(cmd[n])))
                            weight.push(Number(cmd[n]));
                        else {
                            overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"§cError: §rSyntax error.\"}]}");
                            pass = false;
                            break;
                        }
                    }
                    else blocks.push(cmd[n]);
                    n++;
                }
                for (let j = 0; j < weight.length; j++) {
                    for (let k = 0; k < weight[j]; k++) {
                        blocks.push(blocks[j]);
                    }
                }
                if (cmd[5] && pass == true)
                    var tim = system.runInterval(() => {
                        if (i <= Math.abs(vx2 - vx1)) {
                            let j = 0;
                            m = 0;
                            var tim2 = system.runInterval(() => {
                                if (j <= Math.abs(vy2 - vy1)) {
                                    for (let k = 0; k <= Math.abs(vz2 - vz1); k++) {
                                        rand = Number(cmd[3]) * fun.noise(Number(cmd[2]) * (Math.min(vx1, vx2) + i - 1), Number(cmd[2]) * (Math.min(vy1, vy2) + j), Number(cmd[2]) * (Math.min(vz1, vz2) + k));
                                        block = blocks[Math.floor(rand * blocks.length)];
                                        overworld.runCommand("setblock " + (Math.min(vx1, vx2) + i - 1) + " " + (Math.min(vy1, vy2) + j) + " " + (Math.min(vz1, vz2) + k) + " " + block + " []");
                                    }
                                } else system.clearRun(tim2);
                                j++;
                            });
                        } else system.clearRun(tim);
                        i++;
                        if (world.gameRules.sendCommandFeedback == true)
                            overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (Math.abs(vx2 - vx1) + 2)) / 100) + "%\"}]}");
                    }, (Math.abs(vy2 - vy1) + m));
            }
            else if (!cmd[1])
                overworld.runCommand("tellraw " + sender.name + " {\"rawtext\":[{\"text\":\"" + fun.pref + "noise <grass/gen> <amplitude> <frequency> <seed> <block(gen)>\"}]}");
        });
    }
}

export function shapeCmd({ sender, cmd }) {
    // There are definately better ways to generate these shapes. I'll update it later thoughn.
    if (cmd[0] == "shape") {
        system.run(() => {
            function shapeSetblock(c3, c4 = "[]", c5 = "replace", j, k) {
                overworld.runCommand("setblock " + (px - r + i) + " " + (py - r + j) + " " + (pz - r + k) + " " + c3 + " " + c4 + " " + c5);
            }
            if (cmd[1] == "sphere") {
                var i = 0;
                var px = Math.floor(sender.location.x), py = Math.floor(sender.location.y), pz = (sender.location.z);
                var d = 2 * Number(cmd[2]);
                var r = Number(cmd[2]);
                if (cmd[2]) {
                    try {
                        overworld.runCommand("tp " + sender.nameTag + " " + px + " " + (py + r + 1) + " " + pz);
                        var tim = system.runInterval(() => {
                            if (i <= d) {
                                for (let j = 0; j <= d; j++) {
                                    for (let k = 0; k <= d; k++) {
                                        if (fun.distance(px, py, pz, px - r + i, py - r + j, pz - r + k) <= r) {
                                            shapeSetblock(cmd[3], cmd[4], cmd[5], j, k);
                                        } else continue;
                                    }
                                }
                            } else system.clearRun(tim);
                            i++;
                            if (world.gameRules.sendCommandFeedback == true)
                                overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * i / (d + 2)) / 100) + "%\"}]}");
                        });
                    } catch (e) { world.sendMessage("[Error]: " + fun.pref + "shape <shape> <cmd[2]> <cmd[3]> <cmd[4]> " + e); }
                }
            }
            else if (cmd[1] == "cone" || cmd[1] == "cylinder") {
                function genShape(cb = new function () { }) {
                    var tim = system.runInterval(() => {
                        if (i <= Math.max(h, r)) {
                            cb();
                        } else {
                            blocc = V;
                            system.clearRun(tim);
                        }
                        i++;
                        if (world.gameRules.sendCommandFeedback == true)
                            overworld.runCommand("titleraw " + sender.name + " actionbar {\"rawtext\":[{\"text\":\"Progress: §e" + (Math.round(10000 * blocc / V) / 100) + "%\"}]}");
                    });
                }
                function shaperSetBlock(c7, c8 = "[]", c9 = "replace", c10 = "", j, k) {
                    overworld.runCommand("setblock " + (px + i) + " " + (py + j) + " " + (pz + k) + " " + c7 + " " + c8 + " " + c9 + " " + c10);
                }
                if (cmd[1] == "cone") {
                    var px = Math.floor(sender.location.x), py = Math.floor(sender.location.y), pz = (sender.location.z);
                    var d = 2 * Number(cmd[2]);
                    var r = Number(cmd[2]);
                    var h = Number(cmd[3]);
                    var blocc = 0;
                    var i = -Math.max(h, r);
                    var ax, ay, az;
                    var V = Math.ceil(Math.PI * r * r * h / 3) + 2;
                    genShape(function () {
                        for (let j = -Math.max(h, r); j <= Math.max(h, r); j += Math.sign(Math.max(h, r))) {
                            for (let k = -Math.max(h, r); k <= Math.max(h, r); k++) {
                                ax = i * fun.cos(Number(cmd[5])) + (j * fun.cos(Number(cmd[6])) - k * fun.sin(Number(cmd[6]))) * fun.sin(Number(cmd[5]));
                                ay = (j * fun.cos(Number(cmd[6])) - k * fun.sin(Number(cmd[6]))) * fun.cos(Number(cmd[5])) - i * fun.sin(Number(cmd[5]));
                                az = k * fun.cos(Number(cmd[6])) + j * fun.sin(Number(cmd[6]));
                                if (Math.pow(ax, 2) + Math.pow(az, 2) - (r * r * Math.pow(ay - h, 2)) / (h * h) <= 0 && ay <= h && ay >= 0) {
                                    blocc++;
                                    shaperSetBlock(cmd[7], cmd[8], cmd[9], cmd[10], j, k);
                                }
                            }
                        }
                    });
                }
                else if (cmd[1] == "cylinder") {
                    var px = Math.floor(sender.location.x), py = Math.floor(sender.location.y), pz = (sender.location.z);
                    var d = 2 * Number(cmd[2]);
                    var r = Number(cmd[2]);
                    var h = Number(cmd[3]);
                    var blocc = 0;
                    var i = -Math.max(h, r);
                    var ax, ay, az;
                    var V = Math.ceil(Math.PI * r * r * h) + 2;
                    genShape(function () {
                        for (let j = -Math.max(h, r); j <= Math.max(h, r); j += Math.sign(Math.max(h, r))) {
                            for (let k = -Math.max(h, r); k <= Math.max(h, r); k++) {
                                ax = i * fun.cos(Number(cmd[5])) + (j * fun.cos(Number(cmd[6])) - k * fun.sin(Number(cmd[6]))) * fun.sin(Number(cmd[5]));
                                ay = (j * fun.cos(Number(cmd[6])) - k * fun.sin(Number(cmd[6]))) * fun.cos(Number(cmd[5])) - i * fun.sin(Number(cmd[5]));
                                az = k * fun.cos(Number(cmd[6])) + j * fun.sin(Number(cmd[6]));
                                if (Math.pow(ax, 2) + Math.pow(az, 2) - (r * r) <= 0 && ay <= h && ay >= 0) {
                                    blocc++;
                                    shaperSetBlock(cmd[7], cmd[8], cmd[9], cmd[10], j, k);
                                } else continue;
                            }
                        }
                    });
                }
            }
        });
    }
}