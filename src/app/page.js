"use client"

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { List } from 'lucide-react';
import Timer from '../components/Timer';
import ProblemList, { problems } from '../components/ProblemList';
import CodeEditor from '../components/CodeEditor';
import ProblemDescription from '../components/ProblemDescription';
import Output from '../components/Output';

export default function Home() {
  
  const [showProblemList, setShowProblemList] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const problemListRef = useRef(null);

  const handleTimeEnd = useCallback(() => {
    setIsActive(false);
    setOutput({
      success: false,
      output: 'Time limit exceeded. Problem marked as unfinished.',
      error: null,
    });
  }, []);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setShowProblemList(false);
    setIsActive(true);
    setCode(problem.starterCode);
    setOutput(null);
  };

  const handleClickOutside = (event) => {
    if (problemListRef.current && !problemListRef.current.contains(event.target)) {
      setShowProblemList(false);
    }
  };

  useEffect(() => {
    if (showProblemList) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProblemList]);

  const handleCodeResult = (result) => {
    setOutput(result);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-12 text-white">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <List
              className="text-cyan-400 cursor-pointer"
              onClick={() => setShowProblemList(!showProblemList)}
            />
            <span className="text-cyan-400 text-2xl font-semibold">Problem List</span>
          </div>
          {selectedProblem && isActive && (
            <div className="absolute left-[45%]">
            <Timer
              initialDuration={6}
              onTimeEnd={handleTimeEnd}
              autoStart={true}
              format="MM:SS"
              warningTime={60}
            />
            </div>
          )}
        </div>
        <div ref={problemListRef}>
        <ProblemList 
          isVisible={showProblemList}
          onSelectProblem={handleProblemSelect}
        />
        </div>

        {/* Main Content */}
        {selectedProblem ? (
          <div className="grid grid-cols-2 gap-4">
            <ProblemDescription problem={selectedProblem} />
            
            <div>
              <CodeEditor 
                code={code} 
                onChange={setCode}
                isDisabled={!isActive} 
                onResult={handleCodeResult}
              />
              <Output result={output} />
            </div>
          </div>
        ) : (
          <div className="text-center text-cyan-400 mt-20">
            Select a problem from the problem list to begin
          </div>
        )}
      </div>
    </div>
  );
}