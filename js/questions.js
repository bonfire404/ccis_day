/**
 * BREAK THE CODE - Beginner & Intermediate Question Bank
 * Curated exclusively for fast-paced team challenges (10 Questions, 30s each).
 * Difficulties: Beginner (+10 pts) and Intermediate (+20 pts).
 */

const questionsBank = [
  // ==========================================
  // BEGINNER (+10 PTS)
  // ==========================================
  {
    id: 1,
    category: "concept",
    categoryLabel: "GUESS THE CONCEPT",
    difficulty: "beginner",
    points: 10,
    question: "I store multiple ordered values in square brackets. My items can be modified anytime. What am I?",
    code: null,
    options: ["list", "tuple", "dict", "set"],
    answer: "list"
  },
  {
    id: 2,
    category: "concept",
    categoryLabel: "GUESS THE CONCEPT",
    difficulty: "beginner",
    points: 10,
    question: "I store key-value pairs using curly braces. I look up values quickly by key. What am I?",
    code: null,
    options: ["dict", "list", "set", "tuple"],
    answer: "dict"
  },
  {
    id: 3,
    category: "concept",
    categoryLabel: "GUESS THE CONCEPT",
    difficulty: "beginner",
    points: 10,
    question: "I hold textual data enclosed in single or double quotes. What data type am I?",
    code: null,
    options: ["str", "int", "bool", "char"],
    answer: "str"
  },
  {
    id: 4,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "beginner",
    points: 10,
    question: "What does this code print?",
    code: "x = 10\ny = 3\nprint(x // y)",
    options: ["3", "3.33", "3.0", "1"],
    answer: "3"
  },
  {
    id: 5,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "beginner",
    points: 10,
    question: "What does this code print?",
    code: "msg = \"Python\"\nprint(msg[0] + msg[-1])",
    options: ["Pn", "Py", "on", "Error"],
    answer: "Pn"
  },
  {
    id: 6,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "beginner",
    points: 10,
    question: "What does this code print?",
    code: "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))",
    options: ["4", "3", "Error", "None"],
    answer: "4"
  },
  {
    id: 7,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "beginner",
    points: 10,
    question: "What does this exponentiation operator output?",
    code: "print(2 ** 3)",
    options: ["8", "6", "9", "5"],
    answer: "8"
  },
  {
    id: 8,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "beginner",
    points: 10,
    question: "What will string multiplication produce in Python?",
    code: "print(\"Py\" * 3)",
    options: ["PyPyPy", "Py 3", "Error", "Py*3"],
    answer: "PyPyPy"
  },
  {
    id: 9,
    category: "complete",
    categoryLabel: "COMPLETE THE CODE",
    difficulty: "beginner",
    points: 10,
    question: "Which keyword fills the blank (___) to iterate through items?",
    code: "fruits = [\"apple\", \"banana\"]\nfor fruit ___ fruits:\n    print(fruit)",
    options: ["in", "of", "from", "with"],
    answer: "in"
  },
  {
    id: 10,
    category: "complete",
    categoryLabel: "COMPLETE THE CODE",
    difficulty: "beginner",
    points: 10,
    question: "Which function fills the blank (___) to get the number of items?",
    code: "scores = [95, 88, 72, 99]\ntotal_students = ___(scores)\nprint(total_students)",
    options: ["len", "count", "size", "length"],
    answer: "len"
  },
  {
    id: 11,
    category: "complete",
    categoryLabel: "COMPLETE THE CODE",
    difficulty: "beginner",
    points: 10,
    question: "Which built-in function is used to display output to the screen?",
    code: "___(\"Break the Code\")",
    options: ["print", "echo", "console.log", "display"],
    answer: "print"
  },
  {
    id: 12,
    category: "bug",
    categoryLabel: "BREAK THE BUG",
    difficulty: "beginner",
    points: 10,
    question: "What syntax fix is required in this condition?",
    code: "age = 18\nif age = 18:\n    print(\"Eligible\")",
    options: ["= to ==", "add 'then'", "remove colon", "quote 18"],
    answer: "= to =="
  },
  {
    id: 13,
    category: "bug",
    categoryLabel: "BREAK THE BUG",
    difficulty: "beginner",
    points: 10,
    question: "What character is missing at the end of the loop header?",
    code: "for i in range(5)\n    print(i * 2)",
    options: ["Missing colon (:)", "Missing semicolon (;)", "Missing do keyword", "Missing arrow (->)"],
    answer: "Missing colon (:)"
  },
  {
    id: 14,
    category: "bug",
    categoryLabel: "BREAK THE BUG",
    difficulty: "beginner",
    points: 10,
    question: "What syntax error occurs if a function body has no indentation?",
    code: "def hello():\nprint(\"Hi\")",
    options: ["IndentationError", "SyntaxWarning", "NameError", "TypeError"],
    answer: "IndentationError"
  },

  // ==========================================
  // INTERMEDIATE (+20 PTS)
  // ==========================================
  {
    id: 15,
    category: "concept",
    categoryLabel: "GUESS THE CONCEPT",
    difficulty: "intermediate",
    points: 20,
    question: "I look like a list enclosed in parentheses, but my elements cannot be changed once created. What am I?",
    code: null,
    options: ["tuple", "list", "array", "string"],
    answer: "tuple"
  },
  {
    id: 16,
    category: "concept",
    categoryLabel: "GUESS THE CONCEPT",
    difficulty: "intermediate",
    points: 20,
    question: "I store unique, unordered elements and automatically eliminate duplicate values. What am I?",
    code: null,
    options: ["set", "list", "dict", "array"],
    answer: "set"
  },
  {
    id: 17,
    category: "concept",
    categoryLabel: "GUESS THE CONCEPT",
    difficulty: "intermediate",
    points: 20,
    question: "I represent a built-in immutable sequence often used for looping over a specific count of numbers. What am I?",
    code: null,
    options: ["range", "slice", "iterator", "counter"],
    answer: "range"
  },
  {
    id: 18,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "intermediate",
    points: 20,
    question: "What does this list slice print?",
    code: "nums = [10, 20, 30, 40, 50]\nprint(nums[1:4])",
    options: ["[20, 30, 40]", "[10, 20, 30]", "[20, 30, 40, 50]", "[10, 20, 30, 40]"],
    answer: "[20, 30, 40]"
  },
  {
    id: 19,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "intermediate",
    points: 20,
    question: "What does boolean arithmetic evaluate to in Python?",
    code: "x = True + True + False\nprint(x)",
    options: ["2", "True", "3", "Error"],
    answer: "2"
  },
  {
    id: 20,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "intermediate",
    points: 20,
    question: "What does this split method output as length?",
    code: "text = \"psits-ua-2026\"\nparts = text.split(\"-\")\nprint(len(parts))",
    options: ["3", "2", "4", "13"],
    answer: "3"
  },
  {
    id: 21,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "intermediate",
    points: 20,
    question: "What does this get method with fallback default print?",
    code: "data = {\"a\": 1, \"b\": 2}\nprint(data.get(\"c\", 99))",
    options: ["99", "None", "KeyError", "0"],
    answer: "99"
  },
  {
    id: 22,
    category: "output",
    categoryLabel: "GUESS THE OUTPUT",
    difficulty: "intermediate",
    points: 20,
    question: "What does this modulo expression return as remainder?",
    code: "print(17 % 5)",
    options: ["2", "3", "3.4", "1"],
    answer: "2"
  },
  {
    id: 23,
    category: "complete",
    categoryLabel: "COMPLETE THE CODE",
    difficulty: "intermediate",
    points: 20,
    question: "Which keyword fills the blank (___) to define a custom function?",
    code: "___ calculate_score(points, bonus):\n    return points + bonus",
    options: ["def", "function", "fn", "fun"],
    answer: "def"
  },
  {
    id: 24,
    category: "complete",
    categoryLabel: "COMPLETE THE CODE",
    difficulty: "intermediate",
    points: 20,
    question: "Which function fills the blank (___) to unpack index and element simultaneously?",
    code: "langs = [\"Python\", \"Rust\"]\nfor i, val in ___(langs):\n    print(f\"{i}: {val}\")",
    options: ["enumerate", "zip", "items", "range"],
    answer: "enumerate"
  },
  {
    id: 25,
    category: "complete",
    categoryLabel: "COMPLETE THE CODE",
    difficulty: "intermediate",
    points: 20,
    question: "Which list method adds a single element to the end of the list?",
    code: "items = [1, 2]\nitems.___(3)\nprint(items)",
    options: ["append", "add", "insert", "push"],
    answer: "append"
  },
  {
    id: 26,
    category: "bug",
    categoryLabel: "BREAK THE BUG",
    difficulty: "intermediate",
    points: 20,
    question: "Why does string concatenation with an integer crash?",
    code: "age = 20\nmessage = \"Age: \" + age\nprint(message)",
    options: ["str + int requires str(age)", "age must be float", "print requires format", "quotes must be single"],
    answer: "str + int requires str(age)"
  },
  {
    id: 27,
    category: "bug",
    categoryLabel: "BREAK THE BUG",
    difficulty: "intermediate",
    points: 20,
    question: "What error occurs when trying to modify an element of a tuple?",
    code: "colors = (\"red\", \"blue\")\ncolors[0] = \"green\"",
    options: ["TypeError: tuple is immutable", "IndexError: out of range", "ValueError: cannot find", "SyntaxError: invalid"],
    answer: "TypeError: tuple is immutable"
  },
  {
    id: 28,
    category: "bug",
    categoryLabel: "BREAK THE BUG",
    difficulty: "intermediate",
    points: 20,
    question: "What exception is raised when referencing an index outside list length?",
    code: "items = [10, 20]\nprint(items[5])",
    options: ["IndexError", "KeyError", "ValueError", "TypeError"],
    answer: "IndexError"
  }
];

/**
 * Returns a balanced 10-question deck:
 * 5 Beginner (+10 pts) + 5 Intermediate (+20 pts), randomly shuffled.
 */
function getBalanced10QuestionDeck() {
  const beginners = questionsBank.filter(q => q.difficulty === "beginner");
  const intermediates = questionsBank.filter(q => q.difficulty === "intermediate");

  // Shuffle both pools
  for (let i = beginners.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [beginners[i], beginners[j]] = [beginners[j], beginners[i]];
  }

  for (let i = intermediates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [intermediates[i], intermediates[j]] = [intermediates[j], intermediates[i]];
  }

  // Draw 5 Beginner + 5 Intermediate
  const deck = [...beginners.slice(0, 5), ...intermediates.slice(0, 5)];

  // Shuffle final 10 questions so difficulty alternates naturally
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}
