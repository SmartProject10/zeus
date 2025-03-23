import { createRoot } from 'react-dom/client';
import { Chart, registerables } from 'chart.js';
import { EmployeeProvider } from './EmployeeContext.js';
import router from './AppRouter.js';
import { RouterProvider } from 'react-router-dom';

import './_zeus/assets/sass/style.react.scss';
import './_zeus/assets/fonticon/fonticon.css';
import './_zeus/assets/keenicons/duotone/style.css';
import './_zeus/assets/keenicons/outline/style.css';
import './_zeus/assets/keenicons/solid/style.css';
import './_zeus/assets/sass/style.scss';

Chart.register(...registerables);

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <EmployeeProvider>
      <RouterProvider router={router} />
    </EmployeeProvider>
  );
}