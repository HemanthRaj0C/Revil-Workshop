import React from 'react';
import { motion } from 'framer-motion';

const Output = ({ result }) => {
  if (!result) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-4 rounded-lg mt-4"
      >
        <div className="text-cyan-400 mb-2 text-lg font-semibold">Result</div>
        <div className="bg-gray-800 p-2 rounded text-white font-mono">
          No output yet
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-4 rounded-lg mt-4"
    >
      <div className="text-cyan-400 mb-2 font-semibold text-lg">Result</div>
      <div className="bg-gray-800 p-2 rounded font-mono">
        {/* Success Status */}
        <motion.div 
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.3 }}
          className={`mb-2 ${result.success ? 'text-green-400' : 'text-red-400'}`}
        >
          Status: {result.success ? 'Success' : 'Error'}
        </motion.div>
        
        {/* Output */}
        {result.output && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
            className="text-white mb-2"
          >
            <div className="text-cyan-400 text-sm mb-1">Output:</div>
            <pre className="whitespace-pre-wrap">{result.output}</pre>
          </motion.div>
        )}
        
        {/* Error */}
        {result.error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
            className="text-red-400"
          >
            <div className="text-sm mb-1">Error:</div>
            <pre className="whitespace-pre-wrap">{result.error}</pre>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Output;