'use client';

import { useQueryState } from 'next-usequerystate';

export default function SetsCalculator() {
  const [setA, setSetA] = useQueryState<string[]>('setA', {
    defaultValue: [],
    parse: (value: string | null) => {
      if (!value) return [];
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch {
        return [];
      }
    },
    serialize: (value: string[]) => {
      return encodeURIComponent(JSON.stringify(value));
    },
  });
  const [setB, setSetB] = useQueryState<string[]>('setB', {
    defaultValue: [],
    parse: (value: string | null) => {
      if (!value) return [];
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch {
        return [];
      }
    },
    serialize: (value: string[]) => {
      return encodeURIComponent(JSON.stringify(value));
    },
  });
  const [setAName, setSetAName] = useQueryState('setAName', {
    defaultValue: 'A',
    parse: (value: string | null) => value || 'A',
    serialize: (value: string) => value || 'A',
  });
  const [setBName, setSetBName] = useQueryState('setBName', {
    defaultValue: 'B',
    parse: (value: string | null) => value || 'B',
    serialize: (value: string) => value || 'B',
  });

  const setAValues = new Set(setA);
  const setBValues = new Set(setB);

  const union = new Set([...setAValues, ...setBValues]);
  const intersection = new Set(
    [...setAValues].filter((x) => setBValues.has(x)),
  );
  const differenceAB = new Set(
    [...setAValues].filter((x) => !setBValues.has(x)),
  );
  const differenceBA = new Set(
    [...setBValues].filter((x) => !setAValues.has(x)),
  );

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sets Calculator</h1>

      <div className="flex flex-row gap-4 mb-4">
        <div className="flex">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium">Set Name:</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={setAName}
              onChange={(e) => setSetAName(e.target.value)}
            />
          </div>
          <textarea
            className="w-full h-48 p-2 border rounded"
            value={setA.join('\n')}
            onChange={handleSetAChange}
            placeholder="Enter values (one per line)"
          />
        </div>

        <div className="flex">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium">Set Name:</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={setBName}
              onChange={(e) => setSetBName(e.target.value)}
            />
          </div>
          <textarea
            className="w-full h-48 p-2 border rounded"
            value={setB.join('\n')}
            onChange={handleSetBChange}
            placeholder="Enter values (one per line)"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">
            Union ({setAName} ∪ {setBName})
          </h2>
          <div className="bg-gray-50 p-2 rounded min-h-[100px]">
            {Array.from(union).join('\n')}
          </div>
        </div>

        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">
            Intersection ({setAName} ∩ {setBName})
          </h2>
          <div className="bg-gray-50 p-2 rounded min-h-[100px]">
            {Array.from(intersection).join('\n')}
          </div>
        </div>

        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">
            Difference ({setAName} - {setBName})
          </h2>
          <div className="bg-gray-50 p-2 rounded min-h-[100px]">
            {Array.from(differenceAB).join('\n')}
          </div>
        </div>

        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">
            Difference ({setBName} - {setAName})
          </h2>
          <div className="bg-gray-50 p-2 rounded min-h-[100px]">
            {Array.from(differenceBA).join('\n')}
          </div>
        </div>
      </div>
    </div>
  );
}
