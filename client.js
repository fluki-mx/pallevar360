// Archivo de configuraciones de la plantilla de React-360

import { ReactInstance, Surface } from 'react-360-web';
import SimpleRaycaster from 'simple-raycaster';

function init(bundle, parent, options = {}) {

  // Se comienza por crear la instancia de React con las configuraciones requeridas
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  // Declaración del Panel Izquierdo 
  const leftPanel = new Surface(400, 600, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.35, 0);

  // Declaración del Panel Derecho
  const rightPanel = new Surface(600, 600, Surface.SurfaceShape.Flat );
  rightPanel.setAngle(0.35, 0);

  // Declaración del Panel Inferior
  const bottomPanel = new Surface(1000, 500, Surface.SurfaceShape.Flat);
  bottomPanel.setAngle(0, 0);

  // Creación del nodo Catalog, relacionado con el Panel Izquierdo
  r360.renderToSurface(
    r360.createRoot('Catalog'),
    leftPanel,
  );

  // Creación del nodo CurrentMovie, relacionado con el Panel Derecho
  r360.renderToSurface(
    r360.createRoot('CurrentMovie'),
    rightPanel,
  );

  // Creación del nodo Controls, relacionado con el Panel Inferior
  r360.renderToSurface(
    r360.createRoot('Controls'),
    bottomPanel,
  );

  // Seteo de la Imagen Background de la Plataforma
  r360.compositor.setBackground(r360.getAssetURL('world_360.png'));

  // Seteo del Raycaster, librería que agrega un cursor a la pantalla
  // * Funciona para poder dar clic a los componentes dentro de la Plataforma *
  r360.controls.clearRaycasters()
  r360.controls.addRaycaster(SimpleRaycaster);  

  //r360.controls.start();
}

window.React360 = {init};
