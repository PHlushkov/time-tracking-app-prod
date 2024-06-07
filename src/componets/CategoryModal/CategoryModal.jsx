import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MyInput from '../../UI/MyInput/MyInput';
import { addCategory } from '../../redux/slice/categorySlice';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material';

function CategoryModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const [nameCategory, setNameCategory] = React.useState('');

  const addNewCategory = (categoryName) => {
    dispatch(addCategory(categoryName));
    setNameCategory('');
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <BoxWrapper>
          <MyInput nameCategory={nameCategory} setNameCategory={setNameCategory} />
          <Button
            onClick={() => addNewCategory(nameCategory)}
            sx={{ marginTop: '10px' }}
            variant="contained">
            Add
          </Button>
        </BoxWrapper>
      </Modal>
    </div>
  );
}

const BoxWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid #000;
  background-color: white;
  box-shadow: 24px;
  padding: 20px;
`;

export default CategoryModal;
