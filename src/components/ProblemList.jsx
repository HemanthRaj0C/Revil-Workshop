import React from 'react';
import { motion } from 'framer-motion';

const problems = [
  {
    id: 2703,
    starterCode: '// Write your solution here\n',
    title: "Return Length Of Arguments Passed",
    difficulty: "Easy",
    company: "Companies",
    description: "Write a function ArgumentsLength that returns the count of arguments passed to it. Write a function ArgumentsLength that returns the count of arguments passed to it. Write a function ArgumentsLength that returns the count of arguments passed to it. Write a function ArgumentsLength that returns the count of arguments passed to it.",
    examples: [
      {
        input: "Args = [5]",
        output: "1",
        explanation: "One value was passed to the function so it should return 1."
      },
      {
        input: 'Args = [[], null, "3"]',
        output: "3",
        explanation: "Three values were passed to the function so it should return 3."
      }
    ],
    constraints: [
      "Args is a valid JSON Array",
      "0 <= Args.Length <= 100"
    ]
  }
  // Add more problems here
];

const ProblemList = ({ onSelectProblem, isVisible }) => {
  if (!isVisible) return null;

return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute left-12 top-24 bg-gray-900 p-4 rounded-2xl w-1/4 shadow-inner border-white border shadow-gray-500 z-10"
    >
      {problems.map((problem, index) => (
        <motion.div
          key={problem.id}
          onClick={() => onSelectProblem(problem)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-2 hover:bg-gray-800 cursor-pointer text-cyan-400"
        >
          {problem.id}. {problem.title}
        </motion.div>
      ))}
    </motion.div>
);
};

export default ProblemList;
export { problems };