import { Box, Button, FormControl, Modal, TextField, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/slice/tasksSlice';
import MySelect from '../../UI/MySelect/MySelect';

const TaskFormModal = ({
  taskModelopen,
  setTaskModelOpen,
  selectedCategory,
  setSelectedCategory,
  selectedDate,
}) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleClose = () => setTaskModelOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (data) => {
    dispatch(
      addTask({
        ...data,
        category: selectedCategory,
        date: selectedDate.format('DD.MM.YYYY'),
        userUid: user.uid,
      }),
    );

    reset();

    handleClose();
  };

  return (
    <div>
      <Modal
        open={taskModelopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <BoxWrapper>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            onSubmit={handleSubmit(submitHandler)}>
            <div>
              <TextField
                sx={{ width: '100%' }}
                id="title"
                label="Title Task"
                variant="standard"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
            </div>
            <div>
              <TextField
                sx={{ width: '100%' }}
                id="description"
                label="Description Task"
                variant="standard"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
            </div>
            <div>
              <FormControl sx={{ width: '100%' }}>
                <MySelect
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </FormControl>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </BoxWrapper>
      </Modal>
    </div>
  );
};

const BoxWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid #000;
  background-color: white;
  box-shadow: 24px;
  padding: 40px;
`;

export default TaskFormModal;
