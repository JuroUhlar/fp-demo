import { useEffect, useState } from 'react';
// import lodash
import _ from 'lodash';

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
    window.addEventListener(
      'resize',
      _.debounce(() => {
        console.log('resize');
        updateScreen();
      }, 50)
    );
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(screen, undefined, 2)}</pre>
    </div>
  );
}
