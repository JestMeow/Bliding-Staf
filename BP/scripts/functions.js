//commands
export function splt(str) {
    var out = str.split(" "), i = 0, begin, end;
    function findNext(chr) {
        while (i < out.length) {
            if (out[i].indexOf(chr) != -1) {
                out[i] = out[i].replace(chr, "");
                return (i);
            }
            i++;
        }
    }
    do {
        end = -1;
        begin = findNext("[");
        if (begin != 1) {
            end = findNext("]");
            if (end != -1) {
                var tmp = out.splice(begin, end - begin + 1);
                out.splice(begin, 0, tmp.join(" "));
                i = begin - 1;
            }
        }
    } while (end != 1);
    return (out);
}

export const pref = ".";

export function stringToCommand(str) {
    var str = str.substr(1, str.length);
    var command = splt(str);
    return command;
}
// Functions to make things easier

export function distance(rx1, ry1, rz1, rx2, ry2, rz2) {
    return Math.sqrt(Math.pow(rx2 - rx1, 2) + Math.pow(ry2 - ry1, 2) + Math.pow(rz2 - rz1, 2));
}
export function sin(x) {
    return Math.sin(x * Math.PI / 180);
}
export function cos(x) {
    return Math.cos(x * Math.PI / 180);
}

// Random INT in range
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// City function

export function buildHouse(i, j, x_1, x_2, y_1, y_2, z_1, z_2, scale = 9, h = 5, overworld, gridArray) {
    var wallPaletto = ["jungle_planks", "packed_mud", "cobblestone", "stone", "prismarine"];
    var ns = 0, we = 1;
    var th = rand(1, 3), tht = rand(4, 5), palettoR = rand(0, wallPaletto.length - 1);

    //body
    if (gridArray == 2) {
        overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j + scale / 2) + " " + (Math.min(x_1, x_2) + i - scale / 2) + " " + (Math.min(y_1, y_2) + 2 + h * th) + " " + (Math.min(z_1, z_2) + j - scale / 2) + " " + wallPaletto[palettoR]);
        for (let a = 0; a < th; a++) {
            overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 4) + " " + (Math.min(y_1, y_2) + 3 + a * h) + " " + (Math.min(z_1, z_2) + j + scale / 2) + " " + (Math.min(x_1, x_2) + i - scale / 4) + " " + (Math.min(y_1, y_2) + 2 + h * (3 / 5) + h * a) + " " + (Math.min(z_1, z_2) + j - scale / 2) + " glass_pane");
            overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2) + " " + (Math.min(y_1, y_2) + 3 + a * h) + " " + (Math.min(z_1, z_2) + j + scale / 4) + " " + (Math.min(x_1, x_2) + i - scale / 2) + " " + (Math.min(y_1, y_2) + 2 + h * (3 / 5) + h * a) + " " + (Math.min(z_1, z_2) + j - scale / 4) + " glass_pane");

            overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 16) + " " + (Math.min(y_1, y_2) + 3 + a * h) + " " + (Math.min(z_1, z_2) + j + scale / 2) + " " + (Math.min(x_1, x_2) + i - scale / 16) + " " + (Math.min(y_1, y_2) + 2 + h * (3 / 5) + h * a) + " " + (Math.min(z_1, z_2) + j - scale / 2) + " " + wallPaletto[palettoR]);
            overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2) + " " + (Math.min(y_1, y_2) + 3 + a * h) + " " + (Math.min(z_1, z_2) + j + scale / 16) + " " + (Math.min(x_1, x_2) + i - scale / 2) + " " + (Math.min(y_1, y_2) + 2 + h * (3 / 5) + h * a) + " " + (Math.min(z_1, z_2) + j - scale / 16) + " " + wallPaletto[palettoR]);

            overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - 1) + " " + (Math.min(y_1, y_2) + 1 + a * h) + " " + (Math.min(z_1, z_2) + j + scale / 2 - 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + 1) + " " + (Math.min(y_1, y_2) + 1 + h * a) + " " + (Math.min(z_1, z_2) + j - scale / 2 + 1) + " planks");
        }
        //roof
        if (Math.random() <= 0.5) {
            ns = 1;
            we = 0;
        }
        for (let cw = 0; cw <= scale / 2 + 2; cw++) {
            if (cw < scale / 2 + 1) {
                overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - cw * we + 1) + " " + (Math.min(y_1, y_2) + 3 + h * th + cw - 1) + " " + (Math.min(z_1, z_2) + j + scale / 2 - cw * ns + 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + cw * we - 1) + " " + (Math.min(y_1, y_2) + 3 + h * th + cw - 1) + " " + (Math.min(z_1, z_2) + j - scale / 2 + cw * ns - 1) + " sandstone [] keep");
                overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - cw * we + 1) + " " + (Math.min(y_1, y_2) + 3 + h * th + cw - 2) + " " + (Math.min(z_1, z_2) + j + scale / 2 - cw * ns + 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + cw * we - 1) + " " + (Math.min(y_1, y_2) + 3 + h * th + cw - 2) + " " + (Math.min(z_1, z_2) + j - scale / 2 + cw * ns - 1) + " air [] replace sandstone");
            } else break;
        }
        for (let cw = 0; cw <= scale / 2; cw++) {
            overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - cw * we) + " " + (Math.min(y_1, y_2) + 3 + h * th + cw) + " " + (Math.min(z_1, z_2) + j + scale / 2 - cw * ns) + " " + (Math.min(x_1, x_2) + i - scale / 2 + cw * we) + " " + (Math.min(y_1, y_2) + 3 + h * th + cw) + " " + (Math.min(z_1, z_2) + j - scale / 2 + cw * ns) + " stone_bricks");
            overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - cw * we) + " " + (Math.min(y_1, y_2) + 3 + h * th + cw - 1) + " " + (Math.min(z_1, z_2) + j + scale / 2 - cw * ns) + " " + (Math.min(x_1, x_2) + i - scale / 2 + cw * we) + " " + (Math.min(y_1, y_2) + 3 + h * th + cw - 1) + " " + (Math.min(z_1, z_2) + j - scale / 2 + cw * ns) + " " + wallPaletto[palettoR]);
        }
        overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - 1) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j + scale / 2 - 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + 1) + " " + (Math.min(y_1, y_2) + 2 + h * th) + " " + (Math.min(z_1, z_2) + j - scale / 2 + 1) + "  air [] replace glass_pane");
        overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - 1) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j + scale / 2 - 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + 1) + " " + (Math.min(y_1, y_2) + 2 + h * th) + " " + (Math.min(z_1, z_2) + j - scale / 2 + 1) + "  air [] replace " + wallPaletto[palettoR]);
    } else if (gridArray == 3) {
        overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j + scale / 2) + " " + (Math.min(x_1, x_2) + i - scale / 2) + " " + (Math.min(y_1, y_2) + 2 + h * tht) + " " + (Math.min(z_1, z_2) + j - scale / 2) + " polished_diorite");
        for (let a = 0; a < tht; a++) {
            overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2) + " " + (Math.min(y_1, y_2) + 3 + a * h) + " " + (Math.min(z_1, z_2) + j + scale / 2) + " " + (Math.min(x_1, x_2) + i - scale / 2) + " " + (Math.min(y_1, y_2) + 2 + h * (3 / 5) + h * a) + " " + (Math.min(z_1, z_2) + j - scale / 2) + " black_stained_glass");

            overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - 1) + " " + (Math.min(y_1, y_2) + 1 + h * (a + 1)) + " " + (Math.min(z_1, z_2) + j + scale / 2 - 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + 1) + " " + (Math.min(y_1, y_2) + 1 + h * (a + 1)) + " " + (Math.min(z_1, z_2) + j - scale / 2 + 1) + " stone");
        }
        overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - 1) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j + scale / 2 - 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + 1) + " " + (Math.min(y_1, y_2) + 2 + h * tht) + " " + (Math.min(z_1, z_2) + j - scale / 2 + 1) + "  air [] replace polished_diorite");
        overworld.runCommand("fill " + (Math.min(x_1, x_2) + i + scale / 2 - 1) + " " + (Math.min(y_1, y_2) + 2) + " " + (Math.min(z_1, z_2) + j + scale / 2 - 1) + " " + (Math.min(x_1, x_2) + i - scale / 2 + 1) + " " + (Math.min(y_1, y_2) + 2 + h * tht) + " " + (Math.min(z_1, z_2) + j - scale / 2 + 1) + "  air [] replace black_stained_glass");
    }
}
//maze shid

