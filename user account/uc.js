async function submitCar() {
    const brand = "Ford super Focus";
    const gasOrPetrol = 0;
    const drivenDistance = "30000";

    const token = localStorage.getItem("token");
    console.log('Token retrieved from localStorage:', token);
    const url = 'http://127.0.0.1:8000/api/update-Car/0';

    const payload = {
        brand: brand,
        gas_Or_petrol: gasOrPetrol,
        Driven_distance: drivenDistance
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Car updated successfully:', data);
        } else {
            console.error('Failed to update car:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}


let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btnn');
let searchBtn = document.querySelector('.bx-search');
closeBtn.addEventListener("click", () => {

    sidebar.classList.toggle("openn");
    menuBtnChange(); //calling the function(optional)
});
searchBtn.addEventListener("click", () => {
    // Sidebar open when you click on the search iocn
    sidebar.classList.toggle("openn");
    menuBtnChange(); //calling the function(optional)
});
// following are the code to change sidebar button(optional)
function menuBtnChange() {
    if (sidebar.classList.contains("openn")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    }
}

function openPopup() {
    document.getElementById("popup1").style.display = "block";
}
function redirectToLink(link) {
    window.location.href = link;
}

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token')
    console.log(token)
    fetch('http://127.0.0.1:8000/api/show-profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                document.getElementById('user-name').textContent = data.data.name;
                document.getElementById('user-email').textContent = data.data.email;
                document.getElementById('price-preference').textContent = data.data.price_preference;
                document.getElementById('hp-preference').textContent = data.data.hp_preference;
                document.getElementById('drive-type-preference').textContent = data.data.drive_type_preference;
            } else {
                console.error('Error fetching user data:', data.msg);
            }
        })
        .catch(error => console.error('Fetch error:', error));
    fetch('http://127.0.0.1:8000/api/get-pref', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(item => {
            if (item.status) {
                document.getElementById('price-preference').textContent = item.data.price_preference;
                document.getElementById('hp-preference').textContent = item.data.hp_preference;
                document.getElementById('drive-type-preference').textContent = item.data.drive_type_preference;
            } else {
                console.error('Error fetching user data:', data.msg);
            }
        })
        .catch(error => console.error('Fetch error:', error));
});

