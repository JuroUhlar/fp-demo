'use client';

import { useSessionStorage } from 'react-use';

export default function SetsCalculator() {
  const [setA, setSetA] = useSessionStorage<string[]>('SetA', []);
  const [setB, setSetB] = useSessionStorage<string[]>('SetB', []);
  const [setAName, setSetAName] = useSessionStorage<string>('SetAName', '');
  const [setBName, setSetBName] = useSessionStorage<string>('SetBName', '');

  const handleSetAChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const values = e.target.value
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '');
    setSetA(values);
  };

  const handleSetBChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const values = e.target.value
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '');
    setSetB(values);
  };

  // Set operations
  const setAValues = new Set(setA);
  const setBValues = new Set(setB);

  const union = Array.from(new Set([...setA, ...setB]));
  const intersection = setA.filter((item) => setBValues.has(item));
  const differenceAB = setA.filter((item) => !setBValues.has(item));
  const differenceBA = setB.filter((item) => !setAValues.has(item));

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1
        style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}
      >
        Sets Calculator
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label>Set Name: </label>
            <input
              type="text"
              value={setAName}
              onChange={(e) => setSetAName(e.target.value)}
            />
          </div>
          <textarea
            style={{ width: '100%', height: '200px' }}
            // value={setA.join('\n')}
            defaultValue={setA.join('\n')}
            onChange={handleSetAChange}
            placeholder="Enter values (one per line)"
          />
        </div>

        <div>
          <div style={{ marginBottom: '10px' }}>
            <label>Set Name: </label>
            <input
              type="text"
              value={setBName}
              onChange={(e) => setSetBName(e.target.value)}
            />
          </div>
          <textarea
            style={{ width: '100%', height: '200px' }}
            defaultValue={setB.join('\n')}
            onChange={handleSetBChange}
            placeholder="Enter values (one per line)"
          />
        </div>
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
          }}
        >
          <h2>{setAName}</h2>
          <div
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              minHeight: '100px',
              whiteSpace: 'pre-line',
            }}
          >
            {setA.map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: intersection.includes(item)
                    ? 'lightgreen'
                    : '',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
          }}
        >
          <h2>{setBName}</h2>
          <div
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              minHeight: '100px',
              whiteSpace: 'pre-line',
            }}
          >
            {setB.map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: intersection.includes(item)
                    ? 'lightgreen'
                    : '',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
          }}
        >
          <h2>
            Union ({setAName} ∪ {setBName})
          </h2>
          <div
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              minHeight: '100px',
              whiteSpace: 'pre-line',
            }}
          >
            {union.join('\n')}
          </div>
        </div>

        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
          }}
        >
          <h2>
            Intersection ({setAName} ∩ {setBName})
          </h2>
          <div
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              minHeight: '100px',
              whiteSpace: 'pre-line',
            }}
          >
            {intersection.join('\n')}
          </div>
        </div>

        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
          }}
        >
          <h2>
            Difference ({setAName} - {setBName})
          </h2>
          <div
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              minHeight: '100px',
              whiteSpace: 'pre-line',
            }}
          >
            {differenceAB.join('\n')}
          </div>
        </div>

        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
          }}
        >
          <h2>
            Difference ({setBName} - {setAName})
          </h2>
          <div
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              minHeight: '100px',
              whiteSpace: 'pre-line',
            }}
          >
            {differenceBA.join('\n')}
          </div>
        </div>
      </div>
    </div>
  );
}
