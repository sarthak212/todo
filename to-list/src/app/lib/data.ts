async function getTokenDetails() {
  const res = await fetch(`http://localhost:3000/token_details`, {
    credentials: "include",
  });
  return res.json();
}

async function createAccount(email: string, password: string) {
  const res = await fetch(`http://localhost:3000/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function login(email: string, password: string) {
  const res = await fetch(`http://localhost:3000/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function createTask(title: string, description: string, status: string) {
  const res = await fetch(`http://localhost:3000/todolist/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title, description, status }),
  });
  return res.json();
}

async function getTasks(search?: string, status?: string) {
  let queryString = "";
  if (search || status) {
    const searchQuery = search ? `search=${search}` : "";
    const statusQuery = status ? `status=${status}` : "";
    queryString = `?${searchQuery}${search && status ? "&" : ""}${statusQuery}`;
  }
  const res = await fetch(`http://localhost:3000/todolist/get${queryString}`, {
    credentials: "include",
  });
  return res.json();
}

async function updateStatus(id: string, status: string) {
  const res = await fetch(`http://localhost:3000/todolist/update/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id, status }),
  });
  return res.json();
}

async function deleteTask(id: string) {
  const res = await fetch(`http://localhost:3000/todolist/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });
  return res.json();
}

async function logout() {
  const res = await fetch(`http://localhost:3000/auth/logout`, {
    method: "GET",
  });
  return res.json();
}

export {
  getTokenDetails,
  createAccount,
  login,
  createTask,
  getTasks,
  updateStatus,
  deleteTask,
  logout,
};
