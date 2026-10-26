// Static course reference data used by the eligibility calculator.
// Loaded as a classic script (not a module) so the planner still works when
// index.html is opened directly from disk (file://).

// Which first-year courses are relevant per program.
// Not currently used by the UI; kept for future program-specific features.
const programCourseMap = {
  'Aerospace': ['MTH140','MTH141','MTH240','PCS211','MEC222','ELE202'],
  'Biomedical': ['MTH140','MTH141','CHY211','PCS211','BME100'],
  'Chemical': ['MTH140','MTH141','CHY211','CHE200'],
  'Civil': ['MTH140','MTH141','MTH240','CVL207','CHY211'],
  'Computer': ['MTH140','MTH141','CPS125','CPS188','PCS211'],
  'Electrical': ['MTH140','MTH141','ELE202','PCS211'],
  'Industrial': ['MTH140','MTH141','PCS211','MEC222'],
  'Mechanical': ['MTH140','MTH141','MEC222','PCS211','MTH240'],
  'Mechatronics': ['MTH140','MTH141','MEC222','ELE202','PCS211'],
  'Materials': ['MTH140','MTH141','MTL200','CHY211'],
  'Environmental': ['MTH140','MTH141','CHY211','CVL207'],
  'Software': ['MTH140','MTH141','CPS125','CPS188']
};

