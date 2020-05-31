// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface } from 'react-360-web';
import SimpleRaycaster from 'simple-raycaster';

function init(bundle, parent, options = {}) {

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  const leftPanel = new Surface(400, 600, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.35, 0);

  const rightPanel = new Surface(600, 600, Surface.SurfaceShape.Flat );
  rightPanel.setAngle(0.35, 0);


  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('Catalog'),
    leftPanel,
  );

  r360.renderToSurface(
    r360.createRoot('CurrentMovie'),
    rightPanel,
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('world_360.jpg'));
  r360.controls.clearRaycasters()
  r360.controls.addRaycaster(SimpleRaycaster);
}

window.React360 = {init};
