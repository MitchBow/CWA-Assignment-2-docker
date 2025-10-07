'use client';
import React, { useState, useEffect } from 'react';
import { Task } from './tasks';
import { stages as baseStages, StageData } from './Stages';
import StageEditor from './StageEditor';
import ManualTimer from './ManualTimer';

interface StageManagerProps {
  inCourtroom?: boolean;
}

const StageManager: React.FC<StageManagerProps> = ({ inCourtroom }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState(1);
  const [allStages, setAllStages] = useState<Record<number, StageData>>(baseStages);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [brokenCode, setBrokenCode] = useState<string>('');
  const [hints, setHints] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stageData = allStages[stage];
    if (!stageData) return;
    setActiveTasks(stageData.tasks.map((t, i) => ({ id: `${stage}-${i}`, stage, message: t, completed: false })));
    setBrokenCode(stageData.code);
    setHints([]);
  }, [stage, allStages]);

  const runCheck = () => {
    const stageData = allStages[stage];
    if (!stageData) return;
    setActiveTasks(prev =>
      prev.map(task => {
        const checkFn = stageData.checks[task.message];
        return checkFn && checkFn(brokenCode) ? { ...task, completed: true } : { ...task, completed: false };
      })
    );
  };

  const showHint = (taskMessage: string) => {
    const stageData = allStages[stage];
    const hint = stageData.hints[taskMessage];
    if (hint && !hints.includes(hint)) setHints(prev => [...prev, hint]);
  };

  const addNewStage = () => {
    const newStageNum = Math.max(...Object.keys(allStages).map(Number)) + 1;
    setAllStages(prev => ({
      ...prev,
      [newStageNum]: {
        code: `<html><body><!-- New custom stage --></body></html>`,
        tasks: ['Example Task 1', 'Example Task 2'],
        hints: { 'Example Task 1': 'Sample hint 1', 'Example Task 2': 'Sample hint 2' },
        checks: { 'Example Task 1': code => code.includes('<!--'), 'Example Task 2': code => code.includes('</html>') },
      },
    }));
    setStage(newStageNum);
  };

  const removeStage = () => {
    if (!(stage in allStages)) return;
    const updatedStages = { ...allStages };
    delete updatedStages[stage];
    setAllStages(updatedStages);

    const remainingStages = Object.keys(updatedStages).map(Number).sort((a, b) => a - b);
    setStage(remainingStages[0] || 1);
  };

  const loginRegister = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Login/Register failed');
      setMessage('✅ Login/Register successful!');
    } catch (err) {
      setMessage('❌ Login/Register failed');
    }
  };

  const saveStages = async () => {
    try {
      const res = await fetch('/api/stages/saveStage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, stages: allStages }),
      });
      if (!res.ok) throw new Error('Save failed');
      setMessage('✅ Stages saved!');
    } catch (err) {
      setMessage('❌ Save failed');
    }
  };

  const loadStages = async () => {
    try {
      const res = await fetch(`/api/stages/loadStage?username=${encodeURIComponent(username)}`);
      if (!res.ok) throw new Error('Load failed');
      const data = await res.json();
      setAllStages(data.stages);
      setMessage('✅ Stages loaded!');
    } catch (err) {
      setMessage('❌ Load failed');
    }
  };

  if (inCourtroom) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8f8', paddingTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Login/Register Card */}
      <div style={{ width: '90%', maxWidth: '600px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '10px' }}>Login / Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={loginRegister} style={{ flex: 1, padding: '8px', borderRadius: '6px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>Login / Register</button>
          <button onClick={saveStages} style={{ flex: 1, padding: '8px', borderRadius: '6px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>Save Stages</button>
          <button onClick={loadStages} style={{ flex: 1, padding: '8px', borderRadius: '6px', backgroundColor: '#f39c12', color: 'white', border: 'none', cursor: 'pointer' }}>Load Stages</button>
        </div>
        {message && (
          <div style={{ color: message.startsWith('✅') ? 'green' : 'red', fontWeight: 'bold' }}>{message}</div>
        )}
      </div>

      {/* Timer */}
      <ManualTimer />

      {/* Stage Controls */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setStage(stage - 1)} disabled={stage <= Math.min(...Object.keys(allStages).map(Number))}>Previous Stage</button>
        <button onClick={() => setStage(stage + 1)} disabled={stage >= Math.max(...Object.keys(allStages).map(Number))}>Next Stage</button>
        <button onClick={addNewStage} style={{ backgroundColor: 'green', color: 'white' }}>➕ Add New Stage</button>
        <button onClick={removeStage} style={{ backgroundColor: 'red', color: 'white' }}>🗑 Remove Stage</button>
        <button onClick={() => setEditing(!editing)} style={{ backgroundColor: '#555', color: 'white' }}>{editing ? 'Close Editor' : '✏️ Edit Stage'}</button>
      </div>

      {/* Task List & Code Editor */}
      <div style={{ display: 'flex', gap: '20px', width: '90%' }}>
        {/* Left Side: Tasks */}
        <div style={{ flex: 1, padding: '20px', borderRadius: '12px', backgroundColor: 'white', color: '#333' }}>
          <h2>Stage {stage}</h2>
          <ul>
            {activeTasks.map(task => (
              <li key={task.id}>
                {task.message} {task.completed ? '✔' : '✘'}
                {!task.completed && <button onClick={() => showHint(task.message)}>Hint</button>}
              </li>
            ))}
          </ul>
          {hints.length > 0 && (
            <div>
              <strong>Hints:</strong>
              <ul>{hints.map((hint, i) => <li key={i}>{hint}</li>)}</ul>
            </div>
          )}
        </div>

        {/* Right Side: Code Editor */}
        <div style={{ flex: 2, padding: '20px', borderRadius: '12px', backgroundColor: '#1e1e1e', color: '#dcdcdc' }}>
          <h2>Fix the Code</h2>
          <textarea
            value={brokenCode}
            onChange={e => setBrokenCode(e.target.value)}
            style={{ width: '100%', height: '200px', fontFamily: 'monospace', fontSize: '14px', borderRadius: '8px', padding: '10px', color: 'white', backgroundColor: '#1e1e1e' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={runCheck}>Run Check</button>
          </div>
        </div>
      </div>

      {/* Stage Editor */}
      {editing && <StageEditor stage={stage} allStages={allStages} setAllStages={setAllStages} />}
    </div>
  );
};

export default StageManager;
