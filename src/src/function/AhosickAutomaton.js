export class AhosickAutomaton {
  constructor(data) {
    this.text = data.text.toLowerCase();
    this.patterns = data.patterns.map((pattern) => pattern.toLowerCase());

    this.trie = {};
    this.value_of_id = {};
    this.id_of_value = {};
    this.is_final = {};

    this.failure_links = {};
    this.dictionary_links = {};

    this.build_trie();
    this.build_failure_links();
    this.build_dictionary_links();

    // console.log(this.trie);
    // console.log(this.failure_links);
    // console.log(this.dictionary_links);
    // console.log(this.value_of_id);
    // console.log(this.id_of_value);
    // console.log(this.is_final);
  }

  build_trie() {
    let id = 0;
    this.trie[id] = [];
    this.value_of_id[id] = "";
    this.id_of_value[""] = id;
    this.is_final[id] = false;

    for (const pattern of this.patterns) {
      let value = "";
      let node = this.trie[0];

      for (const char of pattern) {
        value += char;

        let found = false;
        for (const child_id of node) {
          if (this.value_of_id[child_id] === value) {
            found = true;
            node = this.trie[child_id];
            break;
          }
        }

        if (!found) {
          id++;
          this.trie[id] = [];
          this.value_of_id[id] = value;
          this.id_of_value[value] = id;
          node.push(id);
          node = this.trie[id];
          this.is_final[id] = false;
        }
        // if (pattern[0] == "a") console.log(pattern, id);
      }

      this.is_final[this.id_of_value[pattern]] = true;
    }
  }

  build_failure_links() {
    this.failure_links[0] = 0;

    for (const node in this.trie) {
      let string = this.value_of_id[node];

      for (let i = 1; i <= string.length; i++) {
        let suffix = string.slice(i, string.length);
        let suffix_id = this.id_of_value[suffix];

        if (suffix_id || suffix_id === 0) {
          this.failure_links[node] = suffix_id;
          break;
        }
      }
    }
  }

  build_dictionary_links() {
    for (const node in this.trie) {
      let failure = this.failure_links[node];

      while (this.is_final[failure] === false && failure !== 0) {
        failure = this.failure_links[failure];
      }

      if (this.is_final[failure]) {
        this.dictionary_links[node] = failure;
      }
    }
  }

  find_patterns() {
    let found = [];

    let key = "";
    let curr_id = 0;
    let index = -1;

    for (const char of this.text) {
      key += char;
      index++;
      let id = this.id_of_value[key];

      while (!(id || id === 0)) {
        curr_id = this.failure_links[curr_id];
        key = this.value_of_id[curr_id] + char;

        if (curr_id === 0 && !this.id_of_value[key]) {
          key = "";
        }

        id = this.id_of_value[key];
      }

      // console.log(key, id);
      let dict_id = this.dictionary_links[id];
      while (dict_id) {
        let dict_key = this.value_of_id[dict_id];

        if (!found.hasOwnProperty(dict_key)) {
          found[dict_key] = [
            {
              start: index - dict_key.length + 1,
              end: index,
            },
          ];
        } else {
          found[dict_key].push({
            start: index - dict_key.length + 1,
            end: index,
          });
        }

        dict_id = this.dictionary_links[dict_id];
      }

      //   console.log("key:", key, "id:", id);
      if ((id === 0 || id) && this.is_final[id]) {
        if (!found.hasOwnProperty(key)) {
          found[key] = [{ start: index - key.length + 1, end: index }];
        } else {
          found[key].push({ start: index - key.length + 1, end: index });
        }
        if (this.trie[id].length === 0) {
          curr_id = this.failure_links[id];
          key = this.value_of_id[curr_id];
        }
      }
    }

    // console.log(found);
    let result = [];
    for (const key in found) {
      result.push({
        pattern: key,
        positions: found[key],
      });
    }
    return result;
  }
}