export function generateMaze(width, height, scale) {



    width /= scale;
    height /= scale;
    width += 1;
    height += 1;
    width = Math.ceil(width);
    height = Math.ceil(height);
    if (width & 2 == 0) width += 1;
    if (height & 2 == 0) height += 1;
    // Initialize the grid, with walls (1) everywhere
    const maze = Array.from({ length: width }, () => Array(height).fill(1));

    function carve(x, y) {
        maze[x][y] = 2;
    }
    for (let x = 0; x < maze.length; x++) {
        for (let y = 0; y < maze[0].length; y++) {
            if (x % 2 == 0 && y % 2 == 0) {
                carve(x, y);
            }
            else if ((x % 2 == 0 || y % 2 == 0) && Math.random() <= 0.25) {
                carve(x, y);
            }
        }
    }
    /*function insertZeros(originalArray, k) {
        let modifiedArray = [];

        // Loop through each row
        for (let i = 0; i < originalArray.length; i++) {
            let newSubArray = [];

            // Loop through each element in the row
            for (let j = 0; j < originalArray[i].length; j++) {
                newSubArray.push(originalArray[i][j]);

                // Insert k zeros between elements horizontally, except after the last one
                if (j < originalArray[i].length - 1) {
                    for (let z = 0; z < k; z++) {
                        newSubArray.push(0);
                    }
                }
            }
            modifiedArray.push(newSubArray);

            // Insert k rows of zeros between the current and next row vertically, except after the last row
            if (i < originalArray.length - 1) {
                for (let v = 0; v < k; v++) {
                    modifiedArray.push(new Array(newSubArray.length).fill(0));
                }
            }
        }

        return modifiedArray;
    }*/
    function insertZerosAndTransform(originalArray, k) {
        let modifiedArray = [];

        // Helper function to determine if an element has neighbors
        function hasNeighbor(array, row, col) {
            const numRows = array.length;
            const numCols = array[0].length;

            // Check horizontally and vertically for neighbors
            const left = col > 0 && array[row][col - 1] !== 0;
            const right = col < numCols - 1 && array[row][col + 1] !== 0;
            const up = row > 0 && array[row - 1][col] !== 0;
            const down = row < numRows - 1 && array[row + 1][col] !== 0;

            return left || right || up || down;
        }

        // Loop through each row
        for (let i = 0; i < originalArray.length; i++) {
            let newSubArray = [];

            // Loop through each element in the row
            for (let j = 0; j < originalArray[i].length; j++) {
                let value = originalArray[i][j];

                if (value == 2 || value !== 1 && hasNeighbor(originalArray, i, j)) {
                    value = Math.random() < 0.125 ? 3 : value;
                }

                // If the element is not zero and has a neighbor, it has a chance to become 2
                if (value !== 0 && value !== 1 && hasNeighbor(originalArray, i, j)) {
                    value = Math.random() < 0.25 ? 3 : value; // 50% chance to become 2
                }


                newSubArray.push(value);

                // Insert k zeros between elements horizontally, except after the last one
                if (j < originalArray[i].length - 1) {
                    for (let z = 0; z < k; z++) {
                        newSubArray.push(0);
                    }
                }
            }
            modifiedArray.push(newSubArray);

            // Insert k rows of zeros between the current and next row vertically, except after the last row
            if (i < originalArray.length - 1) {
                for (let v = 0; v < k; v++) {
                    modifiedArray.push(new Array(newSubArray.length).fill(0));
                }
            }
        }

        return modifiedArray;
    }

    return insertZerosAndTransform(maze, scale);
}

