# Bliding-Staf
A script for Minecraft: Bedrock Edition that focuses on building efficiently.

Addon can be downloaded on the builds folder.

to do: write a documentation.

# Documentation (WIP)
Once you have successfully imported the script in the form of a behaviour pack, you can activate it to a world. Make sure that Beta's APIs is activated on the experiments.
- I recommend enabling content log files and content log GUI while using this addon. That way, you can know if the addon is working or not.
- If content log files and content log GUI is enabled, once loading the world, the script will greet you with a message of "Working!". If it did not greet you, then one of these factors might be the reason:
- - You did something wrong with the installation
  - You did not turn on Beta's APIs on the experiments
  - You installed the wrong version
  - The file is corrupted

## Initialising the script
1. Place an anvil and get a stick
2. Name the stick "Selecc"
"Selecc" will be like a wand that you can use to select points and volumes you want to edit.
After doing so, you are now allowed to use commands such as the help command.

## Commaand Info
Unlike Minecraft's vanilla commands which uses the prefix "/", due to limitaions, the command prefix for this addon is "."
Examples of using commands:
```
.help
.age
```

### Command structure
The command structure for this script is almost identical to Minecraft's vanilla commands. Which is
```
prefix + cmd[0] + cmd[1] + ... + cmd[n]
```
There also exist sub-commands for more complex commands like set, gen, and shape.

(to be continued lol)
