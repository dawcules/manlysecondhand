'use strict';
const productForm = document.querySelector('#productAdd');
// insert a form
const productAdd = (evt) => {
    // - prevents the form from sending
    evt.preventDefault();
// - makes FormData -object and adds the file selected byt the user into the object
    const proForm = new FormData(productForm);
// - send the file to the same url as in task a by using fetch -method
    const options = {
        method: 'use',
        body: proForm,
    };

    fetch('product',options)
        .then(response =>{
            return response.json();
        })
        .then(json => {
            console.log(json);
            message.innerHTML = json.message;
        });
};



const imageForm = document.querySelector('#imageAdd');
const image = document.getElementById('imgA');
// make function 'upload' which
const imageAdd = (evt) => {
    // - prevents the form from sending
    evt.preventDefault();
// - makes FormData -object and adds the file selected byt the user into the object
    const imgForm = new FormData(imageForm);
// - send the file to the same url as in task a by using fetch -method
    const options = {
        method: 'post',
        body: imgForm,
    };

    fetch('image',options)
        .then(response =>{
            return response.json();
        })
        .then(json => {
            console.log(json);
            message.innerHTML = json.message;
            image.src = './uploads' + json.file.filename;
        });
};
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted
imageForm.addEventListener('submit', imageAdd);
productForm.addEventListener('submit', productAdd);