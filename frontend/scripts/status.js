let log = document.querySelector(".log");
 

let profile = document.querySelector(".profile");
fetch("http://localhost:3000/user-status", {
  method: "get",
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (data.status) {
      profile.style.display = "block";
      let avatarUrl = data.avatarUrl;
      let imgElement = document.querySelector(".profile img");
      imgElement.src = avatarUrl;
      log.style.display = "none";
    } else {
      profile.style.display = "none";
      log.style.display = "block";
    }
  })
  .catch((err) => {
    console.log(err);
  });
