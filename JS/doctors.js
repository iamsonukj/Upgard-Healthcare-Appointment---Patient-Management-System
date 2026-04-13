let editDoctorId = null;

function addDoctor()
{
    let name = document.getElementById("doctorName").value;

    let spec = document.getElementById("specialization").value;
    let time = document.getElementById("doctorTime").value;

    if (name == "")
    {
        alert("Enter name");
        return;
    }
    if (spec == "")
    {
        alert("Select specialization");
        return;
    }
    if (time == "")
    {
        alert("Select time");
        return;
    }

    if (editDoctorId == null)
    {
        doctors.push(
        {
            id: Date.now(),
            name: name,
            specialization: spec,
            time: time
        });
    }
    else
    {
        let d = doctors.find(x => x.id == editDoctorId);
        d.name = name;
        d.specialization = spec;
        d.time = time;
        editDoctorId = null;
    }

    localStorage.setItem("doctors", JSON.stringify(doctors));

    displayDoctors();



    document.getElementById("doctorName").value = "";
    document.getElementById("specialization").value = "";
    document.getElementById("doctorTime").value = "";
}

function displayDoctors()
{
    let table = document.getElementById("doctorTable");
    table.innerHTML = "";

    doctors.forEach(d =>
    {
        table.innerHTML +=
        `
        <tr>

            <td>${d.id}</td>
            <td>${d.name}</td>
            <td>${d.specialization}</td>
            <td>${d.time}</td>

            <td>
                <button class="edit-btn" onclick="editDoctor(${d.id})"> Edit </button>
                <button class="delete-btn" onclick="deleteDoctor(${d.id})"> Delete </button>
            </td>

        </tr>
        `;
    });
}



function deleteDoctor(id)
{
    if (!confirm("Delete doctor?"))
    {
        return;
    }

    doctors = doctors.filter(d => d.id != id);

    localStorage.setItem("doctors", JSON.stringify(doctors));
    displayDoctors();
}

function editDoctor(id)
{
    let d = doctors.find(x => x.id == id);

    document.getElementById("doctorName").value = d.name;
    document.getElementById("specialization").value = d.specialization;
    document.getElementById("doctorTime").value = d.time;
    editDoctorId = id;
}

displayDoctors();