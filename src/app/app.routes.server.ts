import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // The product list shows live data from the backend API, so it must be
  // rendered on demand (Server mode). Prerendering it at build time runs the
  // component on the build machine, where its GET /api/v1/products call has
  // no reachable backend — that crashed the build's prerender worker.
  { path: 'product-list', renderMode: RenderMode.Server },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
