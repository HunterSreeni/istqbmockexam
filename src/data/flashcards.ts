export interface Flashcard {
  id: number
  chapter: number
  chapter_title: string
  term: string
  definition: string
  example?: string
}

export const CHAPTERS = [
  { n: 1, title: 'Fundamentals of Testing' },
  { n: 2, title: 'Testing Throughout the SDLC' },
  { n: 3, title: 'Static Testing' },
  { n: 4, title: 'Test Analysis & Design' },
  { n: 5, title: 'Managing the Test Activities' },
  { n: 6, title: 'Test Tools' },
]

export const flashcards: Flashcard[] = [
  // ── Chapter 1: Fundamentals of Testing ──────────────────────────────────────
  {
    id: 1, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is software testing?',
    definition: 'A set of activities to discover defects and evaluate the quality of software artefacts. It includes both static activities (reviews) and dynamic activities (executing code) and can evaluate non-functional characteristics as well as functionality.',
    example: 'Running a login form with invalid data to verify the system rejects it is a dynamic test.',
  },
  {
    id: 2, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What are the two main types of testing activity?',
    definition: 'Static testing — examining artefacts without executing code (e.g. reviews, static analysis).\nDynamic testing — executing the software and observing behaviour.',
  },
  {
    id: 3, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is a defect (also called a bug or fault)?',
    definition: 'An imperfection or flaw in a work product that causes it to fail to meet its requirements or specification. A defect in code, if executed, may cause a failure.',
  },
  {
    id: 4, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is an error (mistake)?',
    definition: 'A human action that produces an incorrect result. Errors are made by people (developers, analysts, etc.) and lead to defects in work products.',
    example: 'A developer misreads a spec and implements the wrong logic — this is an error that introduces a defect.',
  },
  {
    id: 5, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is a failure?',
    definition: 'An event in which a component or system does not perform a required function within specified limits. Failures are caused by defects when the code is executed.',
    example: 'A banking app crashes when a user transfers £0 — this is a failure caused by an unhandled defect.',
  },
  {
    id: 6, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is a root cause?',
    definition: 'The fundamental reason for the occurrence of a problem. Identifying root causes helps prevent future defects rather than just fixing symptoms.',
  },
  {
    id: 7, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: '7 Testing Principles — list them',
    definition: '1. Testing shows the presence of defects, not their absence.\n2. Exhaustive testing is impossible.\n3. Early testing saves time and money.\n4. Defects cluster together (Pareto principle).\n5. Tests wear out (pesticide paradox).\n6. Testing is context-dependent.\n7. Absence of defects is a fallacy.',
  },
  {
    id: 8, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'Principle: "Testing shows the presence of defects, not their absence"',
    definition: 'Testing can confirm that defects exist but cannot prove a system is completely defect-free. Even after extensive testing, undiscovered defects may remain.',
  },
  {
    id: 9, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'Principle: "Exhaustive testing is impossible"',
    definition: 'Testing every possible input, precondition, and path combination is not feasible. Risk analysis and priorities are used to focus testing effort on the most important areas.',
  },
  {
    id: 10, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'Principle: "Pesticide paradox"',
    definition: 'If the same tests are repeated over and over, they will no longer find new defects. Tests must be regularly reviewed and updated, and new tests must be written to exercise different parts of the software.',
  },
  {
    id: 11, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'Principle: "Defects cluster together"',
    definition: 'A small number of modules or features typically contain the majority of defects found during pre-release testing. This is an application of the Pareto principle (80/20 rule).',
  },
  {
    id: 12, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is the test process? (main activities)',
    definition: '1. Test planning\n2. Test monitoring & control\n3. Test analysis\n4. Test design\n5. Test implementation\n6. Test execution\n7. Test completion',
  },
  {
    id: 13, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is a test basis?',
    definition: 'The body of knowledge used as the basis for test analysis and design. It is the source from which test conditions are derived. Examples: requirements, design documents, user stories, source code, risk analysis.',
  },
  {
    id: 14, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is a test condition?',
    definition: 'A testable aspect of a component or system identified as a basis for testing. Test conditions are derived from the test basis during test analysis.',
    example: '"The system must reject a password shorter than 8 characters" is a test condition.',
  },
  {
    id: 15, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is a test case?',
    definition: 'A set of preconditions, inputs, actions, expected results, and postconditions developed to cover a test condition. Test cases are designed during test design.',
  },
  {
    id: 16, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is a test oracle?',
    definition: 'A source used to determine whether a test has passed or failed — i.e., what the expected result should be. Oracles can be specifications, existing systems, user knowledge, or heuristics.',
  },
  {
    id: 17, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is traceability in testing?',
    definition: 'The ability to link test conditions and test cases back to the test basis (e.g., requirements). Good traceability helps measure coverage and impact-analyse changes.',
  },
  {
    id: 18, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is confirmation testing (re-testing)?',
    definition: 'Testing that runs a previously failing test after a defect has been fixed to confirm the fix works. It targets exactly the defect that was reported.',
  },
  {
    id: 19, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What is regression testing?',
    definition: 'Testing to detect unintended side-effects of a change — confirming that unmodified parts of the system still work correctly after a change, fix, or configuration update.',
  },
  {
    id: 20, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'What are Bloom\'s taxonomy levels used in ISTQB?',
    definition: 'K1 — Remember (recall a term)\nK2 — Understand (explain in own words)\nK3 — Apply (use knowledge to solve a problem)\n\nExam questions are tagged K1, K2, or K3 to indicate cognitive demand.',
  },

  // ── Chapter 2: Testing Throughout the SDLC ──────────────────────────────────
  {
    id: 21, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'What is the SDLC?',
    definition: 'Software Development Life Cycle — the structured process of planning, creating, testing, and deploying software. Testing activities exist in every SDLC model.',
  },
  {
    id: 22, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'Sequential vs Iterative/Incremental development models',
    definition: 'Sequential (e.g. Waterfall): phases flow one after another; testing starts late.\nIterative/Incremental (e.g. Scrum, Kanban, Spiral): software is built and tested in repeated cycles; testing is continuous.',
  },
  {
    id: 23, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'What is the "whole-team approach" in Agile testing?',
    definition: 'Every team member, including testers, developers, and business representatives, shares responsibility for quality. Testers collaborate closely with developers and product owners throughout each iteration.',
  },
  {
    id: 24, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'What are the four test levels?',
    definition: '1. Component (unit) testing — tests individual components in isolation.\n2. Component integration testing — tests interfaces between components.\n3. System testing — tests the whole system end-to-end.\n4. Acceptance testing — validates the system against user/business needs.',
  },
  {
    id: 25, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'Component (Unit) testing',
    definition: 'Tests individual software components in isolation, typically written and run by developers. Uses stubs/drivers to replace missing components. Aims to find defects in logic, algorithms, and data structures.',
  },
  {
    id: 26, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'Component Integration testing',
    definition: 'Tests the interfaces and interactions between integrated components. Performed after component testing. Focuses on communication, data exchange, and integration defects.',
  },
  {
    id: 27, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'System testing',
    definition: 'Tests the behaviour of the complete integrated system. Validates the system against specified requirements. Usually performed by an independent test team in a production-like environment.',
  },
  {
    id: 28, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'Acceptance testing — types',
    definition: 'UAT (User Acceptance Testing) — users validate business scenarios.\nOAT (Operational Acceptance Testing) — operations/sysadmins validate deployment, backup, recovery.\nAlpha testing — done by internal users at the developer\'s site.\nBeta testing — done by external users at their own sites.',
  },
  {
    id: 29, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'What are the four main test types?',
    definition: '1. Functional testing — what the system does (features, functions).\n2. Non-functional testing — how well the system does it (performance, usability, security).\n3. Black-box testing — based on external specification, no code access.\n4. White-box testing — based on internal structure/code.',
  },
  {
    id: 30, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'What is TDD (Test-Driven Development)?',
    definition: 'A development practice where tests are written before the code. The cycle is: Red (write failing test) → Green (write minimum code to pass) → Refactor. Tests guide design and ensure continuous coverage.',
  },
  {
    id: 31, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'What is ATDD (Acceptance Test-Driven Development)?',
    definition: 'Tests are defined from the acceptance criteria of user stories before implementation begins. Collaboration between business, developers and testers to define test cases. Similar to BDD.',
  },
  {
    id: 32, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'What is BDD (Behaviour-Driven Development)?',
    definition: 'Extends TDD by writing tests in a natural language format (Given/When/Then) that business stakeholders can read and verify. Promotes shared understanding of expected system behaviour.',
    example: 'Given a logged-in user, When they click "Logout", Then they should be redirected to the login page.',
  },
  {
    id: 33, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'What is maintenance testing?',
    definition: 'Testing performed on an existing operational system after a change (enhancement, fix, migration, or retirement). Includes impact analysis to determine scope of regression testing needed.',
  },

  // ── Chapter 3: Static Testing ────────────────────────────────────────────────
  {
    id: 34, chapter: 3, chapter_title: 'Static Testing',
    term: 'What is static testing?',
    definition: 'Examination of work products without executing code. It includes reviews (informal, walkthroughs, technical reviews, inspections) and static analysis tools. Finds defects earlier and cheaper than dynamic testing.',
  },
  {
    id: 35, chapter: 3, chapter_title: 'Static Testing',
    term: 'What work products can be examined by static testing?',
    definition: 'Requirements, user stories, acceptance criteria, architecture/design documents, source code, test plans, test cases, project plans, contracts, models (UML diagrams), and more.',
  },
  {
    id: 36, chapter: 3, chapter_title: 'Static Testing',
    term: 'What is a review in static testing?',
    definition: 'A type of static testing where a work product is examined by one or more people to identify defects and improvements. Reviews range from informal to formal (inspection).',
  },
  {
    id: 37, chapter: 3, chapter_title: 'Static Testing',
    term: 'Review types — from informal to formal',
    definition: 'Informal review — no defined process; ad-hoc feedback.\nWalkthrough — author leads; educational; finds defects.\nTechnical review — trained reviewers; peer review; finds defects and evaluates technical quality.\nInspection — most formal; uses defined roles, entry/exit criteria, checklists, and metrics.',
  },
  {
    id: 38, chapter: 3, chapter_title: 'Static Testing',
    term: 'Roles in a formal review (inspection)',
    definition: 'Author — created the work product being reviewed.\nFacilitator (moderator) — leads the review process.\nReview leader — plans and organises the review.\nReviewers — examine the work product and log defects.\nScribe (recorder) — documents defects and decisions.\nManagement — supports the review process.',
  },
  {
    id: 39, chapter: 3, chapter_title: 'Static Testing',
    term: 'Formal review process — phases',
    definition: '1. Planning — scope, objectives, participants, roles.\n2. Review initiation — distribute materials, explain criteria.\n3. Individual review — each reviewer examines independently.\n4. Issue communication — findings discussed and logged.\n5. Fixing and reporting — author fixes defects; exit criteria checked.',
  },
  {
    id: 40, chapter: 3, chapter_title: 'Static Testing',
    term: 'What is static analysis?',
    definition: 'Automated examination of code or models without execution. Performed by tools (linters, SAST tools). Detects issues like coding standards violations, dead code, security vulnerabilities, and undefined variables.',
    example: 'ESLint flagging unused variables in JavaScript code is static analysis.',
  },
  {
    id: 41, chapter: 3, chapter_title: 'Static Testing',
    term: 'Difference: static testing vs dynamic testing for defect finding',
    definition: 'Static testing finds defects directly in the work product (e.g., wrong logic in a spec).\nDynamic testing finds failures at runtime and infers defects from those failures.\nStatic testing is generally cheaper because defects are found earlier.',
  },

  // ── Chapter 4: Test Analysis & Design ───────────────────────────────────────
  {
    id: 42, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'Black-box test techniques — overview',
    definition: 'Derive test cases from the specification without looking at internal code. Cover: Equivalence Partitioning, Boundary Value Analysis, Decision Table Testing, State Transition Testing, Use Case Testing.',
  },
  {
    id: 43, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'Equivalence Partitioning (EP)',
    definition: 'Divides input data into partitions (equivalence classes) where all values in the same partition are expected to be processed identically. One test case per partition is sufficient. Applies to valid and invalid partitions.',
    example: 'For age 18–65 valid: partitions are <18 (invalid), 18–65 (valid), >65 (invalid). Test one value from each.',
  },
  {
    id: 44, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'Boundary Value Analysis (BVA)',
    definition: 'Tests at the boundaries of equivalence partitions where defects are most likely. For each boundary, tests the minimum, minimum+1, maximum-1, and maximum values. 2-value BVA tests min and max; 3-value BVA also tests just inside/outside.',
    example: 'For range 10–20: test 9, 10, 20, 21 (2-value BVA) or 9, 10, 11, 19, 20, 21 (3-value BVA).',
  },
  {
    id: 45, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'Decision Table Testing',
    definition: 'Models complex business logic with multiple conditions and corresponding actions. Each column is a rule (combination of conditions → action). Ensures all condition combinations are tested.',
    example: 'A discount rule based on membership type AND order value: a table captures all combinations (member+high value = 20% off, etc.).',
  },
  {
    id: 46, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'State Transition Testing',
    definition: 'Models a system as a set of states, transitions triggered by events, and actions. Test cases exercise valid transitions, invalid transitions, and state sequences. Good for systems with defined modes or stateful logic.',
    example: 'ATM states: Idle → Card Inserted → PIN Entered → Authenticated. Test valid and invalid PIN transitions.',
  },
  {
    id: 47, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'White-box test techniques — overview',
    definition: 'Derive tests from internal code structure. Common techniques: Statement Coverage and Branch (Decision) Coverage.',
  },
  {
    id: 48, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'Statement Coverage',
    definition: 'Measures what percentage of executable statements have been exercised by tests. 100% statement coverage means every statement was executed at least once. Formula: (statements executed / total statements) × 100%.',
  },
  {
    id: 49, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'Branch (Decision) Coverage',
    definition: 'Measures what percentage of branches (true/false outcomes of decisions) have been executed. 100% branch coverage subsumes 100% statement coverage. Each decision must be tested for both true and false outcomes.',
    example: 'An if/else block: must test the path where condition is true AND where it is false.',
  },
  {
    id: 50, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'Experience-based test techniques',
    definition: 'Error guessing — testers use knowledge of past defects to predict likely errors.\nExploratory testing — simultaneous learning, test design, and execution.\nChecklist-based testing — systematic use of checklists derived from experience.',
  },
  {
    id: 51, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'What is exploratory testing?',
    definition: 'An experience-based approach where the tester simultaneously designs, executes, and learns during a time-boxed session. Sessions are guided by a charter (goal). Effective for finding unexpected defects and when documentation is poor.',
  },
  {
    id: 52, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'What is a test charter?',
    definition: 'A short statement that guides an exploratory testing session by defining the purpose, target area, and/or approach. Example: "Explore the password reset flow to find security vulnerabilities."',
  },
  {
    id: 53, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'What is error guessing?',
    definition: 'An experience-based technique where testers predict likely defects based on their knowledge of how software typically fails, past bugs, and common programmer mistakes. Fault attacks is a structured form of error guessing.',
  },
  {
    id: 54, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'Collaboration-based test approaches',
    definition: 'Approaches where developers, testers, and business reps jointly create test cases from requirements:\n• BDD (Given/When/Then format)\n• ATDD (acceptance criteria become tests before coding)\nThese reduce ambiguity and build shared understanding.',
  },

  // ── Chapter 5: Managing the Test Activities ──────────────────────────────────
  {
    id: 55, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What is a test plan?',
    definition: 'A document describing the scope, approach, resources, and schedule of testing activities. It identifies test items, features to be tested, test tasks, risks, and who is responsible for each task.',
  },
  {
    id: 56, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What is risk in testing?',
    definition: 'A potential problem that may negatively affect the quality of a work product or the success of the project. Risk = Likelihood × Impact. Testing uses risk to prioritise effort.',
  },
  {
    id: 57, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'Product risk vs Project risk',
    definition: 'Product risk — risk related to the quality of the test object (e.g., a feature failing in production).\nProject risk — risk related to the management of the project (e.g., schedule slip, skill shortage, changing requirements).',
  },
  {
    id: 58, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'Risk-based testing',
    definition: 'Using risk analysis to prioritise test activities. Higher-risk areas receive more thorough testing. Risk level = probability of failure × impact of failure. Helps allocate limited test resources effectively.',
  },
  {
    id: 59, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What is test monitoring and control?',
    definition: 'Test monitoring — ongoing collection of data about testing progress (e.g., tests run, defects found, coverage achieved).\nTest control — taking corrective actions when actual progress deviates from the plan (e.g., adding resources, re-prioritising tests).',
  },
  {
    id: 60, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'Common test metrics',
    definition: '• % test cases executed / passed / failed / blocked\n• Defect detection percentage (DDP)\n• Defect density\n• Test coverage (requirement, code)\n• Cost of testing\n• Time to fix defects',
  },
  {
    id: 61, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What is a test summary report?',
    definition: 'A document produced at the end of a test level or project summarising testing activities, results, deviations from plan, risks, and recommendations. Communicates test status to stakeholders.',
  },
  {
    id: 62, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What is configuration management in testing?',
    definition: 'The discipline of identifying, controlling, and tracking changes to work products throughout the project. In testing it ensures test artefacts (test plans, test cases, test data) are version-controlled and linked to the correct version of the software.',
  },
  {
    id: 63, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What is defect management?',
    definition: 'The process of recording, classifying, investigating, resolving, and reporting defects. Includes a defect lifecycle (new → assigned → fixed → retested → closed). Defect reports should be clear, reproducible, and include expected vs actual results.',
  },
  {
    id: 64, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What should a good defect report include?',
    definition: '• Unique identifier\n• Title / summary\n• Date, author, test environment\n• Steps to reproduce\n• Expected result\n• Actual result\n• Severity and priority\n• Status\n• References (test case, log files, screenshots)',
  },
  {
    id: 65, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'Severity vs Priority in defects',
    definition: 'Severity — degree of impact on the system (technical view). High severity = system crash.\nPriority — order in which a defect should be fixed (business view). A typo on the homepage may be low severity but high priority.',
  },
  {
    id: 66, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What are entry criteria and exit criteria?',
    definition: 'Entry criteria — conditions that must be met before a test activity can start (e.g., build available, test environment ready).\nExit criteria — conditions that must be met before a test activity is considered complete (e.g., 95% tests passed, no critical open defects).',
  },
  {
    id: 67, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What is a test pyramid?',
    definition: 'A model showing the ideal distribution of test types: many fast unit tests at the base, fewer integration tests in the middle, and even fewer slow UI/end-to-end tests at the top. Promotes fast feedback and lower cost.',
  },
  {
    id: 68, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What is the defect detection percentage (DDP)?',
    definition: 'DDP = (defects found in testing / total defects) × 100%.\nA measure of test effectiveness. A high DDP means testing caught most defects before production. Used to evaluate quality of the test process.',
  },

  // ── Chapter 6: Test Tools ────────────────────────────────────────────────────
  {
    id: 69, chapter: 6, chapter_title: 'Test Tools',
    term: 'Categories of test tools',
    definition: '• Test management tools (e.g., Jira, TestRail)\n• Static analysis tools (e.g., SonarQube, ESLint)\n• Test design & modelling tools\n• Test execution & automation tools (e.g., Selenium, Cypress)\n• Performance testing tools (e.g., JMeter, Gatling)\n• CI/CD tools (e.g., Jenkins, GitHub Actions)',
  },
  {
    id: 70, chapter: 6, chapter_title: 'Test Tools',
    term: 'Benefits of test automation',
    definition: '• Reduces repetitive manual effort (especially regression testing)\n• Enables faster feedback in CI/CD pipelines\n• Increases repeatability and consistency\n• Can run tests 24/7 without human intervention\n• Improves coverage over time',
  },
  {
    id: 71, chapter: 6, chapter_title: 'Test Tools',
    term: 'Risks and limitations of test automation',
    definition: '• Initial investment in tooling and scripting is high\n• Maintenance overhead as the application changes\n• False sense of security — automated tests cannot find all defects\n• Requires skill to write good, maintainable scripts\n• Not all tests are suitable for automation (e.g., usability testing)',
  },
  {
    id: 72, chapter: 6, chapter_title: 'Test Tools',
    term: 'What is CI/CD and how does testing fit in?',
    definition: 'Continuous Integration (CI) — developers merge code frequently; automated tests run on each merge to detect integration issues early.\nContinuous Delivery/Deployment (CD) — software is always in a deployable state. Automated testing is the safety net enabling fast, reliable releases.',
  },
  {
    id: 73, chapter: 6, chapter_title: 'Test Tools',
    term: 'Factors for choosing a test tool',
    definition: '• Technology stack compatibility\n• Ease of use and learning curve\n• Community and vendor support\n• Licensing cost\n• Integration with existing tools (CI, defect trackers)\n• Scalability and reporting capabilities',
  },
  {
    id: 74, chapter: 6, chapter_title: 'Test Tools',
    term: 'What is a test management tool?',
    definition: 'A tool that helps plan, track, and report on testing activities. Features include: test case repository, test execution tracking, defect linkage, dashboards, and traceability to requirements.',
    example: 'TestRail, Jira (with Zephyr), Azure DevOps Test Plans.',
  },
  {
    id: 75, chapter: 6, chapter_title: 'Test Tools',
    term: 'What is model-based testing (MBT)?',
    definition: 'An approach where test cases are automatically generated from a formal model of the system (e.g., state machine, decision tree). Reduces manual test design effort and improves coverage consistency.',
  },

  // ── Extra cross-chapter concepts ─────────────────────────────────────────────
  {
    id: 76, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'Why is testing necessary? (key reasons)',
    definition: '• Software defects can cause significant financial loss, injury, or reputational damage.\n• Testing provides confidence that software meets requirements.\n• Testing is required by contracts, regulations, or standards.\n• Testing helps improve quality and reduce cost of defects found later.',
  },
  {
    id: 77, chapter: 1, chapter_title: 'Fundamentals of Testing',
    term: 'Verification vs Validation',
    definition: 'Verification — "Are we building the product right?" Checks conformance to specification (e.g., requirements review, code inspection).\nValidation — "Are we building the right product?" Checks that the system meets actual user needs (e.g., acceptance testing).',
  },
  {
    id: 78, chapter: 2, chapter_title: 'Testing Throughout the SDLC',
    term: 'What is the "shift-left" principle?',
    definition: 'Moving testing activities earlier in the SDLC to detect defects sooner when they are cheaper to fix. Includes reviewing requirements, writing unit tests before code, and static analysis during development.',
  },
  {
    id: 79, chapter: 4, chapter_title: 'Test Analysis & Design',
    term: 'Use Case Testing',
    definition: 'Derives test cases from use cases that describe interactions between actors and the system. Tests include the basic (happy) flow and alternative/error flows. Useful for finding integration defects across component interactions.',
  },
  {
    id: 80, chapter: 5, chapter_title: 'Managing the Test Activities',
    term: 'What is independent testing?',
    definition: 'Testing performed by someone other than the author of the software. Independence levels range from none (developer tests own code) to full (external organisation tests the system). Higher independence increases objectivity but reduces communication speed.',
  },
]
