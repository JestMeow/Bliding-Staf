import { world, system } from "@minecraft/server";

let overworld;
let entities;
let players;

system.run(() => {
    overworld = world.getDimension("overworld");
    players = overworld.getPlayers();
});

