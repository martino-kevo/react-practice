import { Executor } from "executor-fn";

export const aInput = Executor((input) => input, {
  storeHistory: true,
  // callNow: true,
  // initialArgs: [{}],
  noDuplicate: true,
  // equalityFn: (a, b) => a === b,
  metadataFn: () => `user ${Math.floor(Math.random() * 3 + 1)}`,
  groupBy: (aInput) => `text--${aInput.temperation < 50 ? "Low" : "High"}`,
  onError: (err) => console.log(`Error! ${err}`),
});

// State
export const posts = Executor((posts) => posts, {
  callNow: true,
  initialArgs: [[]],
  onError: (err) => console.log(`Error! ${err}`),
});

// State
export const postTitle = Executor((postTitle) => postTitle, {
  callNow: true,
  initialArgs: [""],
  onError: (err) => console.log(`Error! ${err}`),
});

// Computed value
export const postCount = Executor(() => posts.value.length, {
  onError: (err) => console.log(`Error! ${err}`),
});

// Computed value
export const getPostById = Executor(
  (id) => posts.value.find((post) => (post.id).toString() === id),
  {
    onError: (err) => console.log(`Error! ${err}`),
  },
);

// Method
export const savePost = Executor(
  async (newPosts) => {
    try {
      const response = await api.post("/posts", newPosts);
      posts([...posts.value, response.data]);
      postTitle("");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  },
  {
    onError: (err) => console.log(`Error! ${err}`),
  },
);

// Method
export const deletePost = Executor(
  async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      posts(posts.value.filter(post => post.id !== id));
      postTitle("");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  },
  {
    onError: (err) => console.log(`Error! ${err}`),
  },
);
