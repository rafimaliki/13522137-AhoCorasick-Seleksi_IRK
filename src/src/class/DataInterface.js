export class DataInterface {
  constructor(data) {
    this.validateData(data);
    this.text = data.text;
    this.patterns = data.patterns;
  }

  validateData(data) {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid import data: bukan merupakan objek");
    }

    if (!data.text) {
      throw new Error("Invalid import data: 'text' tidak ditemukan");
    }

    if (typeof data.text !== "string") {
      throw new Error("Invalid import data: 'text' harus berupa string");
    }

    if (!data.patterns) {
      throw new Error("Invalid import data: 'patterns' tidak ditemukan");
    }

    if (!Array.isArray(data.patterns)) {
      throw new Error(
        "Invalid import data: 'patterns' harus berupa array yang berisi string"
      );
    }

    for (const pattern of data.patterns) {
      if (typeof pattern !== "string") {
        throw new Error(
          "Invalid import data: 'patterns' harus berupa array yang berisi string"
        );
      }
    }
  }
}
