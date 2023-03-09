import { useEffect, useState } from 'react';
import _ from 'lodash';

export default function Letterbox() {
  const [screen, setScreen] = useState<Record<string, number>>({});

  const updateScreen = () => {
    const result = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      // screenAvailWidth: window.screen.availWidth,
      // screenAvailHeight: window.screen.availHeight,
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
    <div
      style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}
    >
      <pre>{JSON.stringify(screen, undefined, 2)}</pre>
    </div>
  );
}
