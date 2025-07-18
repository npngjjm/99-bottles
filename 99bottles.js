class Bottles {
  song() {
    return this.verses(99, 0);
  }

  verses(hi, lo) {
    return downTo(hi, lo).map((n) => this.verses(n).join("\n"));
  }

  verse(n) {
    return;
  }
}
