let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btnn');
let searchBtn = document.querySelector('.bx-search');
closeBtn.addEventListener("click", () => {

    sidebar.classList.toggle("openn");
    menuBtnChange();
});
searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("openn");
    menuBtnChange();
});
function menuBtnChange() {
    if (sidebar.classList.contains("openn")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}

function openPopup() {
    document.getElementById("popup1").style.display = "block";
}



let rwrapper = document.querySelector(`.review-wrapper-box`);
let ractivebox = rwrapper.querySelectorAll(`.box`);
let ractivelable = document.querySelector(`.ractcircle`).querySelectorAll(`.fa-circle`);
let rnextbtn = document.querySelector(`#rnextbtn`);
let rprebtnn = document.querySelector(`#rprebtn`);

let rindexno = 0;

rnextbtn.onclick = () => {
    rindexno++;
    rchangeBox();

}

rprebtnn.onclick = () => {
    rindexno--;
    rchangeBox();
}

let rchangeBox = () => {
    if (rindexno > ractivebox.length - 1) {
        rindexno = 0;
    }
    else if (rindexno < 0) {
        rindexno = ractivebox.length - 1;
    }

    for (let i = 0; i < ractivebox.length; i++) {
        if (i === rindexno) {
            ractivebox[i].classList.add(`active`);
            ractivelable[i].classList.add(`fa-solid`);

            if (window.screen.width > 768) {
                rwrapper.style.transform = `translateX(${rindexno * -20}vw)`
            }
        }
        else {
            ractivebox[i].classList.remove(`active`);
            ractivelable[i].classList.remove(`fa-solid`)
        }
    }
}


function submitCar() {
    const form = document.getElementById("addCarForm");
    const formData = {
        brand: form.elements["cname"].value,
        gas_Or_petrol: form.elements["curl"].value,
        Driven_distance: form.elements["cyear"].value,
    };

    const token = localStorage.getItem('token'); // Retrieve the token
    console.log('Token retrieved from localStorage:', token);

    if (!token) {
        alert('No token found. Please log in first.');
        return;
    }

    // Send AJAX request to backend
    fetch('http://127.0.0.1:8000/api/add-Car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.msg); // Show success message or handle response
            form.reset(); // Reset form after successful submission
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}




let menubar = document.querySelector(`#menubar`);
let navbar = document.querySelector(`.navbar`);


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
        // Access the wrapper-box element
        const wrapperBox = document.querySelector('.wrapper-box');

        // Iterate over the JSON data and create HTML elements
        data.data.forEach(item => {
            // Create elements
            const div = document.createElement('div');
            const img = document.createElement('img');
            const contentDiv = document.createElement('div');
            const h3 = document.createElement('h3');
            const priceDiv = document.createElement('div');
            const priceSpan = document.createElement('span');
            const p = document.createElement('p');
            const a = document.createElement('button');
            const button = document.createElement('button');

            // Set classes and attributes
            div.className = 'box active';
            img.src = `http://127.0.0.1:8000/${item.image_1.replace('public/', '')}`;
            img.alt = item.brand;
            h3.textContent = item.brand;
            priceDiv.className = 'price';
            priceSpan.textContent = `$${item.price}`;
            p.innerHTML = `Year: ${item.year} <i class="fa-solid fa-circle"></i> Type: ${item.auto_manual} <i class="fa-solid fa-circle"></i> Drive: ${item.drive_type} <i class="fa-solid fa-circle"></i> HP: ${item.hp}`;
            a.className = 'btn';
            a.textContent = 'Check out';
            button.className = 'btn';
            button.textContent = 'Edit';
            contentDiv.className = 'content';

            button.onclick = function () {
                redirectToLink('#popup1');
            };
            a.onclick = function () {
                localStorage.setItem('selectedCarId', item.id);
                redirectToLink('../Details/index.html');
            };

            // Append elements to contentDiv
            contentDiv.appendChild(h3);
            priceDiv.appendChild(document.createTextNode('Price: '));
            priceDiv.appendChild(priceSpan);
            contentDiv.appendChild(priceDiv);
            contentDiv.appendChild(p);
            contentDiv.appendChild(a);

            // Append elements to div
            div.appendChild(img);
            div.appendChild(contentDiv);

            // Append div to wrapper-box
            wrapperBox.appendChild(div);
            let activebox = wrapperBox.querySelectorAll(`.box`)
            let activelable = document.querySelector(`.activecircle`).querySelectorAll(`.fa-circle`);
            let nextbtn = document.querySelector(`#nextbtn`);
            let prebtn = document.querySelector(`#prebtn`);
            let indexno = 0;
            nextbtn.onclick = () => {
                indexno++;
                changeBox();
            }

            prebtn.onclick = () => {
                indexno--;
                changeBox();
            }
            let changeBox = () => {
                if (indexno > activebox.length - 1) {
                    indexno = 0;
                }
                else if (indexno < 0) {
                    indexno = activebox.length - 1;
                }

                for (let i = 0; i < activebox.length; i++) {
                    if (i === indexno) {
                        activebox[i].classList.add(`active`);
                        activelable[i].classList.add(`fa-solid`);

                        if (window.screen.width > 768) {
                            wrapperBox.style.transform = `translateX(${indexno * -250}px)`
                        }
                    }
                    else {
                        activebox[i].classList.remove(`active`);
                        activelable[i].classList.remove(`fa-solid`)
                    }
                }
            }

        });
    })
    .catch(error => console.error('Error fetching data:', error));
