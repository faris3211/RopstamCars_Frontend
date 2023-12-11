import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export const checkStatus = (resp) => {
  if (resp.data.status === 'FAILURE') {
    return true;
  } else if (resp.data.status === 'SUCCESS') {
    return false;
  }
};

export const showSuccessMessage = (message) => {
  toast.success(
    <label
      style={{
        fontSize: '15px',
        fontWeight: '600',
      }}
    >
      {message}
    </label>,
    {
      position: 'top-center',
      theme: 'dark',
      autoClose: false,
      icon: <CheckCircleIcon sx={{ fontSize: '2.5rem', color: 'green' }} />,
    }
  );
};

export const showErrorMessage = (message) => {
  toast.error(
    <label
      style={{
        fontSize: '15px',
        fontWeight: '600',
      }}
    >
      {message}
    </label>,
    {
      position: 'top-center',
      theme: 'dark',
      autoClose: 4000,
      icon: <ErrorIcon sx={{ fontSize: '2.5rem', color: 'red' }} />,
    }
  );
};
