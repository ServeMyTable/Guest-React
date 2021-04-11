import { Box, Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

function SearchBar(props){

    const {
        id,
        type,
        value,
        className,
        onChange,
        validate,
        placeholder,
        name,
        style
      } = props;

    return(
        <Box>
            <Input
                id={id}
                name={name}
                type={type}
                style={style}
                value={value}
                validate={validate}
                onChange={onChange}
                placeholder={placeholder}
                className={className}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                }
                disableUnderline
                fullWidth
            />
        </Box>
    );

}

export default SearchBar;