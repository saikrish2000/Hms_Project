const ManageInventory = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Blood Inventory Management</h1>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <p className="text-muted">Manage your blood bank inventory here.</p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-light">
                <tr>
                  <th>Blood Type</th>
                  <th>Available Units</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coming soon...</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInventory;