// fetch('./js/file.json')
//     .then(response => response.json())
//     .then(data => {
//         // Access the wrapper-box element
//         const wrapperBox = document.querySelector('.wrapper-box');

//         // Iterate over the JSON data and create HTML elements
//         data.forEach(item => {
//             // Create elements
//             const div = document.createElement('div');
//             const img = document.createElement('img');
//             const contentDiv = document.createElement('div');
//             const h3 = document.createElement('h3');
//             const priceDiv = document.createElement('div');
//             const priceSpan = document.createElement('span');
//             const p = document.createElement('p');
//             const a = document.createElement('button');
//             const button = document.createElement('button');
//             const i = document.createElement('i');

//             // Set classes and attributes
//             i.className = "fa-solid fa-circle";
//             div.className = item.class;
//             img.src = item.img_url;
//             img.alt = '';
//             h3.textContent = item.h3;
//             priceDiv.className = 'price';
//             priceSpan.textContent = item.price;
//             p.innerHTML = `new <i class="fa-solid fa-circle"></i>${item.year} <i class="fa-solid fa-circle"></i>automatic <i class="fa-solid fa-circle"></i>petrol <i class="fa-solid fa-circle"></i>${item.speed}`;
//             a.href = '#';
//             a.className = 'btn';
//             a.textContent = 'check out';
//             button.className = 'btn';
//             button.textContent = 'edit';
//             contentDiv.className = 'content';
//             button.onclick = function () {
//                 redirectToLink('#popup1');
//             };
//             a.onclick = function () {
//                 redirectToLink('../Details/index.html');
//             };

//             // Append elements to contentDiv
//             contentDiv.appendChild(h3);
//             priceDiv.appendChild(document.createTextNode('price: '));
//             priceDiv.appendChild(priceSpan);
//             contentDiv.appendChild(priceDiv);
//             contentDiv.appendChild(p);
//             contentDiv.appendChild(a);


//             // Append elements to div
//             div.appendChild(img);
//             div.appendChild(contentDiv);

//             // Append div to wrapper-box
//             wrapperBox.appendChild(div);
//             let activebox = wrapperBox.querySelectorAll(`.box`)
//             let activelable = document.querySelector(`.activecircle`).querySelectorAll(`.fa-circle`);
//             let nextbtn = document.querySelector(`#nextbtn`);
//             let prebtn = document.querySelector(`#prebtn`);
//             let indexno = 0;
//             nextbtn.onclick = () => {
//                 indexno++;
//                 changeBox();
//             }

