
export const nextId = (id) => {
//   const maxID = id.reduce((maxID, todo) => Math.max(todo.id, maxID), -1);
    const maxID = Math.random() * 5087;
  return Math.floor(maxID + id);
};


 function* idGenerator() {
  let id = 1;
  while (true) {
    yield id;
    id++;
  }
}

// Create an instance of the ID generator
export  const generator = idGenerator();
