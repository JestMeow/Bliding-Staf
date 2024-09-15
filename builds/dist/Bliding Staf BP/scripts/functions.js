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
//stuff to help doing stuff

export function distance(rx1, ry1, rz1, rx2, ry2, rz2) {
    return Math.sqrt(Math.pow(rx2 - rx1, 2) + Math.pow(ry2 - ry1, 2) + Math.pow(rz2 - rz1, 2));
}
export function sin(x) {
    return Math.sin(x * Math.PI / 180);
}
export function cos(x) {
    return Math.cos(x * Math.PI / 180);
}
//some shit

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