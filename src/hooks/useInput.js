import { useState, useCallback } from 'react';

const useInput = (initialState = '') => {
    const [value, setValue] = useState(initialState);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    return [value, setValue, onChange];
};

export default useInput;
