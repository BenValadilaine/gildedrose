let { Shop } = require('../src/shop.js');
let { Item } = require('../src/item.js');
describe("GildedRose shop manager", () => {
  let listItems;

  beforeEach(() => {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", () => {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", () => {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Qualité maximum d'un produit", () => {
    listItems.push(new Item("Aged Brie", 10, 50));
    listItems.push(new Item("Backstage passes", 10, 49));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 9, quality: 50 },
      { sellIn: 9, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Quand sellIn =< 10 : qualité =+ 2", () => {
    listItems.push(new Item("Backstage passes", 10, 20));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 9, quality: 22 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Quand sellIn =< 5 : qualité =+ 3", () => {
    listItems.push(new Item("Backstage passes", 5, 20));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 4, quality: 23 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Quand sellIn === 0 : qualité === 0", () => {
    listItems.push(new Item("Backstage passes", 0, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité ne peut jamais être négative", () => {
    listItems.push(new Item("Truc random", 10, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
    { sellIn: 9 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).not.toMatch(/-\d*/);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Objets Conjured : qualité =- 2", () => {
    listItems.push(new Item("Conjured random objet", 15, 24));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
    { sellIn: 14, quality: 23 }, //Objet Conjured, à modifier 
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("sellIn toujours null et quality toujours à 80 pour Sulfuras", () => {
    listItems.push(new Item("Sulfuras", null, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
    { sellIn: null, quality: 80 }, 
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBeNull();
    });
  });

});