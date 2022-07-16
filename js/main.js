let btn = document.querySelector('.btn');
let inpName = document.querySelector('.task-input-1');
let inpEmail = document.querySelector('.task-input-2');
let inpPhone = document.querySelector('.task-input-3');
let inpURL = document.querySelector('.task-input-4');
let list = document.querySelector('.task-list');

btn.addEventListener('click',() => {
    // ! проверка на заполненость input
    if(!inpName.value.trim() || !inpEmail.value.trim() || !inpPhone.value.trim() || !inpURL.value.trim()){
        return alert(`Заполните поле!`)
    }
    if(isNaN(inpPhone.value)){
        return alert(`Водите коректо Phone Number!(только числа)`)
    }


    let obj = {
        taskName: inpName.value,
        taskEmail: inpEmail.value,
        taskPhone: inpPhone.value,
        taskURL: inpURL.value,
    }
    setItemToStorage(obj);
    readElement(); //выззов функции для отображения данных
    inpName.value = '';
    inpEmail.value = '';
    inpPhone.value = '';
    inpURL.value = '';// очищаем input
})

function setItemToStorage(obj){
let data = JSON.parse(localStorage.getItem('table-data'));
data.push(obj);
localStorage.setItem('table-data', JSON.stringify(data));
}

function readElement(){
    if(!localStorage.getItem('table-data')){
        localStorage.setItem('table-data','[]')
    }

    let newData = JSON.parse(localStorage.getItem('table-data'))
    list.innerHTML = '<tr><th id="number">№</th><th>Name</th><th>Email Address</th><th>Phone number</th><th>Photo</th><th>Delete</th><th>Edit</th></tr>'
    newData.forEach((elem,index) => {
        let tr = document.createElement('tr');
        // let td = document.createElement('td');
        tr.innerHTML = `<td>${index + 1}</td><td>${elem.taskName}</td><td>${elem.taskEmail}</td><td>${elem.taskPhone}</td><td><img src='${elem.taskURL}' width="100" alt=""></td>`
        list.append(tr)
        let btnDelete = document.createElement('button');
        btnDelete.innerText = 'Удалить';
        let td1 = document.createElement('td');
        td1.append(btnDelete);
        tr.appendChild(td1);
        btnDelete.addEventListener('click',() => {
            deleteElement(index)
        })
         let btnEdit = document.createElement('button');
         btnEdit.innerText = 'Редактировать';
         let td = document.createElement('td');
         td.append(btnEdit)
        tr.appendChild(td);
         btnEdit.addEventListener('click',() =>{
             editElement(index);
         })
    })
}

function deleteElement(index){
    let data = JSON.parse(localStorage.getItem('table-data'));
    data.splice(index,1);
    localStorage.setItem('table-data',JSON.stringify(data));
    readElement()
}

let mainModal = document.querySelector('.main-modal');
let inpNameEdit = document.querySelector('.inp-name');
let inpEmailEdit = document.querySelector('.inp-email');
let inpPhoneEdit = document.querySelector('.inp-phone');
let inpURLEdit = document.querySelector('.inp-url');
let btnCloser = document.querySelector('.btn-closer');
let btnSave = document.querySelector('.btn-save')

function editElement(index) {
    mainModal.style.display = 'block';
    let data = JSON.parse(localStorage.getItem("table-data"))
    inpNameEdit.value = data[index].taskName;
    inpEmailEdit.value = data[index].taskEmail;
    inpPhoneEdit.value = data[index].taskPhone;
    inpURLEdit.value = data[index].taskURL;

    inpNameEdit.setAttribute('id',index);
    inpEmailEdit.setAttribute('id',index);
    inpPhoneEdit.setAttribute('id',index);
    inpURLEdit.setAttribute('id',index);

}

btnSave.addEventListener('click',() => {
    if(!inpNameEdit.value.trim() || !inpEmailEdit.value.trim() || !inpPhoneEdit.value.trim() || !inpURLEdit.value.trim()){
        return alert(`Заполните поле!`)
    }
    if(isNaN(inpPhoneEdit.value)){
        return alert(`Водите коректо Phone Number!(только числа)`)
    }
    let data = JSON.parse(localStorage.getItem('table-data'));

    let index =  inpNameEdit.id;
    let newObj = {
        taskName: inpNameEdit.value,
        taskEmail: inpEmailEdit.value,
        taskPhone: inpPhoneEdit.value,
        taskURL: inpURLEdit.value,
    }
    data.splice(index,1,newObj)
    localStorage.setItem('table-data',JSON.stringify(data));
    mainModal.style.display = 'none';
    readElement();
})

btnCloser.addEventListener('click',() => {
    mainModal.style.display = 'none';
    //закрывем модальное окно
})

readElement();