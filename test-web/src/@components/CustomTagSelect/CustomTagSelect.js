import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { createStyles, makeStyles } from '@mui/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderRadius: 6,
          minWidth: 200,
          minHeight: 43,
          '& svg': {
            color: '#023E73',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#BDD7EF',
            borderWidth: 1,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#145C9C',
            borderWidth: 1,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#145C9C',
            borderWidth: 1,
          },
          '&.Mui-disabled': {
            background: '#F9FCFF',
            color: '#9DB8D1',
            borderColor: '#BDD7EF',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#BDD7EF',
              borderWidth: 1,
            },
          },
        },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: '#FF4D4D',
        },
        '& .MuiOutlinedInput-root.Mui-error': {
          color: '#FF4D4D',
          '& input': {
            borderRadius: 6,
            fontSize: 12,
            padding: 16,
          },
        },
        '& .MuiFormLabel-root': {
          fontWeight: 400,
          fontSize: 12,
          color: '#023E73',
          marginTop:'-3px',
          '&.Mui-focused': {
            color: '#145C9C',
            fontWeight: 500,
          },
          '&.Mui-error': {
            color: '#FF4D4D',
            fontWeight: 500,
          },
          '&.Mui-disabled': {
            color: '#9DB8D1',
          },
        },
        '& > div .MuiSelect-select': {
          '&:focus': {
            background: 'white',
          },
        },
      },
      optionMenu: {
        padding: 10,
        fontWeight: 400,
        color: '#023E73',
        fontSize: 12,
        marginLeft: 4,
        marginRight: 8,
        '&:hover': {
          borderRadius: 4,
          backgroundColor: '#D0E9FF',
          color: '#023E73',
          fontWeight: 500,
        },
        '& .MuiButtonBase-root-MuiMenuItem-root.Mui-selected': {
          borderRadius: 4,
          backgroundColor: '#145C9C',
          color: '#4FDFC8',
          fontWeight: 600,
        },
      },
  })
);



const CustomTagSelect = (props) => {
    const {value, onChange, options, label, onDelete} = props;
    const classes = useStyles();




  return (
    <div>
              <FormControl sx={{width: '100%' }} className={classes.formControl}>
        <InputLabel className='bg-white p-2' id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value, i) => (
                <Chip key={value} label={value} style={{backgroundColor:'#D0E9FF'}}/>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              className={classes.optionMenu}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default CustomTagSelect;