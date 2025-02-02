import React from 'react';
import { motion } from 'framer-motion';

const ProblemDescription = ({ problem }) => {
  if (!problem) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-4 rounded-lg"
    >
      <motion.div 
        initial={{ scale: 0.9 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.3 }}
        className="text-cyan-400 mb-4 font-semibold text-xl"
      >
        Question Title
      </motion.div>
      <h2 className="text-lg mb-2">{problem.id}. {problem.title}</h2>
      <div className="mb-4">
        <div>{problem.difficulty}</div>
        <div>{problem.company}</div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.4 }}
        className="text-sm"
      >
        {problem.description}
        
        <div className="mt-4">
          {problem.examples.map((example, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mb-4"
            >
              <div>Example {index + 1}:</div>
              <div>Input: {example.input}</div>
              <div>Output: {example.output}</div>
              {example.explanation && (
                <div>Explanation: {example.explanation}</div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          <div>Constraints:</div>
          {problem.constraints.map((constraint, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              • {constraint}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProblemDescription;
