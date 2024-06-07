export const getFilteredTasksByUser = ({
    tasks,
    user,
    selectedCategory,
    selectedDate,
}) => tasks.filter((task) => task.userUid === user?.uid)
    .filter((task) => task.category === selectedCategory && task.date === selectedDate.format('DD.MM.YYYY'));