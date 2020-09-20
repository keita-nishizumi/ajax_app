const check = () => {
  const posts = document.querySelectorAll(".post");
  posts.forEach(post => {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        const item = XHR.response.post;
        if (item.checked === true) {
          if (XHR.status != 200) {
            alert(`Error ${XHR.status}: ${XHR.statusText}`);
            return null;
          }
          post.setAttribute("data-check", "true");
        } else {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
window.addEventListener("load", check);