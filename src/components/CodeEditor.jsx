import React, { useState } from 'react';
import { Play } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { motion } from 'framer-motion';

const CodeEditor = ({ code, onChange, onResult, isDisabled }) => {
  const [language, setLanguage] = useState('javascript');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRunCode = async () => {
    if (isDisabled) return;
    setIsExecuting(true);
    try {
      if (language === 'javascript') {
        const result = executeJavaScript(code);
        onResult(result);
      }
    } catch (error) {
      onResult({
        success: false,
        output: null,
        error: 'Execution failed: ' + error.message
      });
    }
    setIsExecuting(false);
  };

  const executeJavaScript = (code) => {
    let consoleOutput = [];
    const originalConsole = console.log;
    console.log = (...args) => {
      consoleOutput.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' '));
    };

    try {
      const func = new Function(code);
      const returnValue = func();
      console.log = originalConsole;

      return {
        success: true,
        output: [
          ...(consoleOutput.length ? ['Console output:', ...consoleOutput] : []),
          ...(returnValue !== undefined ? [`Return value: ${returnValue}`] : []),
        ].join('\n'),
        error: null,
      };
    } catch (error) {
      console.log = originalConsole;
      return { success: false, output: null, error: error.message };
    }
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-gray-900 p-4 rounded-lg h-[400px] flex flex-col"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-cyan-400 font-medium text-base">{'</>'} Code </div>
          <select
            className="bg-gray-800 text-cyan-400 p-1 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={isDisabled}
          >
            <option value="javascript">JavaScript</option>
          </select>
        </div>
        
        <motion.div 
          className="flex-1 overflow-auto mirror-scrollbar rounded-md my-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CodeMirror
            value={code}
            extensions={[javascript()]}
            theme={oneDark}
            onChange={(value) => onChange(value)}
            basicSetup={{ lineNumbers: true }}
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>

      <div className="flex justify-end">
        <motion.button
          onClick={handleRunCode}
          disabled={isExecuting || isDisabled}
          className={`bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2 
            ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}
            ${isDisabled ? 'bg-gray-600 cursor-not-allowed text-cyan-400' : 'hover:bg-cyan-500'}`}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={16} />
          {isExecuting ? 'Running...' : 'Run Code'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CodeEditor;