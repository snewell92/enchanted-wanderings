//#region Item Tags

ServerEvents.tags("item", (event) => {
  // Add $TAG to target existing item
  event.add("forge:ores/tin", "tin_ores_and_crafts:rawtin");
  event.add("forge:storage_blocks/raw_tin", "tin_ores_and_crafts:rawtinblock");
  event.add("forge:storage_blocks/raw_tin", "tin_ores_and_crafts:tinore_block");
  event.add("forge:nuggets/tin", "tin_ores_and_crafts:tinnugget");
  event.add("forge:ingots/tin", "tin_ores_and_crafts:tiningot");
  event.add("forge:storage_blocks/tin", "tin_ores_and_crafts:tinblock");
});

//#endregion

function melt_crushed_ore(material, temperature, time, e) {
  e.custom({
    type: "tconstruct:melting",
    ingredient: { item: `create:crushed_raw_${material}` },
    result: { fluid: `tconstruct:molten_${material}`, amount: 135 },
    temperature: temperature,
    time: time * 29.4,
  }).id(`kubejs:melting/crushed_ore/${material}`);
}

ServerEvents.recipes((event) => {
  const TO_REMOVE = [
    { output: "spelunkery:rough_diamond_shard" }, // need to merge into next one
    { output: "createaddition:diamond_grit" }, // need to merge into previous one
    { id: "create:crafting/tree_fertilizer" }, // buggy
    // we use bronze for this inbetween tier
    { id: "simple_weapons:corinthium_greatsword" },
    { id: "simple_weapons:corinthium_scythe" },
    { id: "simple_weapons:corinthium_dagger" },
    { id: "simple_weapons:corinthium_scimitar" },
    { id: "simple_weapons:corinthium_spear" },
    { id: "simple_weapons:corinthium_fist" },
    { id: "simple_weapons:corinthium_katana" },
    { id: "simple_weapons:corinthium_sickle" },
  ];

  let i = 0;
  const len = TO_REMOVE.length;
  for (; i < len; i++) {
    event.remove(TO_REMOVE[i]);
  }

  event.recipes.create.haunting("byg:crimson_berries", "byg:blueberries");

  event.recipes.create.crushing(
    "2x minecraft:prismarine_shard",
    "minecraft:prismarine"
  );

  event.recipes.create.crushing(
    "minecraft:gravel",
    "minecraft:cobbled_deepslate"
  );

  event.recipes.create.crushing(
    ["2x minecraft:coal", Item.of("minecraft:coal").withChance(0.5)],
    "#forge:ores/coal"
  );

  event.recipes.create.crushing(
    ["minecraft:quartz", Item.of("minecraft:quartz").withChance(0.5)],
    "byg:raw_quartz_block"
  );

  event.recipes.create.crushing(
    [
      "4x spelunkery:rough_diamond_shard",
      Item.of("spelunkery:rough_diamond_shard").withChance(0.25),
      "2x createaddition:diamond_grit",
    ],
    "minecraft:diamond"
  );

  event.recipes.create.mixing("culturaldelights:corn_dough", [
    Fluid.water(1000),
    "3x culturaldelights:corn_cob",
  ]);

  //#region Tinkers

  const CRUSHED_METALS = [
    ["tin", 700, 60],
    ["copper", 500, 30],
    ["iron", 900, 80],
    ["zinc", 800, 60],
    ["gold", 600, 40],
    ["silver", 700, 40],
    ["aluminum", 800, 60],
  ];

  const crushinLen = CRUSHED_METALS.length;
  let entry, mat, temp, time;
  i = 0;

  for (; i < crushinLen; i++) {
    entry = CRUSHED_METALS[i];
    mat = entry[0];
    temp = entry[1];
    time = entry[2];

    melt_crushed_ore(mat, temp, time, event);
  }

  //#endregion
});