// Course details keyed by normalized course code (e.g. 'MTH140').
// `prereqs` is free text parsed by parsePrereqs() in eligibility.js.
const courseInfoMap = {
  'CHE200': {
    title: 'CHE 200 - Chemical Engineering Fundamentals',
    description: 'Fundamentals and principles of chemical engineering; analysis and synthesis of chemical and biochemical processes; material and energy balances for reacting and non-reacting systems; recycle and by-pass systems; phase equilibrium; and combustion. Weekly Contact: Lecture: 4 hrs; Tutorial: 2 hrs. GPA Weight: 1.00. Course Count: 1.00; Billing Units: 1.',
    prereqs: 'CHY 102',
    coreqs: 'None',
    antireqs: 'None',
    customRequisites: 'None'
  },
  'CPS125': {
    title: 'CPS 125 - Digital Computation and Programming',
    description: 'Introduces concepts, theory and practice of computer programming using the C programming language. Topics include program structure, control flow, standard libraries, functions, arrays, pointers, sorting, matrix operations, strings, dynamic storage, structures and file I/O. Weekly Contact: Lab: 2 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'CPS 188'
  },
  'CPS188': {
    title: 'CPS 188 - Computer Programming Fundamentals',
    description: 'Foundational C programming course for engineering students covering program organisation, data types, selection/repetition, libraries, functions, arrays, pointers, recursion, dynamic storage, structures and I/O. Weekly Contact: Lab: 2 hrs; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'CPS 125'
  },
  'CVL207': {
    title: 'CVL 207 - Graphics',
    description: 'Descriptive geometry and modern drafting tools: orthographic/auxiliary views, intersections, developments, pictorial drawing; 2D and 3D CAD (AutoCAD) for civil engineering; structural drafting for steel, concrete and timber. Weekly Contact: Lab: 2 hrs; Lecture: 2 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'None'
  },
  'ELE202': {
    title: 'ELE 202 - Electric Circuit Analysis',
    description: 'Introductory one-semester course in circuit analysis: resistive circuits, circuit theorems, energy storage elements, transient responses, sinusoidal steady-state, and AC power concepts. Weekly Contact: Lab: 1.5 hrs; Lecture: 4 hrs; Tutorial: 0.5 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MTH 140 and MTH 141',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC222': {
    title: 'MEC 222 - Engineering Graphical Communication',
    description: 'Technical drawing to Canadian/international standards: orthographic views, sectioning, dimensioning, tolerancing, assemblies, parts lists, free-hand sketching and CAD labs. Weekly Contact: Lab: 2 hrs; Lecture: 2 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MTH140': {
    title: 'MTH 140 - Calculus I',
    description: 'Limits, continuity, differentiation, extrema, curve sketching, definite/indefinite integrals, Fundamental Theorem of Calculus, areas and volumes, transcendental functions. Weekly Contact: Lab: 2 hrs; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'MTH 207 and MTH 131 (available only to engineering/special students)'
  },
  'MTH141': {
    title: 'MTH 141 - Linear Algebra',
    description: 'Euclidean spaces, matrices, determinants, linear systems, linear transformations, bases and dimensions, eigenvalues, vector spaces and applications. Weekly Contact: Lab: 1 hr; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'MTH 108'
  },
  'MTH240': {
    title: 'MTH 240 - Calculus II',
    description: 'Integration techniques, improper integrals, partial derivatives, sequences and series, power series, first-order differential equations and applications. Weekly Contact: Lab: 1 hr; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MTH 140',
    coreqs: 'None',
    antireqs: 'MTH 310 and MTH 231'
  },
  'MTL200': {
    title: 'MTL 200 - Materials Science Fundamentals',
    description: 'Atomic structure, bonding, crystallinity, defects, diffusion, phase diagrams, structures of metals/polymers/ceramics, corrosion and thermal/electrical material properties. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CHY 102',
    coreqs: 'None',
    antireqs: 'None'
  },
  'PCS211': {
    title: 'PCS 211 - Physics: Mechanics',
    description: 'Vector forces, free body diagrams, equilibrium, centre of mass, kinematics, Newtonian dynamics, work and energy, momentum and angular momentum. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs; Tutorial: 1 hr. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'None',
    customRequisites: 'Available only to Engineering students.'
  },
  'AER309': {
    title: 'AER 309 - Basic Thermodynamics',
    description: 'Introductory thermodynamics: systems and properties, first/second law, entropy, thermodynamic cycles, control volume analysis and gas power systems. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CPS 125 and MTH 240 and PCS 211',
    coreqs: 'None',
    antireqs: 'None'
  },
  'AER318': {
    title: 'AER 318 - Dynamics',
    description: 'Particles and rigid bodies: kinematics and kinetics, planar motion, equations of motion, work and energy, impulse and momentum, applications to mechanical linkages. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'AER 222 and MTH 141 and MTH 240 and PCS 211',
    coreqs: 'None',
    antireqs: 'None'
  },
  'AER320': {
    title: 'AER 320 - Statics and Intro to Strength of Materials',
    description: 'Rigid body equilibrium, trusses, frames, method of joints/sections, introduction to strength of materials: stress, strain, bending, shear and beam analysis. Weekly Contact: Lab: 1 hr; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'AER 222 and MTH 141 and MTH 240 and MTL 200 and PCS 211',
    coreqs: 'None',
    antireqs: 'None'
  },
  'AER509': {
    title: 'AER 509 - Control Systems',
    description: 'System modelling, time-domain/time-response analysis, open/closed loop analysis, stability (Routh, root locus, Bode), frequency response, control design methods. Weekly Contact: Lab: 1.5 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'AER 403 and CMN 432 and EES 612',
    coreqs: 'None',
    antireqs: 'None'
  },
  'AER520': {
    title: 'AER 520 - Stress Analysis',
    description: 'Torsion, shear and bending moment analysis, combined loading, deflections (Castigliano), strain/stress transformation and Mohr\'s circle, experimental stress analysis. Weekly Contact: Lab: 1 hr; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'AER 320 and CEN 199 and CMN 432 and MTH 410 and MTH 425',
    coreqs: 'None',
    antireqs: 'None'
  },
  'AER615': {
    title: 'AER 615 - Aircraft Performance',
    description: 'Aircraft performance and safety standards, takeoff/landing performance, range-payload analysis, climb/cruise performance, flight planning and automatic flight control systems. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'AER 504',
    coreqs: 'None',
    antireqs: 'None'
  },
  'BME323': {
    title: 'BME 323 - Statics and Mechanics of Materials',
    description: 'Statics: rigid body equilibrium, two- and three-force members, trusses, frames and machines. Mechanics of materials: introductory stress and strain, Hooke\'s Law, axial and torsional loading, and statically indeterminate problems. Weekly Contact: Lab: 1 hr; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'BME 100, CHY 102, CPS 188, ELE 202, MTH 240, PCS 125',
    coreqs: 'None',
    antireqs: 'MEC 323',
    customRequisites: 'None'
  },
  'BME328': {
    title: 'BME 328 - Digital Systems',
    description: 'Fundamentals of digital logic and modern digital system design including Boolean algebra, combinational and sequential logic, CAD tools and hardware description languages, and implementation on CPLDs/FPGAs. Laboratory work uses CAD tools to design and simulate basic digital circuits. Weekly Contact: Lab: 3 hrs; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 2.',
    prereqs: 'CPS 188, ELE 202, MTH 240',
    coreqs: 'None',
    antireqs: 'None'
  },
  'CPS688': {
    title: 'CPS 688 - Advanced Algorithms',
    description: 'Algorithms with an engineering emphasis: divide-and-conquer, graph decompositions, greedy algorithms, dynamic programming, linear programming and reductions, NP-completeness and coping strategies, and quantum algorithms. Weekly Contact: Lab: 2 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'COE 428',
    coreqs: 'None',
    antireqs: 'CPS 616'
  },
  'BME639': {
    title: 'BME 639 - Control Systems and Bio-Robotics',
    description: 'System modelling, simulation and classical controller design for linear time-invariant systems; stability (Routh-Hurwitz), root locus, Bode and Nyquist methods; introduction to state-space representation and basic feedback design. Lab experiments use modular servo-systems integrated with MATLAB/Simulink. Weekly Contact: Lab: 1.5 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'BME 532, CEN 199',
    coreqs: 'None',
    antireqs: 'ELE 639'
  },
  'BME674': {
    title: 'BME 674 - Biomedical Instrumentation',
    description: 'Application and design of medical instrumentation for signals from living tissue: transduction, sensors, amplification, signal processing, electrodes and biopotential amplifiers, non-invasive measurement techniques, and electrical safety. Design labs and a final design project using circuit simulation tools. Weekly Contact: Lab: 2 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'BLG 601, BLG 701, BME 506, BME 538, CEN 199',
    coreqs: 'BME 532',
    antireqs: 'None'
  },
  'CHE308': {
    title: 'CHE 308 - Mass Transfer',
    description: 'Mass transfer fundamentals including molecular and convective mass transfer, diffusion, mass transfer coefficients, interphase mass transfer and applications such as distillation. Weekly Contact: Lecture: 3 hrs; Tutorial: 2 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CEN 199, CHE 214, CHE 220',
    coreqs: 'None',
    antireqs: 'None'
  },
  'CHE312': {
    title: 'CHE 312 - Chemical Reaction Engineering',
    description: 'Chemical kinetics, rate laws, kinetics in batch and flow systems, reactor design for ideal reactors and networks, non-isothermal reactors, and catalytic reactors. Weekly Contact: Lecture: 3 hrs; Tutorial: 2 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CHE 318',
    coreqs: 'None',
    antireqs: 'None'
  },
  'CHE319': {
    title: 'CHE 319 - Process Modeling and Simulation',
    description: 'Mathematical modelling and simulation of processes: conservation equations, solution techniques for ODEs/PDEs, Laplace transforms, transfer functions, dynamic behaviour, and use of software to simulate process dynamics. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs; Tutorial: 1 hr. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CHE 318 and CHE 338',
    coreqs: 'CHE 312',
    antireqs: 'None'
  },
  'CHE338': {
    title: 'CHE 338 - Chemical Engineering Computations',
    description: 'Introduction to numerical methods for chemical engineering problems: numerical errors, root-finding, linear and nonlinear algebraic solvers, interpolation, least-squares fitting, numerical integration/differentiation, and solution of ODEs/PDEs. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs; Tutorial: 1 hr. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CEN 199, CHE 200, CHE 214, CHE 220, CPS 125',
    coreqs: 'None',
    antireqs: 'None'
  },
  'CHE474': {
    title: 'CHE 474 - Nanotechnology and Its Applications',
    description: 'Principles of nanotechnology and applications in chemical engineering: nanostructured materials, manufacturing methods, characterization, properties and toxicological effects; applications in electronics, energy and other technologies. Weekly Contact: Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CHE 307',
    coreqs: 'None',
    antireqs: 'None'
  },
  'COE318': {
    title: 'COE 318 - Software Systems',
    description: 'Software development cycle: requirements analysis, specification, implementation, testing, debugging and integration. Object-oriented decomposition into classes and modules. Weekly Contact: Lab: 2 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CHY 102, CPS 188, ELE 202, MTH 240, PCS 211',
    coreqs: 'None',
    antireqs: 'None'
  },
  'COE328': {
    title: 'COE 328 - Digital Systems',
    description: 'Digital logic and system design, CAD tools and HDL, implementation technologies (CPLDs/FPGAs), combinational and sequential circuits, CPU datapath and control units. Weekly Contact: Lab: 3 hrs; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 2.',
    prereqs: 'CPS 188, ELE 202, MTH 240',
    coreqs: 'None',
    antireqs: 'None'
  },
  'CVL320': {
    title: 'CVL 320 - Strength of Materials I',
    description: 'Analysis of trusses, frames, beams, arches and cables; reactions, shear force and bending moment diagrams; stress and strain; Hooke\'s law and generalized elasticity relations; strain measurement and rosette analysis. Laboratory work included. Weekly Contact: Lab: 3 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CEN 100, MTH 141, MTH 240, MTL 200, PCS 125, PCS 211',
    coreqs: 'None',
    antireqs: 'None'
  },
  'CVL500': {
    title: 'CVL 500 - Introduction to Structural Design',
    description: 'Types of structures; loads and load factors; properties and behaviour of structural steel, reinforced concrete and timber; design of beams, slabs and short columns; design for ultimate and serviceability limit states. Weekly Contact: Lecture: 3 hrs; Tutorial: 2 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CEN 199, CVL 420',
    coreqs: 'None',
    antireqs: 'None'
  },
  'BME100': {
    title: 'BME 100 - Introduction to Biomedical Engineering',
    description: 'Terminology of the medical profession; anatomy and physiology overview; exposure to medical equipment and small animal handling; seminars from guest speakers. Graded pass/fail. Lab: 1 hr. Lecture: 1 hr. GPA weight 1.0.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'None'
  },
  'EES512': {
    title: 'EES 512 - Electric Circuits',
    description: 'One-semester lecture/lab course covering basic electric circuit parameters and laws: sources, resistive circuits, DC analysis, capacitance and inductance, transient responses, AC phasors, reactance/impedance, resonance, and real/complex power in reactive loads. Weekly Contact: Lecture: 3 hrs; Tutorial: 2 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MTH 140 and MTH 141',
    coreqs: 'None',
    antireqs: 'None'
  },
  'EES612': {
    title: 'EES 612 - Electric Machines and Actuators',
    description: 'Covers DC and AC machines, transformer applications, motor characteristics and drives, power electronic converters (H-bridges, PWM), interfacing and control of DC servo/stepper and AC induction/synchronous machines, and basic speed/torque control techniques. Weekly Contact: Lab: 2 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CEN 199 and (EES 512 or MTE 401)',
    coreqs: 'None',
    antireqs: 'None'
  },
  'ELE639': {
    title: 'ELE 639 - Control Systems',
    description: 'Introductory control theory: modelling, simulation, transfer functions, block diagrams, time- and frequency-domain analysis, Routh-Hurwitz, Root Locus, Bode/Nyquist methods, and classical controller design (lead/lag, PID). Labs use DSP-based servomotor systems and MATLAB/Simulink. Weekly Contact: Lab: 1.5 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'ELE 532 and CEN 199',
    coreqs: 'None',
    antireqs: 'None'
  },
  'IND832': {
    title: 'IND 832 - Reliability and Decision Analysis',
    description: 'Analytical approaches to reliability engineering (reliability functions, failure data, system reliability, design for reliability, maintenance) and decision analysis (decision trees, value of information, risk assessment, utility theory, multi-objective decision-making). Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MEC 325, MTH 410, MTH 510',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC309': {
    title: 'MEC 309 - Basic Thermodynamics',
    description: 'Introductory thermodynamics: systems and properties, first and second laws, entropy, control-volume analysis, pure substances, ideal gas model, thermodynamic cycles (Otto, Diesel, Brayton), and efficiencies. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs; Tutorial: 1 hr. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MTH 240, MTL 200, PCS 211',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC311': {
    title: 'MEC 311 - Dynamics',
    description: 'Particles and rigid bodies in motion: kinematics and kinetics, work and energy, impulse and momentum, vibrating systems and practical applications such as clutches and brakes. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'PCS 211, MTH 141, MTH 240',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC323': {
    title: 'MEC 323 - Statics and Mechanics of Materials',
    description: 'Rigid body equilibrium, two- and three-force members, trusses, frames and machines; mechanics of materials topics including stress/strain, Hooke\'s Law, axial/torsional loading and statically indeterminate problems. Weekly Contact: Lab: 1 hr; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'PCS 211, MTH 240, MTH 141',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC430': {
    title: 'MEC 430 - Solid Mechanics I',
    description: 'Stress and strain analysis, stress transformation, principal stresses, Mohr\'s Circle, flexural analysis, beams and shafts design, columns and buckling (Euler), and related applied topics. Weekly Contact: Lab: 1.5 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CEN 199, MEC 323, MTL 200, MTH 425',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC511': {
    title: 'MEC 511 - Thermodynamics and Fluids',
    description: 'Scope of thermodynamics and fluid flow: energy, heat and work, first and second laws, properties of substances, control-mass and control-volume analysis, entropy, conservation equations for fluid flow and one-dimensional flow applications. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CEN 199, CHY 102, PCS 211, (CPS 125 or CPS 188), ELE 202',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC522': {
    title: 'MEC 522 - Fluid Mechanics',
    description: 'Fluid properties and statics, manometry, forces on submerged planes, continuity, energy and momentum equations, one-dimensional flow in conduits, dimensional analysis and model testing. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MTH 141, PCS 211, CPS 125, CVL 207, MTH 240, MTL 200',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC701': {
    title: 'MEC 701 - Heat Transfer',
    description: 'Fundamental course in heat transfer covering conduction, convection and radiation; analytical, graphical and numerical solutions for steady and unsteady conduction; convection analysis and heat exchanger theory and design. (2 hr. Lab every other week) Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MEC 309 and MEC 516',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC709': {
    title: 'MEC 709 - Control Systems',
    description: 'Mathematical models of physical control systems; open and closed-loop analysis, block diagram algebra, stability analysis (Bode, Routh-Hurwitz, Root Locus) and introduction to compensator design (lead/lag). Weekly Contact: Lab: 1 hr; Lecture: 3 hrs; Tutorial: 1 hr. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: '(EES 512 or MTE 401) and MEC 311 and MEC 325 and MTH 425',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MEC832': {
    title: 'MEC 832 - Reliability and Decision Analysis',
    description: 'Analytical approaches to reliability engineering and decision analysis: reliability functions, failure data analysis, system reliability, maintenance, decision trees, value of information, risk assessment and multi-objective decision making. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MEC 325, MTH 410, MTH 510',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MTE301': {
    title: 'MTE 301 - Programming for Mechatronics Engineering',
    description: 'Programming for digital computation in mechatronics: C/C++, MATLAB/Simulink and Python basics, program structure, OOP, GUIs, algorithm analysis, recursion and basic data structures. Weekly Contact: Lab: 2 hrs; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CPS 188',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MTE501': {
    title: 'MTE 501 - Signals and Systems for Mechatronics Engineering',
    description: 'Continuous- and discrete-time signals and systems, LTI system representations, convolution, Fourier analysis, Laplace and Z-transforms, sampling and frequency-domain analysis. Weekly Contact: Lab: 2 hrs; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CEN 199, MTH 425, MTE 401, MTE 301',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MTE502': {
    title: 'MTE 502 - Microprocessor Systems',
    description: 'Introduces microprocessor-based systems: digital logic review, microprocessor architectures (8/16/32-bit), assembly and high-level languages, I/O, memory, interrupts, peripheral devices and case studies. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MEC 325, MTE 301, MTH 425',
    coreqs: 'None',
    antireqs: 'None'
  },
  'MTH410': {
    title: 'MTH 410 - Statistics',
    description: 'Statistical methods including discrete and continuous distributions, confidence intervals, hypothesis testing, correlation and simple linear regression. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MTH 141 and MTH 240',
    coreqs: 'None',
    antireqs: 'MTH 304, MTH 380, MTH 404'
  },
  'MTH425': {
    title: 'MTH 425 - Differential Equations and Vector Calculus',
    description: 'Review of ODEs, higher-order linear equations, Laplace transforms, vector calculus (grad, div, curl), line/surface/multiple integrals and fundamental theorems (Green, Stokes, Divergence). Weekly Contact: Lab: 2 hrs; Lecture: 4 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MTH 140 and MTH 141 and MTH 240',
    coreqs: 'None',
    antireqs: 'MTH 312, MTH 330, MTH 430, MTH 350'
  },
  'MTH510': {
    title: 'MTH 510 - Numerical Analysis',
    description: 'Numerical methods: Taylor error, solution of nonlinear equations, LU decomposition, iterative linear solvers, eigenvalues, interpolation, numerical integration and numerical ODE solvers. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MTH 141 and MTH 240',
    coreqs: 'None',
    antireqs: 'MTH 501'
  },
  'MTH514': {
    title: 'MTH 514 - Probability and Stochastic Processes',
    description: 'Probability theory and stochastic processes, random variables, transforms, joint/marginal distributions, stochastic processes (stationarity, ergodicity), power spectral density and applications. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'MTH 312 or MTH 425',
    coreqs: 'None',
    antireqs: 'None'
  },
  'PCS213': {
    title: 'PCS 213 - Physics: Light and Modern Physics',
    description: "Ray and wave models of light; reflection, refraction, interference, diffraction and polarization; Planck's hypothesis, Bohr model, photoelectric effect, uncertainty principle, Schrodinger equation, nuclear properties and radioactivity. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.",
    prereqs: 'PCS 125',
    coreqs: 'None',
    antireqs: 'None'
  },
  'PCS224': {
    title: 'PCS 224 - Solid State Physics',
    description: 'Quantum nature of solids, band theory of metals and semiconductors, conduction processes, p-n junctions, transistors and other solid-state devices. Weekly Contact: Lab: 1 hr; Lecture: 3 hrs; Tutorial: 1 hr. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'PCS 110 or PCS 125 or PCS 130',
    coreqs: 'None',
    antireqs: 'None'
  },
  // Engineering Management Science (EMS) courses
  'EMS201': {
    title: 'EMS 201 - Entrepreneurship and Innovation Management',
    description: 'Illustrates how managers implement innovation in their areas of responsibility. Covers leadership, entrepreneurial thinking, creativity, and approaches to managing change for new ventures or intra-company innovation. Weekly Contact: Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'None'
  },
  'EMS202': {
    title: 'EMS 202 - Operations Management',
    description: 'Topics include productivity; competitiveness and strategy; quality management; product and service design; process selection; design of work systems; learning curves; inventory management; MRP, JIT; maintenance and reliability; and an introduction to supply chain management. Weekly Contact: Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'None'
  },
  'EMS204': {
    title: 'EMS 204 - Organization Design and Dynamics',
    description: 'Develops theoretical understanding of organizational behaviour and interpersonal skills for productive team work. Topics include motivation, job design, perception and diversity, communication, team dynamics, leadership, industrial relations and legislation, power and organizational culture. Weekly Contact: Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'None',
    coreqs: 'None',
    antireqs: 'None'
  },
  'EMS301': {
    title: 'EMS 301 - Management Information Systems',
    description: 'Algorithm analysis/design, data structures, searching/sorting, recursion and list processing. Coverage of database systems from a systems analyst perspective and enterprise resource planning (ERP) concepts from business and technical viewpoints. This course is not available to Computer Science students. Weekly Contact: Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'EMS 201',
    coreqs: 'None',
    antireqs: 'None'
  },
  'EMS303': {
    title: 'EMS 303 - Managerial Accounting',
    description: 'Review of accounting principles and reporting for internal management use. Topics include budgets, standards and variance analysis, performance measures such as ROI and residual income, and management control techniques. Weekly Contact: Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'CHE 411 or ECN 801',
    coreqs: 'None',
    antireqs: 'None'
  },
  'EMS304': {
    title: 'EMS 304 - Project Management',
    description: 'Fundamentals of project management using a life-cycle approach: project screening and selection, evaluation methods, structures, management and control, scheduling, resource management, life-cycle costing, computer support for project management, and project termination. Weekly Contact: Lecture: 3 hrs. GPA Weight: 1.00; Billing Units: 1.',
    prereqs: 'EMS 204',
    coreqs: 'None',
    antireqs: 'CVL 742, IND 713, MEC 713'
  }
};

// Show a course's details in an alert. Not currently wired to any button;
// kept for the "info" buttons styled by `.info-btn`.
function showCourseInfo(code){
  const info = courseInfoMap[code];
  if(!info){ alert('No additional info for ' + code); return; }
  const msg = info.title + '\n\n' + info.description +
    '\n\nPrerequisites: ' + info.prereqs +
    '\nCo-Requisites: ' + info.coreqs +
    '\nAntirequisites: ' + info.antireqs;
  alert(msg);
}
