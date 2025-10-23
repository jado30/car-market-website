let menubar = document.querySelector(`#menubar`);
let navbar = document.querySelector(`.navbar`);



// Fetch JSON data from file.json
fetch('./js/file.json')
    .then(response => response.json())
    .then(data => {
        // Access the wrapper-box element
        const wrapperBox = document.querySelector('.wrapper-box');

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
            const a = document.createElement('a');
            const i = document.createElement('i');
            const btn = document.createElement('button');
            const btn1 = document.createElement('button');

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
            contentDiv.className = 'content';
            btn.className = 'btn';
            btn.textContent = 'delete';
            btn1.className = 'btn';
            btn1.textContent = 'edit';
            btn.onclick = function () {
                div.remove();
                indexno++;
                changeBox();
            };
            btn1.onclick =function () {
                let editBox = document.querySelector('#popup1');
                
            };
            btn.style = 'background-color:red'

            // Append elements to contentDiv
            contentDiv.appendChild(h3);
            priceDiv.appendChild(document.createTextNode('price: '));
            priceDiv.appendChild(priceSpan);
            contentDiv.appendChild(priceDiv);
            contentDiv.appendChild(p);
            contentDiv.appendChild(a);
            contentDiv.appendChild(btn);
            contentDiv.appendChild(btn1);

            // Append elements to div
            div.appendChild(img);
            div.appendChild(contentDiv);

            wrapperBox.appendChild(div);

        });
        let wrapper = document.querySelector('.wrapper-box');
        const div1 = document.createElement('div');
        const button = document.createElement('button');
        div1.className = 'box';
        button.className = 'btn';
        button.innerHTML = `Add &nbsp; <i class="fa-solid fa-plus"></i>`;
        button.id = 'add-btn';
        button.onclick = function () {
            redirectToLink('#popup1');
        };
        div1.appendChild(button);
        wrapper.appendChild(div1);

        let activebox = wrapper.querySelectorAll(`.box`)
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
        var changeBox = () => {
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
    })
    .catch(error => console.error('Error fetching JSON:', error));


// Function to redirect to a link
function redirectToLink(link) {
    window.location.href = link;
}


// Function to handle form submission
function onFormSubmit(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    const name = document.getElementById('cname').value;
    const imgUrl = document.getElementById('curl').value;
    const year = document.getElementById('cyear').value;
    const price = document.getElementById('cprice').value;
    const speed = document.getElementById('cspeed').value;

    // Create a new item div
    const newItemDiv = document.createElement('div');
    newItemDiv.className = 'box';

    // Create inner elements for the new item
    newItemDiv.innerHTML = `
        <img src="${imgUrl}" alt="">
        <div class="content">
            <h3>${name}</h3>
            <div class="price">price: <span>${price}</span></div>
            <p>new <i class="fa-solid fa-circle"></i>${year} <i class="fa-solid fa-circle"></i>automatic <i class="fa-solid fa-circle"></i>petrol <i class="fa-solid fa-circle"></i>${speed}</p>
            <a href="#" class="btn">check out</a>
        </div>
    `;

    // Get the reference to the add button
    const addButton = document.getElementById('add-btn');

    // Insert the new item div before the add button
    addButton.parentNode.insertBefore(newItemDiv, addButton);
    addButton.remove();
    // Close the form popup
    closeFormPopup();
}

function closeFormPopup() {
    document.getElementById('popup1').style.display = 'none';
}





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






