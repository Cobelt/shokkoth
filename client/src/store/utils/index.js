// Give it some utility please
export const action = ({ loading, payload, type }) => ({ type, payload: { ...payload, loading } });
