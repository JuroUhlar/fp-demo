import { useEffect, useState } from 'react';

export default function Letterbox() {
  const [screen, setScreen] = useState<any>({});

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

  useEffect(() => {
    updateScreen();
    window.addEventListener('resize', () => {
      console.log('resize');
      updateScreen();
    });
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(screen, undefined, 2)}</pre>
    </div>
  );
}
