class Sheet {
  constructor() {
    this.sheetId = "1zbaFr07fttQ-ZG809zzy98GBZ_tlvM-3qp5Cy83IkGE";
    this.base = `https://docs.google.com/spreadsheets/d/${this.sheetId}/gviz/tq?`;
    this.sheetName = "wisielec";
    this.query = encodeURIComponent("Select *");
    this.url = `${this.base}&sheet=${this.sheetName}&tq=${this.query}`;
    this.data;
    this.quotes = [];
    this.init();
  }

  async getData() {
    this.data = await fetch(this.url)
      .then((res) => res.text())
      .then((rep) => {
        return JSON.parse(rep.substring(47).slice(0, -2));
      });
  }

  async init() {
    await this.getData();
    this.data.table.rows.forEach((element) => {
      let categories = element.c[1].v.split(",");
      categories.forEach((el, index) => {
        categories[index] = el.trim();
      })

      this.quotes.push({
        content: element.c[0].v,
        categories: categories,
      });
    });
  }
}
