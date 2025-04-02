import { createRoot } from 'react-dom/client';
import { Chart, registerables } from 'chart.js';
import { EmployeeProvider } from './EmployeeContext.js';
import router from './AppRouter.js';
import { RouterProvider } from 'react-router-dom';

import './generalcomponents/assets/sass/style.react.scss';
import './generalcomponents/assets/fonticon/fonticon.css';
import './generalcomponents/assets/keenicons/duotone/style.css';
import './generalcomponents/assets/keenicons/outline/style.css';
import './generalcomponents/assets/keenicons/solid/style.css';
import './generalcomponents/assets/sass/style.scss';

Chart.register(...registerables);

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <EmployeeProvider>
      <RouterProvider router={router} />
    </EmployeeProvider>
  );
}