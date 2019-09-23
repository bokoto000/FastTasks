function sol() {
  let n = 5;
  let data = ["pn", "mp", "mn", "nm", "np"];
  var ans = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  var letters = [];
  var lettersDepth = [];
  for (let i = 0; i < data.length; i++) {
    let word = data[i];
    data[i] = [];
    let wordLetters = word.split("");
    for (let j = 0; j < wordLetters.length; j++) {
      if (!letters.includes(wordLetters[j])) letters.push(wordLetters[j]);
      data[i].push(wordLetters[j]);
    }
  }

  var mat = [];

  for (let i = 0; i < letters.length; i++) {
    letter = letters[i];
    if (mat[letter] == undefined) mat[letter] = [];
  }

  for (let i = 0; i < data.length - 1; i++) {
    let word2 = data[i + 1],
      word1 = data[i];
    let wordLength = Math.min(word2.length, word1.length);
    for (let j = 0; j < wordLength; j++) {
      if (word1[j] != word2[j]) {
        if (!mat[word1[j]].includes(word2[j])) mat[word1[j]].push(word2[j]);
        break;
      }
    }
  }

  var used = [];
  for (let i = 0; i < letters.length; i++) {
    used[letters[i]] = false;
  }
  function printUsed() {
    for (let i = 0; i < letters.length; i++) {
      console.log("Used " + letters[i] + " " + used[letters[i]]);
    }
  }
  used[letters[0]] = true;
  var NO = false;
  function rec(start) {
    if (NO == true) return;
    used[start] = true;
    let curr = mat[start];
    for (let i = 0; i < curr.length; i++) {
      if (used[curr[i]] == true) NO = true;
      used[curr[i]] = true;
    }
    for (let i = 0; i < curr.length; i++) {
      rec(curr[i]);
    }
  }
  rec(letters[0]);
  if (NO == true) {
    console.log("NO");
    return;
  } else {
    for (let i = 0; i < letters.length; i++) {
      used[letters[i]] = false;
    }
    recSol = (start, depth) => {
      used[start] = true;
      let index = letters.indexOf(start);
      lettersDepth[index] = depth;
      let curr = mat[start];
      if (curr)
        for (let i = 0; i < curr.length; i++) {
          if (used[curr[i]] == false) {
            used[curr[i]] = true;
            let index = letters.indexOf(curr[i]);
            lettersDepth[index] = depth + 1;
          }
        }
      if (curr)
        for (let i = 0; i < curr.length; i++) {
          recSol(curr[i], depth + 1);
        }
    };

    recSol(letters[0], 1);
  }

  var lettersToSwap = [];
  for (let i = 0; i < letters.length; i++) {
    lettersToSwap.push({ letter: letters[i], depth: lettersDepth[i] });
  }
  lettersToSwap.sort(function(a, b) {
    if (a.depth > b.depth) return 1;
    if (a.depth < b.depth) return -1;
    return 0;
  });

  var ansStr = "";
  for (let i = 0; i < lettersToSwap.length; i++) {
    let index = ans.indexOf(lettersToSwap[i].letter);
    ans[index] = "";
    ansStr += lettersToSwap[i].letter;
  }
  for (let i = 0; i < ans.length; i++) {
    ansStr += ans[i];
  }
  console.log(ansStr);
}


/*
pa
pc
mpac
mama
maca
*/