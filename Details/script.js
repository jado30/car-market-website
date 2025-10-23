const targeted = document.getElementById("imain");
const blurr = document.querySelector('.blur')
const blurr1 = document.querySelector('.blur1')
const blurr2 = document.querySelector('.blur2')
const blurr3 = document.querySelector('.blur3')

document.getElementById("icar-front").addEventListener("click", function(){
    blurr.style.display = 'none';
    blurr2.style.display = 'block';
    blurr1.style.display = 'block';
    blurr3.style.display = 'block';
    targeted.classList.remove("car-inside")
    targeted.classList.remove("car-back")
    targeted.classList.remove("car-angel")
    targeted.classList.add("car-front")
})
document.getElementById("icar-inside").addEventListener("click", function() {
    blurr1.style.display = 'none';
    blurr2.style.display = 'block';
    blurr3.style.display = 'block';
    blurr.style.display = 'block';
    targeted.classList.remove("car-front");
    targeted.classList.remove("car-back")
    targeted.classList.remove("car-angel")
    targeted.classList.add("car-inside");
})
document.getElementById("icar-back").addEventListener("click", function(){
    blurr2.style.display = 'none';
    blurr3.style.display = 'block';
    blurr1.style.display = 'block';
    blurr.style.display = 'block';
    targeted.classList.remove("car-front");
    targeted.classList.remove("car-inside")
    targeted.classList.remove("car-angel")
    targeted.classList.add("car-back");
})
document.getElementById("icar-angel").addEventListener("click" , function(){
    blurr3.style.display = 'none';
    blurr2.style.display = 'block';
    blurr1.style.display = 'block';
    blurr.style.display = 'block';
    targeted.classList.remove("car-front");
    targeted.classList.remove("car-inside")
    targeted.classList.remove("car-back")
    targeted.classList.add("car-angel")
})
fetch('./file.json')
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
                redirectToLink('../slider_proj/slider.html');
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
    .catch(error => console.error('Error fetching JSON:', error));
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

