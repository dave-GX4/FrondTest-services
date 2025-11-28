import { createBrowserRouter } from 'react-router-dom';
import CreateQuestionView from '../../feature/questions/pages/CreateQuestionView';
import QuestionListView from '../../feature/questions/pages/QuestionListView';
import RegistrationWizardView from '../../feature/user/pages/RegistrationWizardView';

export const navigationWrapper = createBrowserRouter([
  {
    path: '/',
    element: <QuestionListView/>,
  },
  {
    path: '/questions/create',
    element: <CreateQuestionView />,
  },
  {
    path: '/register',
    element: <RegistrationWizardView />,
  }
]);