fetch('http://127.0.0.1:8000/api/list-User-Car', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})
    .then(response => response.json())
    .then(data => {
        const wrapperBox = document.querySelector('.wrapper-box');

        data.data.forEach(item => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const contentDiv = document.createElement('div');
            const h3 = document.createElement('h3');
            const priceDiv = document.createElement('div');
            const priceSpan = document.createElement('span');
            const p = document.createElement('p');
            const a = document.createElement('button');
            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');

            div.className = 'box active';
            img.src = `http://127.0.0.1:8000/${item.image_1.replace('public/', '')}`;
            img.alt = item.brand;
            h3.textContent = item.brand;
            priceDiv.className = 'price';
            priceSpan.textContent = `$${item.price}`;
            p.innerHTML = `Year: ${item.year} <i class="fa-solid fa-circle"></i> Type: ${item.auto_manual} <i class="fa-solid fa-circle"></i> Drive: ${item.drive_type} <i class="fa-solid fa-circle"></i> HP: ${item.hp}`;
            a.className = 'btn';
            a.textContent = 'Check out';
            editButton.className = 'btn';
            editButton.textContent = 'Edit';
            deleteButton.className = 'btn';
            deleteButton.textContent = 'Delete';
            deleteButton.style = 'background-color:red';

            contentDiv.className = 'content';

            editButton.onclick = function () {
                const form = document.createElement("form");
                form.id = "addCarForm";
                form.setAttribute("autocomplete", "off");
                form.setAttribute("onsubmit", "return false;");

                const brandLabel = document.createElement("label");
                brandLabel.setAttribute("for", "brand");
                brandLabel.className = "l";
                brandLabel.id = "label1";
                brandLabel.textContent = "Brand";

                const brandInput = document.createElement("input");
                brandInput.type = "text";
                brandInput.name = "brand";
                brandInput.className = "confirm_pass";
                brandInput.placeholder = "Brand";
                brandInput.id = "cbrand";
                brandInput.value = item.brand;
                brandInput.required = true;

                form.appendChild(brandLabel);
                form.appendChild(brandInput);

                const gasOrPetrolLabel = document.createElement("label");
                gasOrPetrolLabel.setAttribute("for", "gasOrPetrol");
                gasOrPetrolLabel.className = "l";
                gasOrPetrolLabel.id = "label1";
                gasOrPetrolLabel.textContent = "Gas or Petrol";

                const gasOrPetrolInput = document.createElement("input");
                gasOrPetrolInput.type = "text";
                gasOrPetrolInput.name = "gasOrPetrol";
                gasOrPetrolInput.className = "confirm_pass";
                gasOrPetrolInput.placeholder = "Gas or Petrol";
                gasOrPetrolInput.id = "cgop";
                gasOrPetrolInput.value = item.gas_Or_petrol;
                gasOrPetrolInput.required = true;

                form.appendChild(gasOrPetrolLabel);
                form.appendChild(gasOrPetrolInput);

                const distanceLabel = document.createElement("label");
                distanceLabel.setAttribute("for", "distance");
                distanceLabel.className = "l";
                distanceLabel.id = "label5";
                distanceLabel.textContent = "Driven Distance";

                const distanceInput = document.createElement("input");
                distanceInput.type = "text";
                distanceInput.name = "distance";
                distanceInput.className = "confirm_pass1";
                distanceInput.placeholder = "Driven Distance";
                distanceInput.id = "cdistance";
                distanceInput.value = item.Driven_distance;
                distanceInput.required = true;

                form.appendChild(distanceLabel);
                form.appendChild(distanceInput);

                const resetButton = document.createElement("input");
                resetButton.type = "reset";
                resetButton.value = "Reset";
                resetButton.className = "reset";

                const submitButton = document.createElement("input");
                submitButton.type = "submit";
                submitButton.value = "Submit";
                submitButton.className = "submit";

                form.appendChild(resetButton);
                form.appendChild(submitButton);

                const fpopup = document.createElement("div");
                fpopup.className = "popup2";

                fpopup.appendChild(form);

                const spopup = document.createElement("div");
                spopup.className = "overlay2";

                spopup.appendChild(fpopup);

                const closeAnchor = document.createElement("a");
                closeAnchor.className = "close";
                closeAnchor.onclick = function () {
                    spopup.style.visibility = 'hidden';
                    spopup.style.opacity = 0;
                };
                closeAnchor.innerHTML = "&times;";

                form.appendChild(closeAnchor);
                const overlayDiv = document.querySelector(".overlay3");
                overlayDiv.appendChild(spopup);

                submitButton.onclick = function () {
                    submitCar(item);
                };
            };

            deleteButton.onclick = function () {
                const deleteUrl = `http://127.0.0.1:8000/api/delete-Car/${item.id}`;
                fetch(deleteUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status) {
                            div.remove();
                        } else {
                            alert(data.msg);
                        }
                    })
                    .catch(error => console.error('Error:', error));
            };

            a.onclick = function () {
                redirectToLink('../Details/index.html');
            };

            contentDiv.appendChild(h3);
            priceDiv.appendChild(document.createTextNode('Price: '));
            priceDiv.appendChild(priceSpan);
            contentDiv.appendChild(priceDiv);
            contentDiv.appendChild(p);
            contentDiv.appendChild(a);
            contentDiv.appendChild(editButton);
            contentDiv.appendChild(deleteButton);

            div.appendChild(img);
            div.appendChild(contentDiv);
            wrapperBox.appendChild(div);

            // Function to handle car update submission
            function submitCar(item) {
                const brand = document.getElementById("cbrand").value;
                const gasOrPetrol = document.getElementById("cgop").value;
                const drivenDistance = document.getElementById("cdistance").value;

                const updateUrl = `http://127.0.0.1:8000/api/update-Car/${item.id}`;
                const data = {
                    brand: brand,
                    gas_Or_petrol: gasOrPetrol,
                    Driven_distance: drivenDistance
                };

                fetch(updateUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status) {
                            alert("Car updated successfully!");
                            document.querySelector(".overlay3").style.visibility = 'hidden';
                            document.querySelector(".overlay3").style.opacity = 0;
                        } else {
                            alert("Failed to update car: " + data.msg);
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }
        });

        let activebox = wrapperBox.querySelectorAll(`.box`);
        let activelable = document.querySelector(`.activecircle`).querySelectorAll(`.fa-circle`);
        let nextbtn = document.querySelector(`#nextbtn`);
        let prebtn = document.querySelector(`#prebtn`);
        let indexno = 0;
        nextbtn.onclick = () => {
            indexno++;
            changeBox();
        };

        prebtn.onclick = () => {
            indexno--;
            changeBox();
        };

        let changeBox = () => {
            if (indexno > activebox.length - 1) {
                indexno = 0;
            } else if (indexno < 0) {
                indexno = activebox.length - 1;
            }

            for (let i = 0; i < activebox.length; i++) {
                if (i === indexno) {
                    activebox[i].classList.add(`active`);
                    activelable[i].classList.add(`fa-solid`);

                    if (window.screen.width > 768) {
                        wrapperBox.style.transform = `translateX(${indexno * -250}px)`;
                    }
                } else {
                    activebox[i].classList.remove(`active`);
                    activelable[i].classList.remove(`fa-solid`);
                }
            }
        };
    })
    .catch(error => console.error('Error:', error));

