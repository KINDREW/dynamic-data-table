import React from 'react';
import PropTypes from 'prop-types';

const TableRowActions = ({ actions, row }) => (
  <div>
    {actions.map((action) => (
      <button
        key={action.label}
        onClick={() => action.callback(row)}
      >
        {action.label}
      </button>
    ))}
  </div>
);

TableRowActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired,
    })
  ).isRequired,
  row: PropTypes.object.isRequired,
};

export default TableRowActions;
