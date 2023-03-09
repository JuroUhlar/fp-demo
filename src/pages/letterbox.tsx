import { useEffect, useState } from 'react';
import _ from 'lodash';

export default function Letterbox() {
  const [screen, setScreen] = useState<Record<string, number>>({});

  const updateScreen = () => {
    const result = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      screenAvailWidth: window.screen.availWidth,
      screenAvailHeight: window.screen.availHeight,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      windowOuterHeight: window.outerHeight,
      windowOuterWidth: window.outerWidth,
      windowDevicePixelRatio: window.devicePixelRatio,
    };
    setScreen(result);
  };

  // Add a resize listener to update the screen state on mount
  useEffect(() => {
    updateScreen();
    window.addEventListener(
      'resize',
      _.debounce(() => {
        updateScreen();
      }, 50)
    );
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-orange-50">
      <div className="align-center">
        <h1 className="text-2xl mb-6" contentEditable="true">
          Properties on the `window` object
        </h1>
        <pre>{JSON.stringify(screen, undefined, 2)}</pre>
      </div>
    </div>
  );
}
