export const COLORS = {
    CELL: '#FFFFFF',
    GRID: '#000000',
    BACKGROUND: '#001a44',
};

export const SHOW_GRID = false;

export const CELL_SIZE = 5;

export const FPS = 60;

export const IS_EVOLVING = true;

export const PATTERNS = {
    turtle: {
        x: 12,
        y: 10,
        rle: 'S23b3o7bo$b2o2bob2ob2o$3b3o4bob$bo2bobo3bob$o4bo4bob$o4bo4bob$bo2bobo3bob$3b3o4bob$b2o2bob2ob2o$b3o7bo!',
    },
    spider: {
        x: 27,
        y: 8,
        rle: '9bo7bo9b$3b2obobob2o3b2obobob2o3b$3obob3o9b3obob3o$o3bobo5bobo5bobo3bo$4b2o6bobo6b2o4b$b2o9bobo9b2ob$b2ob2o15b2ob2ob$5bo15bo!',
    },
    loafer: {
        x: 9,
        y: 9,
        rle: 'b2o2bob2o$o2bo2b2o$bobo$2bo$8bo$6b3o$5bo$6bo$7b2o!',
    },
    copperhead: {
        x: 8,
        y: 12,
        rle: 'b2o2b2o$3b2o$3b2o$obo2bobo$o6bo2$o6bo$b2o2b2o$2b4o2$3b2o$3b2o!',
    },
    dragon: {
        x: 29,
        y: 18,
        rle: '12bo16b$12b2o14bo$10bob2o5bobo4b2ob$5bo3bo3b3o2bo4bo5b$2o3bo2bo6bobo5b3o2bo$2o3bob2o6bo3bobobo5b$2o3bo10bobo7b2ob$5b2o14bo6bo$7bo12bobo6b$7bo12bobo6b$5b2o14bo6bo$2o3bo10bobo7b2ob$2o3bob2o6bo3bobobo5b$2o3bo2bo6bobo5b3o2bo$5bo3bo3b3o2bo4bo5b$10bob2o5bobo4b2ob$12b2o14bo$12bo!',
    },
    two_engine_cordership: {
        x: 41,
        y: 49,
        rle: '19b2o$19b4o$19bob2o2$20bo$19b2o$19b3o$21bo$33b2o$33b2o7$36bo$35b2o$34bo3bo$35b2o2bo$40bo$37bobo$38bo$38bo$38b2o$38b2o3$13bo10bo$12b5o5bob2o11bo$11bo10bo3bo9bo$12b2o8b3obo9b2o$13b2o9b2o12bo$2o13bo21b3o$2o35b3o7$8b2o$8b2o11b2o$19b2o2bo$24bo3bo$18bo5bo3bo$19bo2b2o3bobo$20b3o5bo$28bo!',
    },
    pulsar: {
        x: 13,
        y: 13,
        rle: '2b3o3b3o2b2$o4bobo4bo$o4bobo4bo$o4bobo4bo$2b3o3b3o2b2$2b3o3b3o2b$o4bobo4bo$o4bobo4bo$o4bobo4bo2$2b3o3b3o!',
    },
    kok_galaxy: {
        x: 9,
        y: 9,
        rle: '2bo2bobob$2obob3ob$bo6bo$2o5bob2$bo5b2o$o6bob$b3obob2o$bobo2bo!',
    },
    pentadecathlon: {
        x: 10,
        y: 3,
        rle: '2bo4bo2b$2ob4ob2o$2bo4bo!',
    },
    beluchenkosp37: {
        x: 37,
        y: 37,
        rle: '11b2o11b2o11b$11b2o11b2o11b3$6bo23bo6b$5bobo5bo9bo5bobo5b$4bo2bo5bob2o3b2obo5bo2bo4b$5b2o10bobo10b2o5b$15bobobobo15b$16bo3bo16b2$2o33b2o$2o33b2o$5b2o23b2o5b2$6bobo19bobo6b$6bo2bo17bo2bo6b$7b2o19b2o7b2$7b2o19b2o7b$6bo2bo17bo2bo6b$6bobo19bobo6b2$5b2o23b2o5b$2o33b2o$2o33b2o2$16bo3bo16b$15bobobobo15b$5b2o10bobo10b2o5b$4bo2bo5bob2o3b2obo5bo2bo4b$5bobo5bo9bo5bobo5b$6bo23bo6b3$11b2o11b2o11b$11b2o11b2o!',
    },
    karelsp177: {
        x: 46,
        y: 46,
        rle: '16bo12bo$9b2o24b2o$8b3o3b2o14b2o3b3o$14b2ob2o8b2ob2o$16bo12bo4$2bo40bo$b2o40b2o$b2o40b2o4$2b2o38b2o$2b2o38b2o$o3bo36bo3bo$3bo38bo$3bo38bo9$3bo38bo$3bo38bo$o3bo36bo3bo$2b2o38b2o$2b2o38b2o4$b2o40b2o$b2o40b2o$2bo40bo4$16bo12bo$14b2ob2o8b2ob2o$8b3o3b2o14b2o3b3o$9b2o24b2o$16bo12bo!',
    },
    AK_94: {
        x: 38,
        y: 25,
        rle: '7bo7bo7b2o$7b3o5b3o5b2o$10bo7bo$9b2o6b2o16b2o$30b2o2bo2bo$30bobo2b2o$33b2o$5bo28bo$5b3o26bob2o$8bo22b2obo2bo$7b2o22b2ob2o3$17bo$2b2ob2o9bobo10b2o$o2bob2o8bo3bo9bo$2obo11bo3bo10b3o$3bo11bo3bo12bo$3b2o11bobo$b2o2bobo9bo$o2bo2b2o$b2o16b2o$19bo$13b2o5b3o$13b2o7bo!',
    },
    gunstar2: {
        x: 119,
        y: 119,
        rle: '75bo43b$73b3o43b$72bo46b$72b2o45b$77b2o40b$77bo41b$75bobo41b$44b2o29b2o42b$41bobo2bob2o69b$40b2o2bo4bo69b$45bo6b2o65b$46bo5bo66b2$77b2o40b$76bo2bo39b$76bo42b$76bo42b$76bobo40b$63b2o13b2o39b$64bo54b2$23b2o52b2o40b$23bo54bo13bo3bo22b$88b2o2b2o3bo21b$23bo2bo62bo7bo21b$22bo2bo43b3o21b4o22b$22bobo44bo49b$23bo44b3o48b2$23b2o94b$23bo95b9$17b2o100b$4bo8b2obo2bob2o86b2o8b$4b3o6bo4bo2bo5b2o18bo62bo8b$7bo9bo9bo9b3o6b2obo69b$2o4b2o8bo20bo2bo9bo68b$bo39bo5bo28b2o32bo8b$bobo34bo2bo6bob2o56bob2o7b$2b2o34b2o10bo24bo3bo28bo10b$38b2o34bo4bo28bo10b$36bob2o33bobobo30bo2bo7b$36b3o33bobobo32b2o8b$37bo32bo4bo43b$70bo3bo44b$107b2o10b$72b2o34bo10b8$106b2o11b$103b2o2bo11b$103bo2bo12b$104b3o12b$10bo108b$10b2o33bo73b$44bobo72b$43bo3bo71b$8bo33bo3bo72b$8b2o31bo3bo73b$40bo3bo22b3o49b$41bobo22bo48b2o2b$9bo32bo23bo3bo44bobob$7bob2o55bo2bobo45bob$7bo60bobo2bo37b2o4b2o$7bo61bo3bo26b2o9bo7b$7bo2bo14b2o3bo42bo22b2obo2bob2o6b3o4b$8b2o15b2ob2ob2o37b3o23bo4bo2bo9bo4b$25bo7bo66bo18b$24b2o6bo66bo19b$25b2o2b2o88b$25b2o3bo88b6$94b2o23b$94bo24b$41bo31bo45b$41b2o29b2o20bo2bo21b$93bo2bo22b$25bo3bo63bobo23b$21bo3b2o3bo63bo24b$21b2o7bo88b$26b4o10b2o52b2o23b$39bo2bo51bo24b$39bo35bo43b$39bo29bo4b2o43b$39bobo26b2o49b$41b2o24b2o50b$68b2o49b2$40bo78b$40b2o77b2$66bo52b$65b2o6b2o44b$70bobo2bob2o40b$69b2o2bo4bo40b$42b2o30bo44b$41bobo31bo43b$41bo77b$40b2o77b$45b2o72b$46bo72b$43b3o73b$43bo!',
    },
};
