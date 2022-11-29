import {
  editItem,
  setModalContent,
  setShowModal,
  fetchDataOn,
  fetchDataOff
} from 'redux/global/actions';
import {
  getProjectsError,
  getProjectsPending,
  getProjectsSuccess,
  deleteProjectPending,
  deleteProjectSuccess,
  deleteProjectError
} from './actions';
import modalStyles from 'Components/Share/Modal/modal.module.css';

export const getProjects = (id) => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    dispatch(fetchDataOn());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        }
      });
      const response = await request.json();
      if (response.error) {
        throw new Error(response);
      } else {
        id
          ? (dispatch(editItem(response.data)), dispatch(fetchDataOff()))
          : (dispatch(getProjectsSuccess(response.data)), dispatch(fetchDataOff()));
      }
    } catch (error) {
      dispatch(getProjectsError(error));
      dispatch(fetchDataOff());
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(deleteProjectPending());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        }
      });
      if (request.status >= 400) {
        throw new Error(request.statusText);
      } else {
        dispatch(deleteProjectSuccess(id));
        dispatch(
          setModalContent(<h3 className={modalStyles.title}>Project Deleted Successfully!</h3>)
        );
      }
    } catch (error) {
      dispatch(deleteProjectError());
      dispatch(setModalContent(<h3 className={modalStyles.title}>{error.toString()}</h3>));
    }
  };
};

export const editProject = (id, body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        },
        body: JSON.stringify(body)
      });
      const response = await request.json();
      if (response.error) {
        dispatch(
          Array.isArray(response.message)
            ? setModalContent(
                <>
                  <h3 className={modalStyles.title}>Mmmm some inputs are invalid!! Check them:</h3>
                  <ul>
                    {response.message.map((info, index) => {
                      return <li key={index}>{info.message}</li>;
                    })}
                  </ul>
                </>
              )
            : setModalContent(
                <h3 className={modalStyles.title}>
                  {response.message || 'An unexpected error has occurred'}
                </h3>
              )
        );
        dispatch(setShowModal(true));
      } else {
        dispatch(
          setModalContent(<h3 className={modalStyles.title}>Project edited successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const createProject = (body) => {
  return async (dispatch) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        },
        body: JSON.stringify(body)
      });
      const response = await request.json();
      if (response.error) {
        dispatch(
          Array.isArray(response.message)
            ? setModalContent(
                <>
                  <h3 className={modalStyles.title}>Mmmm some inputs are invalid!! Check them:</h3>
                  <ul>
                    {response.message.map((info, index) => {
                      return <li key={index}>{info.message}</li>;
                    })}
                  </ul>
                </>
              )
            : setModalContent(
                <h3 className={modalStyles.title}>
                  {response.message || 'An unexpected error has occurred'}
                </h3>
              )
        );
        dispatch(setShowModal(true));
      } else {
        dispatch(
          setModalContent(<h3 className={modalStyles.title}>Project created successfully!</h3>)
        );
        dispatch(setShowModal(true));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
