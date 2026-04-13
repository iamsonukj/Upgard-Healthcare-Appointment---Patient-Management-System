let editId = null;
function addPatient()
{
    let name =document.getElementById("name").value;
    let age =document.getElementById("age").value;
    let phone =document.getElementById("phone").value;
    let email =document.getElementById("email").value;

    if (name == "")
    {
        alert("Enter Name");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone))
    {
        alert("Phone Number must be 10 digits");
        return;
    }

    if (!email.includes("@"))
    {
        alert("Enter valid email");
        return;
    }


    if (editId == null)
    {
        patients.push(
        {
            id: Date.now(),
            name: name,
            age: age,
            phone: phone,
            email: email
        });
    }
    else
    {
        let p =
            patients.find( x => x.id == editId);
        p.name = name;
        p.age = age;
        p.phone = phone;
        p.email = email;
        editId = null;
    }

    localStorage.setItem("patients", JSON.stringify(patients));
    displayPatients();

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}



function displayPatients()
{
    let table = document.getElementById("patientTable");
    table.innerHTML = "";

    patients.forEach(p =>
    {
        table.innerHTML +=
        `
        <tr>

            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.phone}</td>
            <td>${p.email}</td>

            <td>
                <button class="edit-btn" onclick="editPatient(${p.id})"> Edit </button>
                <button class="delete-btn" onclick="deletePatient(${p.id})"> Delete </button>
            </td>

        </tr>
        `;
    });
}



function deletePatient(id)
{
    if (!confirm("Delete patient?"))
    {
        return;
    }


    patients = patients.filter(p => p.id != id);

    localStorage.setItem("patients", JSON.stringify(patients));

    displayPatients();
}



function editPatient(id)
{
    let p = patients.find(x => x.id == id);

    document.getElementById("name").value = p.name;
    document.getElementById("age").value =p.age;
    document.getElementById("phone").value =p.phone;
    document.getElementById("email").value =p.email;

    editId = id;
}



function searchPatient()
{
    let s =document.getElementById("search").value.toLowerCase();
    let table = document.getElementById("patientTable");
    table.innerHTML = "";

    patients.forEach(p =>
    {
        if (
            p.name
            .toLowerCase()
            .includes(s)
        )
        {
            table.innerHTML +=
            `
            <tr>

                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.phone}</td>
                <td>${p.email}</td>

                <td>
                    <button class="edit-btn" onclick="editPatient(${p.id})"> Edit </button>
                    <button class="delete-btn" onclick="deletePatient(${p.id})"> Delete </button>
                </td>

            </tr>
            `;
        }
    });
}

displayPatients();