document.getElementById('search-inp-btn').addEventListener('click', function () {
    var query = document.getElementById('search-inp').value;

    if (query.trim() !== "") {
        // Call the API with the search query
        fetch(`http://127.0.0.1:8000/api/search_Car/${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {

                const wrapperBox = document.querySelector('.wrapper-box');
                wrapperBox.innerHTML = '';

                data.data.forEach(item => {
                    const div = document.createElement('div');
                    const img = document.createElement('img');
                    const contentDiv = document.createElement('div');
                    const h3 = document.createElement('h3');
                    const priceDiv = document.createElement('div');
                    const priceSpan = document.createElement('span');
                    const p = document.createElement('p');
                    const a = document.createElement('button');
                    const editButton = document.createElement('button');
                    const deleteButton = document.createElement('button');

                    div.className = 'box active';
                    img.src = `http://127.0.0.1:8000/${item.image_1.replace('public/', '')}`;
                    img.alt = item.brand;
                    h3.textContent = item.brand;
                    priceDiv.className = 'price';
                    priceSpan.textContent = `$${item.price}`;
                    p.innerHTML = `Year: ${item.year} <i class="fa-solid fa-circle"></i> Type: ${item.auto_manual} <i class="fa-solid fa-circle"></i> Drive: ${item.drive_type} <i class="fa-solid fa-circle"></i> HP: ${item.hp}`;
                    a.className = 'btn';
                    a.textContent = 'Check out';
                    editButton.className = 'btn';
                    editButton.textContent = 'Edit';
                    deleteButton.className = 'btn';
                    deleteButton.textContent = 'Delete';
                    deleteButton.style = 'background-color:red';

                    contentDiv.className = 'content';

                    editButton.onclick = function () {
                        const form = document.createElement("form");
                        form.id = "addCarForm";
                        form.setAttribute("autocomplete", "off");
                        form.setAttribute("onsubmit", "return false;");

                        const brandLabel = document.createElement("label");
                        brandLabel.setAttribute("for", "brand");
                        brandLabel.className = "l";
                        brandLabel.id = "label1";
                        brandLabel.textContent = "Brand";

                        const brandInput = document.createElement("input");
                        brandInput.type = "text";
                        brandInput.name = "brand";
                        brandInput.className = "confirm_pass";
                        brandInput.placeholder = "Brand";
                        brandInput.id = "cbrand";
                        brandInput.value = item.brand;
                        brandInput.required = true;

                        form.appendChild(brandLabel);
                        form.appendChild(brandInput);

                        const gasOrPetrolLabel = document.createElement("label");
                        gasOrPetrolLabel.setAttribute("for", "gasOrPetrol");
                        gasOrPetrolLabel.className = "l";
                        gasOrPetrolLabel.id = "label1";
                        gasOrPetrolLabel.textContent = "Gas or Petrol";

                        const gasOrPetrolInput = document.createElement("input");
                        gasOrPetrolInput.type = "text";
                        gasOrPetrolInput.name = "gasOrPetrol";
                        gasOrPetrolInput.className = "confirm_pass";
                        gasOrPetrolInput.placeholder = "Gas or Petrol";
                        gasOrPetrolInput.id = "cgop";
                        gasOrPetrolInput.value = item.gas_Or_petrol;
                        gasOrPetrolInput.required = true;

                        form.appendChild(gasOrPetrolLabel);
                        form.appendChild(gasOrPetrolInput);

                        const distanceLabel = document.createElement("label");
                        distanceLabel.setAttribute("for", "distance");
                        distanceLabel.className = "l";
                        distanceLabel.id = "label5";
                        distanceLabel.textContent = "Driven Distance";

                        const distanceInput = document.createElement("input");
                        distanceInput.type = "text";
                        distanceInput.name = "distance";
                        distanceInput.className = "confirm_pass1";
                        distanceInput.placeholder = "Driven Distance";
                        distanceInput.id = "cdistance";
                        distanceInput.value = item.Driven_distance;
                        distanceInput.required = true;

                        form.appendChild(distanceLabel);
                        form.appendChild(distanceInput);

                        const resetButton = document.createElement("input");
                        resetButton.type = "reset";
                        resetButton.value = "Reset";
                        resetButton.className = "reset";

                        const submitButton = document.createElement("input");
                        submitButton.type = "submit";
                        submitButton.value = "Submit";
                        submitButton.className = "submit";

                        form.appendChild(resetButton);
                        form.appendChild(submitButton);

                        const fpopup = document.createElement("div");
                        fpopup.className = "popup2";

                        fpopup.appendChild(form);

                        const spopup = document.createElement("div");
                        spopup.className = "overlay2";

                        spopup.appendChild(fpopup);

                        const closeAnchor = document.createElement("a");
                        closeAnchor.className = "close";
                        closeAnchor.onclick = function () {
                            spopup.style.visibility = 'hidden';
                            spopup.style.opacity = 0;
                        };
                        closeAnchor.innerHTML = "&times;";

                        form.appendChild(closeAnchor);
                        const overlayDiv = document.querySelector(".overlay3");
                        overlayDiv.appendChild(spopup);

                        submitButton.onclick = function () {
                            submitCar(item);
                        };
                    };

                    deleteButton.onclick = function () {
                        const deleteUrl = `http://127.0.0.1:8000/api/delete-Car/${item.id}`;
                        fetch(deleteUrl, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status) {
                                    div.remove();
                                } else {
                                    alert(data.msg);
                                }
                            })
                            .catch(error => console.error('Error:', error));
                    };

                    a.onclick = function () {
                        redirectToLink('../Details/index.html');
                    };

                    contentDiv.appendChild(h3);
                    priceDiv.appendChild(document.createTextNode('Price: '));
                    priceDiv.appendChild(priceSpan);
                    contentDiv.appendChild(priceDiv);
                    contentDiv.appendChild(p);
                    contentDiv.appendChild(a);
                    contentDiv.appendChild(editButton);
                    contentDiv.appendChild(deleteButton);

                    div.appendChild(img);
                    div.appendChild(contentDiv);
                    wrapperBox.appendChild(div);

                    // Function to handle car update submission
                    function submitCar(item) {
                        const brand = document.getElementById("cbrand").value;
                        const gasOrPetrol = document.getElementById("cgop").value;
                        const drivenDistance = document.getElementById("cdistance").value;

                        const updateUrl = `http://127.0.0.1:8000/api/update-Car/${item.id}`;
                        const data = {
                            brand: brand,
                            gas_Or_petrol: gasOrPetrol,
                            Driven_distance: drivenDistance
                        };

                        fetch(updateUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            body: JSON.stringify(data)
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status) {
                                    alert("Car updated successfully!");
                                    document.querySelector(".overlay3").style.visibility = 'hidden';
                                    document.querySelector(".overlay3").style.opacity = 0;
                                } else {
                                    alert("Failed to update car: " + data.msg);
                                }
                            })
                            .catch(error => console.error('Error:', error));
                    }
                });

                let activebox = wrapperBox.querySelectorAll(`.box`);
                let activelable = document.querySelector(`.activecircle`).querySelectorAll(`.fa-circle`);
                let nextbtn = document.querySelector(`#nextbtn`);
                let prebtn = document.querySelector(`#prebtn`);
                let indexno = 0;
                nextbtn.onclick = () => {
                    indexno++;
                    changeBox();
                };

                prebtn.onclick = () => {
                    indexno--;
                    changeBox();
                };

                let changeBox = () => {
                    if (indexno > activebox.length - 1) {
                        indexno = 0;
                    } else if (indexno < 0) {
                        indexno = activebox.length - 1;
                    }

                    for (let i = 0; i < activebox.length; i++) {
                        if (i === indexno) {
                            activebox[i].classList.add(`active`);
                            activelable[i].classList.add(`fa-solid`);

                            if (window.screen.width > 768) {
                                wrapperBox.style.transform = `translateX(${indexno * -250}px)`;
                            }
                        } else {
                            activebox[i].classList.remove(`active`);
                            activelable[i].classList.remove(`fa-solid`);
                        }
                    }
                };
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a search term.');
    }
});
function submitttForm() {
    const form = document.getElementById('addCarForm');
    const formData = new FormData(form);

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = key === 'year' || key === 'engine_hp' || key === 'popularity' ? parseFloat(value) : value;
    });

    const apiUrl = 'http://127.0.0.1:8000/api/predict_price';
    const token = localStorage.getItem('token');

    // Send the request to the prediction API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.prediction[0]);
            console.log('Success:', data);
            document.getElementById('prediction-value').textContent = data.prediction[0];
            redirectToLink('#popup-second');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function submitCarr() {
    // Get form elements
    const form = document.getElementById('addCarForm');
    const cname = document.getElementById('cname1').value; // auto or gear
    const cyear = document.getElementById('cyear1').value; // Producing year
    const cprice = document.getElementById('cprice1').value; // Price
    const image1 = document.getElementById('input-file1').files[0]; // faced pic
    const image2 = document.getElementById('input-file2').files[0]; // side pic 1
    const image3 = document.getElementById('input-file3').files[0]; // side pic 2
    
    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append('brand', 'bmw'); // Assuming you want to hardcode the brand
    formData.append('year', cyear);
    formData.append('price', cprice);
    formData.append('drive_type', 'four_wheel_drive'); // Assuming you want to hardcode the drive_type
    formData.append('hp', '350'); // Assuming you want to hardcode hp
    formData.append('auto_manual', cname);
    formData.append('image_1', image1);
    formData.append('image_2', image2);
    formData.append('image_3', image3);

    // Send POST request to the API
    fetch('http://127.0.0.1:8000/api/add-Car', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle response from the server
        alert('Car added successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding car.');
    });

    // Prevent form submission
    return false;
}
















