import { describe, test, expect } from "vitest";

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class Bottles {
  bottleNumberFor(number) {
    let bottleNumberClass;
    if (number === 0) {
      bottleNumberClass = BottleNumber0;
    } else {
      bottleNumberClass = BottleNumber;
    }

    return new bottleNumberClass(number);
  }
  song() {
    return this.verses(99, 0);
  }

  verses(upper, lower) {
    return downTo(upper, lower)
      .map((i) => this.verse(i))
      .join("\n");
  }

  verse(number) {
    const bottleNumber = this.bottleNumberFor(number);
    const nextBottleNumber = this.bottleNumberFor(bottleNumber.successor());

    return (
      capitalize(`${bottleNumber} of beer on the wall, `) +
      `${bottleNumber} of beer.\n` +
      `${bottleNumber.action()}` +
      `${nextBottleNumber} of beer on the wall.\n`
    );
  }
}

class BottleNumber {
  constructor(number) {
    this.number = number;
  }

  toString() {
    return `${this.quantity()} ${this.container()}`;
  }
  container() {
    if (this.number === 1) {
      return "bottle";
    } else {
      return "bottles";
    }
  }

  pronoun() {
    if (this.number === 1) {
      return "it";
    } else {
      return "one";
    }
  }

  quantity() {
    return this.number.toString();
  }

  action() {
    return `Take ${this.pronoun()} down and pass it around, `;
  }

  successor() {
    return this.number - 1;
  }
}

class BottleNumber0 extends BottleNumber {
  quantity() {
    return "no more";
  }

  action() {
    return "Go to the store and buy some more, ";
  }

  successor() {
    return 99;
  }
}

const downTo = (max, min) => {
  const numbers = [];
  for (let n = max; n >= min; n--) {
    numbers.push(n);
  }
  return numbers;
};

describe("Bottles", () => {
  test("the first verse", () => {
    const expected =
      "99 bottles of beer on the wall, " +
      "99 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "98 bottles of beer on the wall.\n";
    expect(new Bottles().verse(99)).toBe(expected);
  });

  test("another verse", () => {
    const expected =
      "3 bottles of beer on the wall, " +
      "3 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "2 bottles of beer on the wall.\n";
    expect(new Bottles().verse(3)).toBe(expected);
  });

  test("verse 2", () => {
    const expected =
      "2 bottles of beer on the wall, " +
      "2 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "1 bottle of beer on the wall.\n";
    expect(new Bottles().verse(2)).toBe(expected);
  });

  test("verse 1", () => {
    const expected =
      "1 bottle of beer on the wall, " +
      "1 bottle of beer.\n" +
      "Take it down and pass it around, " +
      "no more bottles of beer on the wall.\n";
    expect(new Bottles().verse(1)).toBe(expected);
  });

  test("verse 0", () => {
    const expected =
      "No more bottles of beer on the wall, " +
      "no more bottles of beer.\n" +
      "Go to the store and buy some more, " +
      "99 bottles of beer on the wall.\n";
    expect(new Bottles().verse(0)).toBe(expected);
  });

  test("a couple verses", () => {
    const expected =
      "99 bottles of beer on the wall, " +
      "99 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "98 bottles of beer on the wall.\n" +
      "\n" +
      "98 bottles of beer on the wall, " +
      "98 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "97 bottles of beer on the wall.\n";
    expect(new Bottles().verses(99, 98)).toBe(expected);
  });

  test("a few verses", () => {
    const expected =
      "2 bottles of beer on the wall, " +
      "2 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "1 bottle of beer on the wall.\n" +
      "\n" +
      "1 bottle of beer on the wall, " +
      "1 bottle of beer.\n" +
      "Take it down and pass it around, " +
      "no more bottles of beer on the wall.\n" +
      "\n" +
      "No more bottles of beer on the wall, " +
      "no more bottles of beer.\n" +
      "Go to the store and buy some more, " +
      "99 bottles of beer on the wall.\n";
    expect(new Bottles().verses(2, 0)).toBe(expected);
  });
});
