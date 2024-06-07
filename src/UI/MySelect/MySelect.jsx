import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory } from '../../redux/slice/categorySlice';

function MySelect({ selectedCategory, setSelectedCategory }) {
  const dispatch = useDispatch();
  const listCategories = useSelector((state) => state.categories.list);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRemoveCategory = (category) => {
    dispatch(removeCategory(category));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
      <InputLabel id="demo-select-small-label">Category</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedCategory}
        onChange={handleChange}>
        <MenuItem value="">
          <em>Category</em>
        </MenuItem>
        {listCategories.map((value, index) => (
          <MenuItem key={index} value={value}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              {value}
              <IconButton onClick={() => handleRemoveCategory(value)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MySelect;
