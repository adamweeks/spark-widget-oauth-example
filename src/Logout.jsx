import React from 'react';
import PropTypes from 'prop-types';

function Logout({spark}) {
  function handleLogout() {
    spark.logout();
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

Logout.propTypes = {
  spark: PropTypes.object.isRequired
};

export default Logout;