//             prebtn.onclick = () => {
//                 indexno--;
//                 changeBox();
//             }
//             let changeBox = () => {
//                 if (indexno > activebox.length - 1) {
//                     indexno = 0;
//                 }
//                 else if (indexno < 0) {
//                     indexno = activebox.length - 1;
//                 }

//                 for (let i = 0; i < activebox.length; i++) {
//                     if (i === indexno) {
//                         activebox[i].classList.add(`active`);
//                         activelable[i].classList.add(`fa-solid`);

//                         if (window.screen.width > 768) {
//                             wrapperBox.style.transform = `translateX(${indexno * -250}px)`
//                         }
//                     }
//                     else {
//                         activebox[i].classList.remove(`active`);
//                         activelable[i].classList.remove(`fa-solid`)
//                     }
//                 }
//             }
//         });
//     })
//     .catch(error => console.error('Error fetching JSON:', error));


fetch('./js/file2.json')
    .then(response => response.json())
    .then(data => {
        // Access the wrapper-box element
        const wrapperBox = document.querySelector('.wrapper-box1');

        // Iterate over the JSON data and create HTML elements
        data.forEach(item => {
            // Create elements
            const div = document.createElement('div');
            const img = document.createElement('img');
            const contentDiv = document.createElement('div');
            const h3 = document.createElement('h3');
            const priceDiv = document.createElement('div');
            const priceSpan = document.createElement('span');
            const p = document.createElement('p');
            const a = document.createElement('button');
            const button = document.createElement('button');
            const i = document.createElement('i');

            // Set classes and attributes
            i.className = "fa-solid fa-circle";
            div.className = item.class;
            img.src = item.img_url;
            img.alt = '';
            h3.textContent = item.h3;
            priceDiv.className = 'price';
            priceSpan.textContent = item.price;
            p.innerHTML = `new <i class="fa-solid fa-circle"></i>${item.year} <i class="fa-solid fa-circle"></i>automatic <i class="fa-solid fa-circle"></i>petrol <i class="fa-solid fa-circle"></i>${item.speed}`;
            a.href = '#';
            a.className = 'btn';
            a.textContent = 'check out';
            button.className = 'btn';
            button.textContent = 'edit';
            contentDiv.className = 'content';
            button.onclick = function () {
                redirectToLink('#popup1');
            };
            a.onclick = function () {
                redirectToLink('../Details/index.html');
            };

            // Append elements to contentDiv
            contentDiv.appendChild(h3);
            priceDiv.appendChild(document.createTextNode('price: '));
            priceDiv.appendChild(priceSpan);
            contentDiv.appendChild(priceDiv);
            contentDiv.appendChild(p);
            contentDiv.appendChild(a);


            // Append elements to div
            div.appendChild(img);
            div.appendChild(contentDiv);

            // Append div to wrapper-box
            wrapperBox.appendChild(div);
            let activebox = wrapperBox.querySelectorAll(`.box`)
            let activelable = document.querySelector(`.activecircle1`).querySelectorAll(`.fa-circle`);
            let nextbtn = document.querySelector(`#nextbtn1`);
            let prebtn = document.querySelector(`#prebtn1`);
            let indexno = 0;
            nextbtn.onclick = () => {
                indexno++;
                changeBox();
            }

            prebtn.onclick = () => {
                indexno--;
                changeBox();
            }
            let changeBox = () => {
                if (indexno > activebox.length - 1) {
                    indexno = 0;
                }
                else if (indexno < 0) {
                    indexno = activebox.length - 1;
                }

                for (let i = 0; i < activebox.length; i++) {
                    if (i === indexno) {
                        activebox[i].classList.add(`active`);
                        activelable[i].classList.add(`fa-solid`);

                        if (window.screen.width > 768) {
                            wrapperBox.style.transform = `translateX(${indexno * -250}px)`
                        }
                    }
                    else {
                        activebox[i].classList.remove(`active`);
                        activelable[i].classList.remove(`fa-solid`)
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));


fetch('./js/file1.json')
    .then(response => response.json())
    .then(data => {
        const wrapperBox1 = document.querySelector(`.featured-wrapper-box`);

        // Iterate over the JSON data and create HTML elements
        data.forEach(item => {
            // Create elements
            const div1 = document.createElement('div');
            const img1 = document.createElement('img');
            const starDiv = document.createElement('div');
            const hh3 = document.createElement('h3');
            const priceDiv = document.createElement('div');
            const a = document.createElement('a');


            div1.className = item.class;
            img1.src = item.img_url;
            img1.alt = '';
            hh3.textContent = item.h3;
            starDiv.className = 'stars';
            starDiv.innerHTML = `<i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>`;
            priceDiv.className = 'price';
            priceDiv.textContent = item.price;
            a.href = '#';
            a.className = 'btn';
            a.textContent = 'check out';


            // Append elements to div
            div1.appendChild(img1);
            div1.appendChild(hh3);
            div1.appendChild(starDiv);
            div1.appendChild(priceDiv);
            div1.appendChild(a);

            wrapperBox1.appendChild(div1);

            let factivebox = wrapperBox1.querySelectorAll(`.box`);
            let factivelable = document.querySelector(`.factcircle`).querySelectorAll(`.fa-circle`);
            let fnextbtn = document.querySelector(`#fnextbtn`);
            let fprebtn = document.querySelector(`#fpretbtn`);

            let findexno = 0;

            fnextbtn.onclick = () => {
                findexno++;
                fchangeBox();

            }

            fprebtn.onclick = () => {
                findexno--;
                fchangeBox();
            }

            let fchangeBox = () => {
                if (findexno > factivebox.length - 1) {
                    findexno = 0;
                }
                else if (findexno < 0) {
                    findexno = factivebox.length - 1;
                }

                for (let i = 0; i < factivebox.length; i++) {
                    if (i === findexno) {
                        factivebox[i].classList.add(`active`);
                        factivelable[i].classList.add(`fa-solid`);

                        if (window.screen.width > 768) {
                            wrapperBox1.style.transform = `translateX(${findexno * -21}vw)`
                        }
                    }
                    else {
                        factivebox[i].classList.remove(`active`);
                        factivelable[i].classList.remove(`fa-solid`)
                    }
                }
            }

        })
    })
    .catch(error => console.error('Error fetching JSON:', error));


menubar.onclick = () => {
    menubar.classList.toggle(`fa-xmark`);
    navbar.classList.toggle(`active`);

}

window.onscroll = () => {
    if (window.scrollY > 0) {
        document.querySelector(`.header`).classList.add(`active`);
    }
    else {
        document.querySelector(`.header`).classList.remove(`active`);
    }

    menubar.classList.remove(`fa-xmark`);
    navbar.classList.remove(`active`);
}

window.onload = () => {
    if (window.scrollY > 0) {
        document.querySelector(`.header`).classList.add(`active`);
    }
    else {
        document.querySelector(`.header`).classList.remove(`active`);
    }
}

document.querySelector(`#login-btn`).onclick = () => {
    document.querySelector(`.login-form-container`).classList.toggle(`active`);
}


document.querySelector(`#close-login-btn`).onclick = () => {
    document.querySelector(`.login-form-container`).classList.remove(`active`);
}

document.querySelector(`#home`).onmousemove = (e) => {
    document.querySelectorAll(`.home-parallax`).forEach(elm => {
        let speed = elm.getAttribute(`data-speed`);

        let x = (window.innerWidth - e.pageX * speed) / 90;
        let y = (window.innerHeight - e.pageY * speed) / 90;

        elm.style.transform = `translateX(${y}px) translateY(${x}px)`
    });
}

document.querySelector(`#home`).onmouseleave = (e) => {
    document.querySelectorAll(`.home-parallax`).forEach(elm => {

        elm.style.transform = `translateX(0px) translateY(0px)`
    });
}

function redirectToLink(link) {
    window.location.href = link;
}


