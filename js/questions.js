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
  },
  // ==========================================
  // TRUE OR FALSE QUESTIONS (+20 PTS)
  // ==========================================
  {
    id: 29,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "In Python, strings are immutable and cannot be modified in place once created.",
    code: null,
    options: ["True", "False"],
    answer: "True"
  },
  {
    id: 30,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "In Python, a variable declared inside a function automatically has global scope.",
    code: null,
    options: ["True", "False"],
    answer: "False"
  },
  {
    id: 31,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "Python lists allow storing multiple elements of completely different data types.",
    code: null,
    options: ["True", "False"],
    answer: "True"
  },
  {
    id: 32,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "The boolean expression 'bool(\"\")' evaluates to True in Python.",
    code: "is_valid = bool(\"\")\nprint(is_valid)",
    options: ["True", "False"],
    answer: "False"
  },
  {
    id: 33,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "In Python, tuples can have new items appended to them using the .append() method.",
    code: null,
    options: ["True", "False"],
    answer: "False"
  },
  {
    id: 34,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "The '==' operator checks for value equality, whereas the 'is' operator checks for object identity in memory.",
    code: null,
    options: ["True", "False"],
    answer: "True"
  },
  {
    id: 35,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "Dictionary keys in Python must be hashable and immutable types (such as strings, integers, or tuples).",
    code: null,
    options: ["True", "False"],
    answer: "True"
  },
  {
    id: 36,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "In Python 3, the standard division operator '/' always returns a float even if numbers divide evenly.",
    code: "val = 10 / 2\n# True if float, False if int",
    options: ["True", "False"],
    answer: "True"
  },
  {
    id: 37,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "A 'break' statement in Python restarts the loop from the first iteration.",
    code: null,
    options: ["True", "False"],
    answer: "False"
  },
  {
    id: 38,
    category: "truefalse",
    categoryLabel: "TRUE OR FALSE",
    difficulty: "intermediate",
    points: 20,
    question: "A Python set preserves and displays duplicate values in insertion order.",
    code: "data = {1, 2, 2, 3}\nprint(len(data))",
    options: ["True", "False"],
    answer: "False"
  },
  // ==========================================
  // SYNTAX ERROR CHALLENGES (+20 PTS)
  // ==========================================
  {
    id: 39,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "Identify the syntax error in this Python code snippet:",
    code: "x = 15\nif x > 10\n    print(\"Greater\")",
    options: [
      "Missing colon ':' at the end of the if statement",
      "Variable x must be initialized in parentheses",
      "print() cannot output double-quoted strings",
      "Indentation is not allowed after if statement"
    ],
    answer: "Missing colon ':' at the end of the if statement"
  },
  {
    id: 40,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "What is the syntax error in this string definition?",
    code: "greeting = \"Hello, CCIS Day!\nprint(greeting)",
    options: [
      "Unterminated string literal (missing closing quote)",
      "greeting is a reserved Python keyword",
      "print() cannot accept greeting as a parameter",
      "Strings cannot contain exclamation marks"
    ],
    answer: "Unterminated string literal (missing closing quote)"
  },
  {
    id: 41,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "Why does this variable assignment raise a SyntaxError?",
    code: "1st_place = \"Champion\"\nprint(1st_place)",
    options: [
      "Variable identifiers cannot start with a digit",
      "Strings must use single quotes in Python",
      "Underscores are forbidden in identifier names",
      "print() requires an integer argument"
    ],
    answer: "Variable identifiers cannot start with a digit"
  },
  {
    id: 42,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "What syntax error prevents this condition from running?",
    code: "status = \"online\"\nif status = \"online\":\n    print(\"Active\")",
    options: [
      "Assignment operator '=' used instead of comparison '=='",
      "Strings cannot be compared in an if statement",
      "Colon ':' must be replaced with semicolon ';'",
      "print() must be inside curly brackets"
    ],
    answer: "Assignment operator '=' used instead of comparison '=='"
  },
  {
    id: 43,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "What is the syntax error in this loop declaration?",
    code: "count = 0\nwhlie count < 5:\n    count += 1",
    options: [
      "Misspelled keyword 'whlie' instead of 'while'",
      "Compound assignment '+=' is not valid syntax",
      "count cannot be initialized with 0",
      "Comparison operator '<' is illegal in loop headers"
    ],
    answer: "Misspelled keyword 'whlie' instead of 'while'"
  },
  {
    id: 44,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "Why does this function definition produce a SyntaxError?",
    code: "def calculate_points:\n    return 100",
    options: [
      "Missing parameter parentheses '()' after function name",
      "Functions cannot return numbers in Python",
      "calculate_points must use PascalCase syntax",
      "def must be replaced with function keyword"
    ],
    answer: "Missing parameter parentheses '()' after function name"
  },
  {
    id: 45,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "What syntax error exists in this list definition?",
    code: "items = [10, 20, 30, 40)\nprint(items)",
    options: [
      "Mismatched bracket: opened with '[' but closed with ')'",
      "Numbers in a list must be separated with semicolons",
      "Lists cannot contain more than 3 elements",
      "print() cannot output list objects directly"
    ],
    answer: "Mismatched bracket: opened with '[' but closed with ')'"
  },
  {
    id: 46,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "Why does this code trigger a SyntaxError in Python?",
    code: "class = \"Computer Science\"\nprint(class)",
    options: [
      "Cannot use reserved keyword 'class' as a variable identifier",
      "Strings with spaces must be enclosed in triple quotes",
      "Assignment operator '=' is not allowed with words",
      "Variable names cannot be shorter than 6 characters"
    ],
    answer: "Cannot use reserved keyword 'class' as a variable identifier"
  },
  {
    id: 47,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "What syntax error is present in this conditional branch?",
    code: "val = 20\nif val > 20:\n    print(\"High\")\nelsif val == 20:\n    print(\"Exact\")",
    options: [
      "Invalid keyword 'elsif'; Python uses 'elif'",
      "print(\"Exact\") must be indented with 8 spaces",
      "val == 20 requires a single '=' sign",
      "if statement must be closed with 'endif'"
    ],
    answer: "Invalid keyword 'elsif'; Python uses 'elif'"
  },
  {
    id: 48,
    category: "syntax",
    categoryLabel: "SYNTAX ERROR",
    difficulty: "intermediate",
    points: 20,
    question: "What syntax error occurs in this dictionary creation?",
    code: "player = {\"name\": \"Alex\", \"level\": 5,}",
    options: [
      "No syntax error; trailing commas are valid Python dictionary syntax",
      "Curly braces '{}' cannot be used for dictionaries",
      "Colon ':' must be replaced with an equal sign '='",
      "Key names cannot be enclosed in quotes"
    ],
    answer: "No syntax error; trailing commas are valid Python dictionary syntax"
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

// Automatically randomize options positions so index 0 is not always the answer
if (typeof questionsBank !== "undefined" && Array.isArray(questionsBank)) {
  questionsBank.forEach(q => {
    if (Array.isArray(q.options)) {
      for (let i = q.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
      }
    }
  });
}
