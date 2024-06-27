let BASE_URL = "http://localhost:5000";
const cardLocations = document.querySelector(".grid-locations");
const contentCards = document.querySelector(".tab-content-cards");

const getApiData = async (endPoint, cb) => {
  try {
    let response = await fetch(`${BASE_URL}/${endPoint}`);
    let data = await response.json();
    cb(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const deleteApiData = async (endPoint, id, cb) => {
  let response = await fetch(`${BASE_URL}/${endPoint}/${id}`, {
    method: "DELETE",
  });
  cb(response);
};

getApiData("data", (data) => {
  data.map((item) => {
    cardLocations.innerHTML += `
      <div class="grid-card">
        <div class="card-img">
          <img src="${item.image}" alt="">
        </div>
        <div class="grid-card-text">
          <h6>${item.city}</h6>
          <p>${item.properties}</p>
          <a href="#"><span>Explore Now<i class="fa-solid fa-arrow-right"></i></span></a>
          <button class="delete-btn" data-id="${item.id}">Delete</button>
          </div>
        
      </div>
    `;
  });
});

const postApiData = async (endPoint, data) => {
  try {
    let response = await fetch(`${BASE_URL}/${endPoint}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

const createBTN = document.querySelector("#create_user");
const userImage = document.querySelector("#image");
const userCity = document.querySelector("#city");
const userProperties = document.querySelector("#properties");

createBTN &&
  createBTN.addEventListener("click", async (e) => {
    e.preventDefault();
    const usData = {
      image: userImage.value,
      city: userCity.value,
      properties: userProperties.value,
    };
    const postData = await postApiData("data", usData);
    console.log("Post response:", postData);
  });

const deleteCard = (id) => {
  deleteApiData("data", id, (response) => {
    if (response.ok) {
      const cardRemove = document.getElementById(`card-${id}`);
      if (cardRemove) {
        cardRemove.remove();
      } else {
        console.error(`Card element with id 'card-${id}' not found.`);
      }
    }
  });
};

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("delete-btn")) {
    const cardId = e.target.dataset.id;
    deleteCard(cardId);
  }
});

getApiData("admindata", (data) => {
  data.map((item) => {
    contentCards.innerHTML += `
     <div class="tab-content-card">
                    <div class="img-text-content">
                        <div class="tab-img">
                            <img
                                src="${item.image}"
                                alt>
                        </div>
                        <div class="top-text">
                            <div>
                                <span>Featured</span>
                                <span>For Sale</span>
                            </div>

                            <ul>
                                <li><i class="fa-solid fa-right-left"></i></li>
                                <li><i class="fa-regular fa-heart"></i></li>
                                <li><i class="fa-regular fa-eye"></i></li>
                            </ul>
                        </div>
                        <div class="bottom-text">
                            <span>${item.version}</span>
                         <button class="delete-btn" data-id="${item.id}">Delete</button>

                        </div>
                    </div>
                    <div class="tab-text-content">
                        <div>
                            <a href>${item.properties}</a>
                        </div>
                        <div>
                            <i class="fa-solid fa-location-dot"></i>
                            <p>${item.location}</p>
                        </div>
                        <ul>
                            <li>
                                <i class="fa-solid fa-bed"></i>
                                <span>${item.bedroom}</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-bath"></i>
                                <span>${item.bathroom}</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-ruler"></i>
                                <span>${item.size} SqFT</span>
                            </li>
                        </ul>
                    </div>
                    <div class="bottom-text">
                        <div class="left-text">
                            <div class="bottom-text-img">
                                <img
                                    src="${item.authorimage}"
                                    alt>
                            </div>
                            <span>${item.authorname}</span>
                        </div>
                        <div class="right-text">
                            <h6>$${item.payment}</h6>
                            <span>/${item.cash}</span>
                        </div>
                    </div>
                </div>
    
    `;
  });
});
const createHOUSE = document.querySelector("#create_home");
const adminImage = document.querySelector("#image");
const adminversion = document.querySelector("#version");
const adminproperties = document.querySelector("#properties");
const adminlocation = document.querySelector("#location");
const adminbedroom = document.querySelector("#bedroom");
const adminbathroom = document.querySelector("#bathroom");
const adminsize = document.querySelector("#size");
const adminpayment = document.querySelector("#payment");
const admincash = document.querySelector("#cash");
const adminauthorimage = document.querySelector("#authorimage");
const adminauthorname = document.querySelector("#authorname");

createHOUSE &&
  createHOUSE.addEventListener("click", async (e) => {
    e.preventDefault();
    const adminData = {
      image: adminImage.value,
      version: adminversion.value,
      properties: adminproperties.value,
      location: adminlocation.value,
      bedroom: adminbedroom.value,
      bathroom: adminbathroom.value,
      size: adminsize.value,
      payment: adminpayment.value,
      cash: admincash.value,
      authorimage: adminauthorimage.value,
      authorname: adminauthorname.value,
    };
    const PostData = await postApiData("admindata", adminData);
    console.log("Post response:", PostData);
  });

const deleteHomeCard = (id) => {
  deleteApiData("admindata", id, (response) => {
    if (response.ok) {
      const cardHomeRemove = document.getElementById(`tab-content-card-${id}`);
      if (cardHomeRemove) {
        cardHomeRemove.remove();
      } else {
        console.error(
          `Card element with id 'tab-content-card-${id}' not found.`
        );
      }
    } else {
      console.error(`Failed to delete data with id '${id}'.`);
    }
  });
};

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("delete-btn")) {
    const cardHomeID = e.target.dataset.id;
    deleteHomeCard(cardHomeID);
  }
});

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("delete-home-btn")) {
    const cardHomeID = e.target.dataset.id;
    deleteHomeCard(cardHomeID);
  }
});
