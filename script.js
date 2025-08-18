let posts = [];

// Function to add new post
function addPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (title === "" || content === "") {
    alert("Please fill all fields!");
    return;
  }

  const post = {
    id: Date.now(),
    title: title,
    content: content,
    likes: 0
  };

  posts.unshift(post); // add new post on top
  renderPosts();

  // clear inputs
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

// Function to render posts
function renderPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="actions">
        <button class="like-btn" onclick="likePost(${post.id})">👍 Like (${post.likes})</button>
        <button class="share-btn" onclick="sharePost(${post.id})">🔗 Share</button>
        <button class="delete-btn" onclick="deletePost(${post.id})">🗑 Delete</button>
      </div>
    `;

    postList.appendChild(postElement);
  });
}

// Like function
function likePost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.likes++;
    renderPosts();
  }
}

// Share function
function sharePost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    const shareText = `Check out my post: ${post.title} - ${post.content}`;
    navigator.clipboard.writeText(shareText);
    alert("Post copied to clipboard!");
  }
}

// Delete function
function deletePost(id) {
  posts = posts.filter(p => p.id !== id);
  renderPosts();
}
