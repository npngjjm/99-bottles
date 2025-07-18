class Bottles {
  song() {
    return this.verses(99, 0);
  }

  verses(finish, start) {
    return downTo(finish, start)
      .map((verseNumber) => this.verses(verseNumber))
      .join("\n");
  }

  verse(number) {
    return this.verseFor(number).text();
  }

  verseFor(number) {
    switch (number) {
      case 0: return new Verse(number, NoMore);
      case 1: return new Verse(number, LastOne);
      case 2: return new Verse(number, Penultimate);
      case 3: return new Verse(number, Default);
    }
  }
}

class Verse {
  constructor(number, lyrics) {
    this.number = number;
    this.lyrics = lyrics;
  }

  number() {
    return this.number;
  }

  text() {
    return this.lyrics(this);
  }
}

const downTo = (max, min) => {
  const numbers = [];
  for (let n = max; n >= min; n--) {
    numbers.push(n);
  }
  return numbers;
};