// Generate and log a 21x11 maze
//generateMaze(21, 11);

// Example usage
/*
const maze = generateMaze(15, 15);
console.log(maze.map(row => row.join(" ")).join("\n"));*/














//noise (Not mine :3)

const PERLIN_YWRAPB = 4
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB
const PERLIN_ZWRAPB = 8
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB
const PERLIN_SIZE = 4095

let perlin_octaves = 4 // default to medium smooth
let perlin_amp_falloff = 0.5 // 50% reduction/octave

const scaled_cosine = (i) => 0.5 * (1.0 - Math.cos(i * Math.PI))

let perlin

export const noise = function (x, y = 0, z = 0) {
    if (perlin == null) {
        perlin = new Array(PERLIN_SIZE + 1)
        for (let i = 0; i < PERLIN_SIZE + 1; i++) {
            perlin[i] = Math.random()
        }
    }

    if (x < 0) {
        x = -x
    }
    if (y < 0) {
        y = -y
    }
    if (z < 0) {
        z = -z
    }

    let xi = Math.floor(x),
        yi = Math.floor(y),
        zi = Math.floor(z)
    let xf = x - xi
    let yf = y - yi
    let zf = z - zi
    let rxf, ryf

    let r = 0
    let ampl = 0.5

    let n1, n2, n3

    for (let o = 0; o < perlin_octaves; o++) {
        let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB)

        rxf = scaled_cosine(xf)
        ryf = scaled_cosine(yf)

        n1 = perlin[of & PERLIN_SIZE]
        n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1)
        n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
        n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2)
        n1 += ryf * (n2 - n1)

        of += PERLIN_ZWRAP
        n2 = perlin[of & PERLIN_SIZE]
        n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2)
        n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
        n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3)
        n2 += ryf * (n3 - n2)

        n1 += scaled_cosine(zf) * (n2 - n1)

        r += n1 * ampl
        ampl *= perlin_amp_falloff
        xi <<= 1
        xf *= 2
        yi <<= 1
        yf *= 2
        zi <<= 1
        zf *= 2

        if (xf >= 1.0) {
            xi++
            xf--
        }
        if (yf >= 1.0) {
            yi++
            yf--
        }
        if (zf >= 1.0) {
            zi++
            zf--
        }
    }
    return r
}

export const noiseDetail = function (lod, falloff) {
    if (lod > 0) {
        perlin_octaves = lod
    }
    if (falloff > 0) {
        perlin_amp_falloff = falloff
    }
}

export const noiseSeed = function (seed) {
    const lcg = (() => {
        const m = 4294967296
        const a = 1664525
        const c = 1013904223
        let seed, z
        return {
            setSeed(val) {
                z = seed = (val == null ? Math.random() * m : val) >>> 0
            },
            getSeed() {
                return seed
            },
            rand() {
                z = (a * z + c) % m
                return z / m
            }
        }
    })()

    lcg.setSeed(seed)
    perlin = new Array(PERLIN_SIZE + 1)
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
        perlin[i] = lcg.rand()
    }
}