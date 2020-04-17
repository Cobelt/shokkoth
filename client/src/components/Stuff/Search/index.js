import React, { useState, useEffect } from 'react';
import { Row, Icon, Input, Spinner } from 'muejs';

import useDebounce from '../../../hooks/useDebounce';

import StuffsList from '../List';

import './stylesheet.styl';

const StuffsSearch = ({ loading, error, stuffs = [], globalCharacter, delete: DeleteButton, searchBarPosition = {}, spinnerPosition = {}, refetch, editable, variables = { limit: 30 }, defaultSmall = false, defaultSearch = '', ...otherProps }) => {
  const [small, setSmall] = useState(defaultSmall);
  const [oldSearch, setOldSearch] = useState(defaultSearch);
  const [search, setSearch] = useState(defaultSearch);

  const debouncedSearch = useDebounce(search, 250);

  useEffect(() => {
    if (search !== oldSearch) {
      refetch({ ...variables, filter: { ...(variables.filter || {}), search: search || null } });
      setOldSearch(search);
    }
  }, [debouncedSearch])

  if (error) return null;

  return (
    <>
      <Row className="stuff-searchbar" {...searchBarPosition} {...otherProps}>
        <Icon className="text-primary" icon={small ? "view_array" : "view_module"} size="md" onClick={() => setSmall(!small)} />
        <Input type="text" placeholder={'Rechercher (2 caractères minimum)'} value={search} onChange={e => setSearch(e.target.value)} />
      </Row>

      { loading
        ? <Row {...spinnerPosition} className="justify-center"><Spinner /></Row>
        : <StuffsList stuffs={stuffs} globalCharacter={globalCharacter} error={error} small={small} delete={DeleteButton} editable={editable} />
      }
    </>
  );
}

export default StuffsSearch;
