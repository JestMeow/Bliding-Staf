# Bliding-Staf
A script for Minecraft: Bedrock Edition that focuses on building efficiently.

- Addon can be downloaded on the builds folder.
- Feel free to request changes. (I'm too lazy to optimize my code so ples do so for me :3)

to do: finish a documentation.

# Documentation (WIP)
Once you have successfully imported the script in the form of a behaviour pack, you can activate it to a world. Make sure that Beta's APIs is activated on the experiments.
- I recommend enabling content log files and content log GUI while using this addon. That way, you can know if the addon is working or not.
- If content log files and content log GUI is enabled, once loading the world, the script will greet you with a message of "Working...". If it did not greet you, then one of these factors might be the reason:
- - You did something wrong with the installation
  - You did not turn on Beta's APIs on the experiments
  - You installed the wrong version
  - The file is corrupted

## Initialising the script
1. Place an anvil and get a stick
2. Name the stick "Selecc"\n
"Selecc" will be like a wand that you can use to select points and volumes you want to edit.
After doing so, you are now allowed to use commands such as the help command.

### Optional Item
Naming an arrow "Pointy" will give you an extra tool.
- For its function, look at config command.

## Commaand Info
Unlike Minecraft's vanilla commands which uses the prefix "/", due to limitaions, the command prefix for this addon is "."
Examples of using commands:
```
.help
.age
```

### Command Structure
The command structure for this script is almost identical to Minecraft's vanilla commands. Which is
```
prefix + cmd[0] + cmd[1] + ... + cmd[n]
```
There also exist sub-commands for more complex commands like set, gen, and shape.

## List of Commands
### Config Command
1. mode
   - Changes the mode of something.
   - Usage:
     ```
     .mode <sub-command> <type>
     ```
   - Sub-commands:
     1. placement
        - Types:
          1. normal
             - Player will place blocks normally
          2. force
             - Blocks will be forced to placed
          3. replace
             - Player will replace block they are looking at with the block their holding
      2. pointy
         - Types:
           1. move
              - When used, Pointy will move the selected volume by 1 block to the direction the player is facing.
           2. teleport
              - When used, Pointy will teleport the player to the block they are facing.

### Simple Commands
1. help
  - Gives a list of all the commands available.

2. age
  - Gives the current tick of the world.

3. distance, dis
  - Gives the distance of two points, point 1 and point 2
  - - Points are assigned by Selecc.

### Complex Commands
1. shoot
  - Creates a straight line with lenght l on on the direction where the player is facing.
  - Usage:
    ```
    .shoot <lenght(l)> <block(any)> <block permutation(Optional)> <placement type(Optional)>
    ```

 2. delete, del
  - Deletes a selected volume.
  - Usage:
    ```
    .delete
    ```
    ```
    .del
    ```

3. set
  - Fills a selected volume with a given block.
  - Usage:
    ```
    .set <block(any)> <block permutation(Optional)> <placement type(Optional)>
    ```

4. stack
  - Repeatedly copies and pastes a selected volume on the direction the player is facing.
  - Usage:
    ```
    .stack <number of copies>
    ```

5. calc
  - Evaluates an expression
  - Usage
    ```
    .calc <expression>
    ```
    - Note: Avoid spaces in expression.

### Generation Commands
1. noise
   - Sub-commands:
     1. gen
       - Generates two dimentional perlin noise on the selected volume with a given block.
       - Usage:
           ```
           .noise gen <amplitude> <frequency> <seed> <block(any)> <block permutation(Optional)> <placement type(Optional)>
           ```
      2. grass
        - Generates two dimentional perlin noise on the selected volume with dirt and a layer of grass on top.
        - Usage:
           ```
           .noise grass <amplitude> <frequency> <seed> <block(any)>
           ```
       3. fillStatic (Unstable, do not use)
       4. keepStatic (Unstable, do not use)
       5. fillPerlin (Unstable, do not use)

2. shape
   - Sub-commands:
     1. sphere
        - Generates a sphere which point is on the floor of the coordinates of the player, in other words, on the coordinates of the player rounded down.
        - Usage
          ```
          .shape sphere <radius> <block(any)> <block permutation(Optional)> <placement type(Optional)>
          ```
      2. cone
         - Generates a cone one the player's position.
         - Usage
           ```
           //may or may not be correct. Please confirm this later
           .shape cone <radius> <height> rot <rotX> <rotZ> <block permutation(Optional)> <placement type(Optional)>
           ```
      3. cylinder
         - Generates a cylinder one the player's position.
         - Usage
           ```
           //may or may not be correct. Please confirm this later
           .shape cylinder <radius> <height> rot <rotX> <rotZ> <block permutation(Optional)> <placement type(Optional)>
           ```


(to be continued lol)
