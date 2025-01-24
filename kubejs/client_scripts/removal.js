const CORINTHIUM_WEAPONS = [
  "simple_weapons:corinthium_greatsword",
  "simple_weapons:corinthium_scythe",
  "simple_weapons:corinthium_dagger",
  "simple_weapons:corinthium_scimitar",
  "simple_weapons:corinthium_spear",
  "simple_weapons:corinthium_fist",
  "simple_weapons:corinthium_katana",
  "simple_weapons:corinthium_sickle",
];

JEIEvents.hideItems((event) => {
  for (const weapon of CORINTHIUM_WEAPONS) {
    event.hide(weapon);
  }
});
