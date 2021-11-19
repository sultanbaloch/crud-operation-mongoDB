
//  const url = process.env.PORT||3000;
function post() {
    let userName = document.getElementById("userName").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;

    axios.post('https://crud-mongo-database.herokuapp.com/user', {

        userName: userName, email: email, address: address
    })
        .then((response) => {
            
            console.log(response)
            alert("user succesfully added")
            document.getElementById("userName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("address").value = "";
            get();
            
        })
        .catch((error) => {
            console.log(error)
            alert(error)

        })

}



function get() {
    axios.get('https://crud-mongo-database.herokuapp.com/users')
        .then((response) => {

            console.log(response);
          
            document.getElementById("tblper").innerHTML=" "
            response.data.forEach((data) => {
             
                    var saveData = `
                    <tr id="${data._id}">
                    <td id="userName_">${data.userName}</td>
                    <td id="email_">${data.email}</td>
                    <td id="address_">${data.address}</td>
                    <td><button href="javascript:void(0)" class="btn btn-outline-primary" onclick=get_record("${data.userName}","${data.email}","${data.address}","${data._id}"); id="edit" >EDIT</td>
                    <td><button href="javascript:void(0)" class="btn btn-outline-danger" onclick=delete_user("${data._id}"); id="delete" >DELETE</td>
                    </tr>`
                
        
                document.getElementById('tblper').innerHTML += saveData;
              
            })


        })
        .catch((error) => {
            console.log(error);

        })
        .then(() => {
            console.log()
        });
}


function get_record(userName_,email_,address_,_id) {
    
    document.getElementById(_id).innerHTML = `
    <tr id="${_id}"> 
        
         
         
            <td><input type="text" id="${_id}-userName_" value="${userName_}" /></td>
            <td><input type="text" id="${_id}-email_" value="${email_}" /></td>
            <td><input type="text" id="${_id}-address_" value="${address_}" /></td>
            <td>
                <button type="button" onclick="update('${_id}')" class="btn btn-outline-success">Update</button>
            </td>
        </tr>`;

    // document.getElementById('userName').value = userName_;
    // document.getElementById('email').value = email_;
    // document.getElementById('address').value = address_;
    document.getElementById('user_id').value = _id;
}


function update(_id) {
    let userName = document.getElementById(`${_id}-userName_`).value;
    let email = document.getElementById(`${_id}-email_`).value;
    let address = document.getElementById(`${_id}-address_`).value;
    let id = document.getElementById("user_id").value;

    axios.put("https://crud-mongo-database.herokuapp.com/user/" + id, {
        userName: userName,
        email: email,
        address: address,
    })
        .then((response) => {
            alert("user updated");
            console.log(response)
            get();
        })
        .catch((error) => {
            console.log(error);
            console.log(err);

        });
}
function delete_user(_id) {

    axios.delete('https://crud-mongo-database.herokuapp.com/user/' + _id)
        .then((response) => {
            console.log(response);
            alert(response.data)
            get();
        })
        .catch((error) => {
            console.log(error);
        })
        .then(() => {
            console.log();
        })
}
