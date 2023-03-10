import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from 'redux/admins/thunks';
import { Table, Spinner, NotFound } from 'Components/Share';

function Admins() {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { list, isFetching, error } = useSelector((store) => store.admins);

  useEffect(async () => {
    dispatch(getAdmins(''));
  }, []);
  return (
    <section>
      {isFetching ? (
        <Spinner entitie="Admins" />
      ) : (
        <>
          {error ? (
            <NotFound />
          ) : role === 'super-admin' ? (
            <Table
              headers={['firstName', 'lastName', 'dni', 'email', 'location', 'phone']}
              data={list}
              editable={{ edit: true, remove: true, add: true }}
            />
          ) : (
            <Table
              headers={['firstName', 'lastName', 'dni', 'email', 'location', 'phone']}
              data={list}
            />
          )}
        </>
      )}
    </section>
  );
}

export default Admins;
