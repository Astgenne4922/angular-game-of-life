export class Pixel {
    state = false;
    nextState?: boolean;

    constructor(s: boolean) {
        this.state = s;
    }
}

export class QuadNode {
    nw: QuadNode | null;
    ne: QuadNode | null;
    sw: QuadNode | null;
    se: QuadNode | null;

    level: number;
    population: number;

    id: string;

    private constructor(
        nw: QuadNode | null,
        ne: QuadNode | null,
        sw: QuadNode | null,
        se: QuadNode | null,
        level: number,
        population: number
    ) {
        this.nw = nw;
        this.ne = ne;
        this.sw = sw;
        this.se = se;

        this.level = level;
        this.population = population;

        this.id = crypto.randomUUID();
    }

    static alive = new QuadNode(null, null, null, null, 0, 1);
    static dead = new QuadNode(null, null, null, null, 0, 0);

    static cache = new Map<string, QuadNode>();

    static create(
        nw: QuadNode,
        ne: QuadNode,
        sw: QuadNode,
        se: QuadNode
    ): QuadNode {
        const hash = QuadNode.hash(nw, ne, sw, se);
        if (QuadNode.cache.has(hash)) return QuadNode.cache.get(hash)!;
        const node = new QuadNode(
            nw,
            ne,
            sw,
            se,
            ne.level + 1,
            nw.population + ne.population + sw.population + se.population
        );
        QuadNode.cache.set(hash, node);
        return node;
    }

    static hash(nw: QuadNode, ne: QuadNode, sw: QuadNode, se: QuadNode) {
        return nw.id + ne.id + sw.id + se.id;
    }

    static zero(level: number): QuadNode {
        if (level === 0) return this.dead;

        return QuadNode.create(
            QuadNode.zero(level - 1),
            QuadNode.zero(level - 1),
            QuadNode.zero(level - 1),
            QuadNode.zero(level - 1)
        );
    }

    static expand(node: QuadNode): QuadNode {
        const z = QuadNode.zero(node.level - 1);
        return QuadNode.create(
            QuadNode.create(z, z, z, node.nw!),
            QuadNode.create(z, z, node.ne!, z),
            QuadNode.create(z, node.sw!, z, z),
            QuadNode.create(node.se!, z, z, z)
        );
    }

    static centeredSubSubnode(node: QuadNode) {
        return QuadNode.create(
            node.nw!.se!.se!,
            node.ne!.sw!.sw!,
            node.sw!.ne!.ne!,
            node.se!.nw!.nw!
        );
    }

    setBit(x: number, y: number, c: boolean) {
        if (this.level === 1) {
            const cell = c ? QuadNode.alive : QuadNode.dead;
            if (x < 0) {
                if (y < 0)
                    return QuadNode.create(cell, this.ne!, this.sw!, this.se!);
                else return QuadNode.create(this.nw!, this.ne!, cell, this.se!);
            } else {
                if (y < 0)
                    return QuadNode.create(this.nw!, cell, this.sw!, this.se!);
                else return QuadNode.create(this.nw!, this.ne!, this.sw!, cell);
            }
        }
        const val = Math.pow(2, this.level - 2);
        let nw = this.nw!,
            ne = this.ne!,
            sw = this.sw!,
            se = this.se!;
        if (x < 0) {
            if (y < 0) nw = this.nw!.setBit(x + val, y + val, c);
            else sw = this.sw!.setBit(x + val, y - val, c);
        } else {
            if (y < 0) ne = this.ne!.setBit(x - val, y + val, c);
            else se = this.se!.setBit(x - val, y - val, c);
        }

        return QuadNode.create(nw, ne, sw, se);
    }

    private calculateNextState(): QuadNode {
        const sumNw =
            this.nw!.nw!.population +
            this.nw!.ne!.population +
            this.ne!.nw!.population +
            this.nw!.sw!.population +
            this.ne!.sw!.population +
            this.sw!.nw!.population +
            this.sw!.ne!.population +
            this.se!.nw!.population;
        const sumNe =
            this.nw!.ne!.population +
            this.ne!.nw!.population +
            this.ne!.ne!.population +
            this.nw!.se!.population +
            this.ne!.se!.population +
            this.sw!.ne!.population +
            this.se!.nw!.population +
            this.se!.ne!.population;
        const sumSw =
            this.nw!.sw!.population +
            this.nw!.se!.population +
            this.ne!.sw!.population +
            this.sw!.nw!.population +
            this.se!.nw!.population +
            this.sw!.sw!.population +
            this.sw!.se!.population +
            this.se!.sw!.population;
        const sumSe =
            this.nw!.se!.population +
            this.ne!.sw!.population +
            this.ne!.se!.population +
            this.sw!.ne!.population +
            this.se!.ne!.population +
            this.sw!.se!.population +
            this.se!.sw!.population +
            this.se!.se!.population;

        const nw =
            (sumNw === 2 && this.nw!.se!.population === 1) || sumNw === 3
                ? QuadNode.alive
                : QuadNode.dead;
        const ne =
            (sumNe === 2 && this.ne!.sw!.population === 1) || sumNe === 3
                ? QuadNode.alive
                : QuadNode.dead;
        const sw =
            (sumSw === 2 && this.sw!.ne!.population === 1) || sumSw === 3
                ? QuadNode.alive
                : QuadNode.dead;
        const se =
            (sumSe === 2 && this.se!.nw!.population === 1) || sumSe === 3
                ? QuadNode.alive
                : QuadNode.dead;

        return QuadNode.create(nw, ne, sw, se);
    }

