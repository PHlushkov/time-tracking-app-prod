import { useState } from 'react';
import Navigation from './componets/Navigation/Navigation';
import Tasks from './componets/Tasks/Tasks';
import TimeTrackingTable from './componets/TimeTrackingTable/TimeTrackingTable';
import RegisterModal from './componets/RegisterModal/RegisterModal';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openRefisterModal, setOpenRefisterModal] = useState(false);

  const handleOpenRegisterModal = () => setOpenRefisterModal(true);
  const handleCloseRegisterModal = () => setOpenRefisterModal(false);

  return (
    <div className="App">
      <Navigation
        handleOpenRegisterModal={handleOpenRegisterModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <TimeTrackingTable />
      <Tasks selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <RegisterModal
        openRefisterModal={openRefisterModal}
        handleCloseRegisterModal={handleCloseRegisterModal}
      />
    </div>
  );
}

export default App;
