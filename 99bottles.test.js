import { describe, test, expect } from "vitest";

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class Bottles {
  song() {
    return this.verses(99, 0);
  }

  verses(upper, lower) {
    return downTo(upper, lower)
      .map((i) => this.verse(i))
      .join("\n");
  }

  verse(number) {
    return (
      `${capitalize(this.quantity(number))} ` +
      `${this.container(number)} ` +
      `of beer on the wall, ` +
      `${this.quantity(number)} ${this.container(number)} of beer.\n` +
      `${this.action(number)}` +
      `${this.quantity(this.successor(number))} ` +
      `${this.container(this.successor(number))} ` +
      "of beer on the wall.\n"
    );
  }

  container(number) {
    return new BottleNumber(number).container();
  }

  pronoun(number) {
    return new BottleNumber(number).pronoun(number);
  }

  quantity(number) {
    return new BottleNumber(number).quantity();
  }

  action(number) {
    return new BottleNumber(number).action();
  }

  successor(number) {
    return new BottleNumber(number).successor();
  }
}

class BottleNumber {
  constructor(number) {
    this.number = number;
  }
  container() {
    if (this.number === 1) {
      return "bottle";
    } else {
      return "bottles";
    }
  }

  pronoun(number) {
    if (number === 1) {
      return "it";
    } else {
      return "one";
    }
  }

  quantity() {
    if (this.number === 0) {
      return "no more";
    } else {
      return this.number.toString();
    }
  }

  action() {
    if (this.number === 0) {
      return "Go to the store and buy some more, ";
    } else {
      return `Take ${this.pronoun(this.number)} down and pass it around, `;
    }
  }

  successor() {
    if (this.number === 0) {
      return 99;
    } else {
      return this.number - 1;
    }
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
