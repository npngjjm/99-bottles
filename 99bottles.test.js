import { describe, test, expect } from "vitest";

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class CountDownSong {
  constructor(verseTemplate, max, min) {
    this.verseTemplate = verseTemplate;
    this.max = max;
    this.min = min;
  }
  song() {
    return this.verses(this.max, this.min);
  }

  verses(upper, lower) {
    return downTo(upper, lower)
      .map((i) => this.verse(i))
      .join("\n");
  }

  verse(number) {
    return this.verseTemplate.lyrics(number);
  }
}

class VerseFake {
  static lyrics(number) {
    return `This is verse ${number}.\n`;
  }
}

class BottleVerse {
  constructor(bottleNumber) {
    this.bottleNumber = bottleNumber;
  }

  static for(number) {
    return new BottleVerse(BottleNumber.for(number));
  }

  static lyrics(number) {
    return BottleVerse.for(number).lyrics();
  }

  lyrics() {
    return (
      capitalize(`${this.bottleNumber} of beer on the wall, `) +
      `${this.bottleNumber} of beer.\n` +
      `${this.bottleNumber.action()}` +
      `${this.bottleNumber.successor()} of beer on the wall.\n`
    );
  }
}

class BottleNumber {
  constructor(number) {
    this.number = number;
  }

  static register(candidate) {
    BottleNumber.registry.unshift(candidate);
  }

  static canHandle(number) {
    return true;
  }

  static for(number) {
    let bottleNumberClass;

    bottleNumberClass = BottleNumber.registry.find((candidate) =>
      candidate.canHandle(number)
    );

    return new bottleNumberClass(number);
  }

  toString() {
    return `${this.quantity()} ${this.container()}`;
  }

  container() {
    return "bottles";
  }

  pronoun() {
    return "one";
  }

  quantity() {
    return this.number.toString();
  }

  action() {
    return `Take ${this.pronoun()} down and pass it around, `;
  }

  successor() {
    return BottleNumber.for(this.number - 1);
  }
}

BottleNumber.registry = [BottleNumber];

class BottleNumber0 extends BottleNumber {
  static canHandle(number) {
    return number === 0;
  }
  quantity() {
    return "no more";
  }

  action() {
    return "Go to the store and buy some more, ";
  }

  successor() {
    return BottleNumber.for(99);
  }
}

BottleNumber.register(BottleNumber0);

class BottleNumber1 extends BottleNumber {
  static canHandle(number) {
    return number === 1;
  }
  container() {
    return "bottle";
  }

  pronoun() {
    return "it";
  }
}

BottleNumber.register(BottleNumber1);

class BottleNumber6 extends BottleNumber {
  static canHandle(number) {
    return number === 6;
  }
  quantity() {
    return "1";
  }

  container() {
    return "six-pack";
  }
}

BottleNumber.register(BottleNumber6);

const downTo = (max, min) => {
  const numbers = [];
  for (let n = max; n >= min; n--) {
    numbers.push(n);
  }
  return numbers;
};

describe("CountDownSong", () => {
  test("verses", () => {
    const expected =
      "This is verse 99.\n" +
      "\n" +
      "This is verse 98.\n" +
      "\n" +
      "This is verse 97.\n";
    expect(new CountDownSong(VerseFake).verses(99, 97)).toBe(expected);
  });

  test("song", () => {
    const expected =
      "This is verse 47.\n" +
      "\n" +
      "This is verse 46.\n" +
      "\n" +
      "This is verse 45.\n" +
      "\n" +
      "This is verse 44.\n" +
      "\n" +
      "This is verse 43.\n";
    expect(new CountDownSong(VerseFake, 47, 43).song()).toBe(expected);
  });
});

describe("BottleVerse", () => {
  test("verse general rule upper bound", () => {
    const expected =
      "99 bottles of beer on the wall, " +
      "99 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "98 bottles of beer on the wall.\n";
    expect(BottleVerse.lyrics(99)).toBe(expected);
  });

  test("verse general rule lower bound", () => {
    const expected =
      "3 bottles of beer on the wall, " +
      "3 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "2 bottles of beer on the wall.\n";
    expect(BottleVerse.lyrics(3)).toBe(expected);
  });

  test("verse 2", () => {
    const expected =
      "2 bottles of beer on the wall, " +
      "2 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "1 bottle of beer on the wall.\n";
    expect(BottleVerse.lyrics(2)).toBe(expected);
  });

  test("verse 1", () => {
    const expected =
      "1 bottle of beer on the wall, " +
      "1 bottle of beer.\n" +
      "Take it down and pass it around, " +
      "no more bottles of beer on the wall.\n";
    expect(BottleVerse.lyrics(1)).toBe(expected);
  });

  test("verse 0", () => {
    const expected =
      "No more bottles of beer on the wall, " +
      "no more bottles of beer.\n" +
      "Go to the store and buy some more, " +
      "99 bottles of beer on the wall.\n";
    expect(BottleVerse.lyrics(0)).toBe(expected);
  });

  test("verse 6", () => {
    const expected =
      "1 six-pack of beer on the wall, " +
      "1 six-pack of beer.\n" +
      "Take one down and pass it around, " +
      "5 bottles of beer on the wall.\n";
    expect(BottleVerse.lyrics(6)).toBe(expected);
  });

  test("verse 7", () => {
    const expected =
      "7 bottles of beer on the wall, " +
      "7 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "1 six-pack of beer on the wall.\n";
    expect(BottleVerse.lyrics(7)).toBe(expected);
  });
});
