/**
 * Moulds the raw data feed into the schema.
 *
 * @param {Object} data The raw data item from the feed.
 * @returns {Object} The schema-compliant data.
 */
function model(data) {
  return {
    id: data.service,
    operator: data.operator,
    status: data.status,
    origin: data.origin_name,
    destination: data.destination_name,
    expected: data.aimed_departure_time,
    actual: data.expected_departure_time,
  };
};

module.exports = {
  model,
};
