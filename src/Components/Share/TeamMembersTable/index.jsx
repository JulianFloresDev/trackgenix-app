import styles from './table.module.css';
import { useDispatch } from 'react-redux';
import { editItem } from '../../../redux/global/actions';

const TeamMembersTable = ({ element, label, itemToPUT, employeeList }) => {
  const dispatch = useDispatch();
  const newTeamMember = { employee: '', role: '', rate: '' };
  return (
    <div className={styles.teamMembers}>
      <label htmlFor={element}>{label}</label>
      <table id={element}>
        <thead>
          <tr>
            {element &&
              Object.keys(element[0]).map((key, index) => {
                return <th key={index}>{key}</th>;
              })}
            <th>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/addMember.svg`}
                onClick={(e) => {
                  e.preventDefault();
                  itemToPUT.teamMembers.push(newTeamMember);
                  dispatch(editItem({ ...itemToPUT }));
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {itemToPUT[element].map((item, index) => {
            return (
              <tr key={index + 10}>
                {Object.keys(item).map((info) => {
                  if (info === 'role') {
                    return (
                      <td key={index + 10}>
                        <select
                          value={item.employee ? item[info] : '-'}
                          onChange={(e) => {
                            item[info] = e.target.value;
                            dispatch(editItem({ ...itemToPUT }));
                          }}
                        >
                          <option hidden>-</option>
                          <option>DEV</option>
                          <option>QA</option>
                          <option>PM</option>
                          <option>TL</option>
                        </select>
                      </td>
                    );
                  }
                  if (info === 'rate') {
                    return (
                      <td key={index + 20}>
                        <input
                          type="number"
                          value={item.employee ? item[info] : 0}
                          onChange={(e) => {
                            item[info] = e.target.value;
                            dispatch(editItem({ ...itemToPUT }));
                          }}
                        />
                      </td>
                    );
                  }
                  if (info === 'employee') {
                    return (
                      <td key={index + 30}>
                        <select
                          value={item[info] ? item[info]._id : 0}
                          onChange={(e) => {
                            item[info] = e.target.value;
                            dispatch(editItem({ ...itemToPUT }));
                          }}
                        >
                          {employeeList?.map((employee) => {
                            return (
                              <option key={employee._id} value={employee?._id}>
                                {employee.firstName} {employee.lastName}
                              </option>
                            );
                          })}
                          <option value={0} hidden>
                            Select an Employee
                          </option>
                        </select>
                      </td>
                    );
                  }
                })}
                <td>
                  {itemToPUT[element].length > 1 && (
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                      onClick={(e) => {
                        e.preventDefault();
                        itemToPUT[element].splice(index, 1);
                        dispatch(editItem({ ...itemToPUT }));
                      }}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMembersTable;
