import propTypes from 'prop-types';

function HistTable({ data }) {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl font-semibold text-gray-900">Past Routes</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
        <div className="py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Searched over time
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the routes taken previously including their
                  starting point, destination, date of travel, and the mode of
                  travel.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                          >
                            Source
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                          >
                            Destination
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                          >
                            Duration
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                          >
                            Distance
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 pr-6 text-right text-xs font-medium uppercase tracking-wide text-gray-500 sm:pr-6"
                          >
                            Fare
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {item.src}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.dest}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.duration}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.distance}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm text-green-500 font-medium sm:pr-6">
                              {item.fare}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HistTable.propTypes = {
  data: propTypes.array,
};

export default HistTable;
