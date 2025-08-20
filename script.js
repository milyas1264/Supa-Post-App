// ================== Supabase Config ==================
const SUPABASE_URL = "https://uixwmahojaiqgjxopcwo.supabase.co";  // <-- apna project URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeHdtYWhvamFpcWdqeG9wY3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMjEwMzIsImV4cCI6MjA3MDU5NzAzMn0.8gW9ouL8XFU8ej39qn4WmDFu94HgGMqwnP-dhSZLgSQ"; // <-- apna anon key
const Client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================== Add Post ==================
async function addPost() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("⚠️ Please fill all fields!");
    return;
  }

  const { data, error } = await Client
    .from("posts")
    .insert([{ title, content, likes: 0 }]);

  if (error) {
    console.error("Error adding post:", error);
    alert("❌ Failed to add post!");
  } else {
    loadPosts();
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
  }
}

// ================== Load Posts ==================
async function loadPosts() {
  const { data, error } = await Client
    .from("posts")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return;
  }

  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  data.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="actions">
        <button class="like" onclick="likePost(${post.id}, ${post.likes})">👍 Like (${post.likes})</button>
        <button class="share" onclick="sharePost(${post.id})">🔗 Share</button>
        <button class="delete" onclick="deletePost(${post.id})">🗑 Delete</button>
      </div>
    `;
    postList.appendChild(div);
  });
}
loadPosts();

// ================== Like Post ==================
async function likePost(id, currentLikes) {
  const { error } = await Client
    .from("posts")
    .update({ likes: currentLikes + 1 })
    .eq("id", id);

  if (error) console.error("Error liking post:", error);
  else loadPosts();
}

// ================== Share Post ==================
function sharePost(id) {
  const link = `${window.location.origin}/post/${id}`;
  navigator.clipboard.writeText(link);
  alert("🔗 Post link copied: " + link);
}

// ================== Delete Post ==================
async function deletePost(id) {
  if (confirm("🗑 Are you sure you want to delete this post?")) {
    const { error } = await Client
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) console.error("Error deleting post:", error);
    else loadPosts();
  }
}