    static step(node: QuadNode): QuadNode {
        if (node.population === 0) return node.nw!;
        if (node.level == 2) {
            return node.calculateNextState();
        } else {
            const c1 = QuadNode.step(
                QuadNode.create(
                    node.nw!.nw!,
                    node.nw!.ne!,
                    node.nw!.sw!,
                    node.nw!.se!
                )
            );
            const c2 = QuadNode.step(
                QuadNode.create(
                    node.nw!.ne!,
                    node.ne!.nw!,
                    node.nw!.se!,
                    node.ne!.sw!
                )
            );
            const c3 = QuadNode.step(
                QuadNode.create(
                    node.ne!.nw!,
                    node.ne!.ne!,
                    node.ne!.sw!,
                    node.ne!.se!
                )
            );
            const c4 = QuadNode.step(
                QuadNode.create(
                    node.nw!.sw!,
                    node.nw!.se!,
                    node.sw!.nw!,
                    node.sw!.ne!
                )
            );
            const c5 = QuadNode.step(
                QuadNode.create(
                    node.nw!.se!,
                    node.ne!.sw!,
                    node.sw!.ne!,
                    node.se!.nw!
                )
            );
            const c6 = QuadNode.step(
                QuadNode.create(
                    node.ne!.sw!,
                    node.ne!.se!,
                    node.se!.nw!,
                    node.se!.ne!
                )
            );
            const c7 = QuadNode.step(
                QuadNode.create(
                    node.sw!.nw!,
                    node.sw!.ne!,
                    node.sw!.sw!,
                    node.sw!.se!
                )
            );
            const c8 = QuadNode.step(
                QuadNode.create(
                    node.sw!.ne!,
                    node.se!.nw!,
                    node.sw!.se!,
                    node.se!.sw!
                )
            );
            const c9 = QuadNode.step(
                QuadNode.create(
                    node.se!.nw!,
                    node.se!.ne!,
                    node.se!.sw!,
                    node.se!.se!
                )
            );

            return QuadNode.create(
                QuadNode.step(QuadNode.create(c1, c2, c4, c5)),
                QuadNode.step(QuadNode.create(c2, c3, c5, c6)),
                QuadNode.step(QuadNode.create(c4, c5, c7, c8)),
                QuadNode.step(QuadNode.create(c5, c6, c8, c9))
            );
        }
    }
}

export class QuadTree {
    root: QuadNode;

    constructor() {
        this.root = QuadNode.zero(3);
    }

    expandTo(x: number, y: number) {
        while (
            Math.max(x, y) >= Math.pow(2, this.root.level - 1) ||
            Math.min(x, y) < -Math.pow(2, this.root.level - 1)
        ) {
            this.root = QuadNode.expand(this.root);
        }
    }

    set(x: number, y: number, c: boolean) {
        this.expandTo(x, y);
        this.root = this.root.setBit(x, y, c);
    }

    step() {
        while (
            this.root.level < 2 ||
            QuadNode.centeredSubSubnode(this.root).population !==
                this.root.population
        )
            this.root = QuadNode.expand(this.root);
        this.root = QuadNode.step(this.root);
    }

    static fromRLE() {
        const rle =
            '2b3o3b3o$$o4bobo4bo$o4bobo4bo$o4bobo4bo$2b3o3b3o$$2b3o3b3o$o4bobo4bo$o4bobo4bo$o4bobo4bo$$2b3o3b3o!';
        const universe = new this();
        const cells = QuadTree.decode(rle);
        for (const [x, y] of cells) {
            universe.set(x, y, true);
        }
        return universe;
    }

    static decode(rle: string) {
        const rows = rle.slice(0, -1).split('$');
        const cells = [];
        let row = 0,
            numCols = 0;
        for (let i = 0; i < rows.length; i++) {
            let index = 0,
                re = /([0-9]*)(o|b)|([0-9]+)/g;
            let match;
            while ((match = re.exec(rows[i])) !== null) {
                if (!match[2]) {
                    row += parseInt(match[3]) - 1;
                    break;
                }
                const num = parseInt(match[1].length !== 0 ? match[1] : '1');
                if (match[2] === 'o') {
                    for (let col = index; col < index + num; col++)
                        cells.push([col, row]);
                }
                index += num;
                numCols = Math.max(numCols, index);
            }
            row++;
        }
        const dy = Math.floor(row / 2),
            dx = Math.floor(numCols / 2);
        const ret = [];
        for (const [x, y] of cells) ret.push([x - dx, y - dy]);
        return ret;
    }
}
