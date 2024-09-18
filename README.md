# Bliding-Staf
A script for Minecraft: Bedrock Edition that focuses on building efficiently.

## About
Bliding Staf is an addon or script for Minecraft: Bedrock Edition that serves as a tool for building efficiently and with minimal effort. This addon helps building by giving the player tools in the form of commands and items. This addon does not focus on terraforming but rather geometric shapes and some organic shapes.

<br>

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


## Initializing the script
1. Place an anvil and get a stick
2. Name the stick "Selecc"
<br>
"Selecc" will be like a wand that you can use to select points and volumes you want to edit.
After doing so, you are now allowed to use commands such as the help command.


### Optional Item
Naming an arrow "Pointy" will give you an extra tool.
- For its function, look at mode command.


## Command Info
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
There also exist sub-commands for more complex commands like set, noise, and shape. But we'll get onto that later.


## List of Commands
### Mode Command
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
         - Caution; when on move mode, pointy can only move a maximum volume of 64x384x64 blocks, any volume bigger might break your build.
      3. flySpeed
         - Types:
           - Any whole number. If flySpeed is equal or less then 1, flySpeed will be default.


### Simple Commands
1. help
  - Gives a list of all the commands available.

2. age
  - Gives the current tick of the world.

3. distance, dis
  - Gives the distance of two points, point 1 and point 2
  - - Points are assigned by Selecc.
4. c
  - Sets the player's gamemode to creative mode.
5. sp
  - Sets the player's gamemode to spectator mode.
6. pos
    - Sets point 1 or point 2 to the player's position.
    - Usage:
      ```
      .pos <point_n>
      ```

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
       - Generates two dimensional perlin noise on the selected volume with a given block.
       - Usage:
           ```
           .noise gen <amplitude> <frequency> <seed> <block(any)> <block permutation(Optional)> <placement type(Optional)>
           ```
      2. grass
        - Generates two dimensional perlin noise on the selected volume with dirt and a layer of grass on top.
        - Usage:
           ```
           .noise grass <amplitude> <frequency> <seed>
           ```
       3. fillStatic
          - Fills the selected volume with a block, randomly. Frequency of a block depends on its weight.
          - Usage:
            ```
            .noise fillStatic <wieght_1> <block_1> <weight_2> <block_2> ... <weight_n> <block_n>
            ```
            - Weight can only be whole numbers.
            - Examples of using this command:
              ```
              .noise fillStatic 2 stone 1 polished_andesite
              ```
              - 2:1 ratio of stone and polished andesite.
       4. keepStatic
          - Same as the fillStatic sub-command but only replaces air blocks.
          - Usage is the same.
       5. fillPerlin
          - This one is a bit special. It fills the selected volume following a 3 dimensional perlin noise. With this, we can create generated caves, organic floor patterns, and more.
          - Usage:
            ```
            .noise fillPerlin <amplitude> <frequency> <seed> <weight_1> <block_1> <weight_2> <block_2> ... <weight_n> <block_n>
            ```
            - Higher amplitude will give rough results while low amplitude gives smooth results.
            - High frequency makes each "blob" appear more frequently while low frequency is the opposite.
            - Seed can be anything. Can be used to seamlessly connect segments of noise.
            - This might seem weird that it uses weight, but the block weight depends on the range of the function.
            - Examples:
              ```
              .noise fillPerlin 0.05 0.5 10 1 stone 3 air 1 stone
              ```
              - let stone = s, air = a.
              - s < 1/3, s > 2/6, 1/3 <= a <= 2/3
              - We can treat it like a wave function. Ther'es an empty gap in the middle which, for this example, an air block. This result will give us a cave-like structure.
              - It can be used differently too, like it the following example, I created a floor pattern.
                ```
                .noise fillPerlin 0.36 0.5 10 2 mud_bricks 2 packed_mud 4 dirt_with_roots
                ```


2. shape
   - Sub-commands:
     1. sphere
        - Generates a sphere which point is on the floor of the coordinates of the player, in other words, on the coordinates of the player, rounded down to the lowest integer.
        - Usage
          ```
          .shape sphere <radius> <block(any)> <block permutation(Optional)> <placement type(Optional)>
          ```
      2. cone
         - Generates a cone on the player's position.
         - Usage
           ```
           .shape cone <radius> <height> rot <rotX> <rotZ> <block permutation(Optional)> <placement type(Optional)>
           ```
      3. cylinder
         - Generates a cylinder on the player's position.
         - Usage
           ```
           .shape cylinder <radius> <height> rot <rotX> <rotZ> <block permutation(Optional)> <placement type(Optional)>
           ```



(to be continued lol)
