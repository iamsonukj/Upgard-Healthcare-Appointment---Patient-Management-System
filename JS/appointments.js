function loadDropdowns()
{
    let pSel = document.getElementById("patientSelect");
    let dSel = document.getElementById("doctorSelect");

    pSel.innerHTML = "<option value=''>Select Patient</option>";
    dSel.innerHTML = "<option value=''>Select Doctor</option>";

    patients.forEach(p =>
    {
        pSel.innerHTML += `<option value="${p.id}">${p.name}</option>`;
    });

    doctors.forEach(d =>
    {
        dSel.innerHTML += `<option value="${d.id}">${d.name}</option>`;
    });
}



function addAppointment()
{
    let pid = document.getElementById("patientSelect").value;
    let did = document.getElementById("doctorSelect").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    if (
        pid == "" ||
        did == "" ||
        date == "" ||
        time == ""
    )
    {
        alert("Fill all fields");
        return;
    }

    let today =
        new Date().toISOString().split("T")[0];
    if (date < today)
    {
        alert("Enter valid date");
        return;
    }

    let doctor =
        doctors.find(x => x.id == did);

    if (doctor)
    {
        let slot = doctor.time;
        if (slot == "9AM - 12:30PM")
        {
            if (
                time != "09:00 AM" &&
                time != "10:00 AM" &&
                time != "11:00 AM" &&
                time != "12:00 PM"
            )
            {
                alert("Enter time within doctor slot");
                return;
            }
        }

        if (slot == "2PM - 5PM")
        {
            if (
                time != "02:00 PM" &&
                time != "03:00 PM" &&
                time != "04:00 PM" &&
                time != "05:00 PM"
            )
            {
                alert("Enter time within doctor slot");
                return;
            }
        }

        if (slot == "7PM - 9PM")
        {
            if (
                time != "07:00 PM" &&
                time != "08:00 PM" &&
                time != "09:00 PM"
            )
            {
                alert("Enter time within doctor slot");
                return;
            }
        }
    }


    let exist =
        appointments.find(
            a =>
                a.doctorId == did &&
                a.date == date &&
                a.time == time
        );
    if (exist)
    {
        alert(
            "Doctor already has appointment at this time"
        );
        return;
    }



    appointments.push(
    {
        id: Date.now(),
        patientId: pid,
        doctorId: did,
        date: date,
        time: time,
        status: "Pending"
    });

    localStorage.setItem("appointments", JSON.stringify(appointments));

    document.getElementById("patientSelect").value = "";
    document.getElementById("doctorSelect").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";

    displayAppointments();
}





function displayAppointments()
{
    let table = document.getElementById("appointmentTable");
    table.innerHTML = "";


    let fDate = document.getElementById("filterDate")?.value;

    let fStatus = document.getElementById("filterStatus")?.value;

    appointments.forEach(a =>
    {
        if (
            (fDate && a.date != fDate) ||
            (fStatus && a.status != fStatus)
        )
        {
            return;
        }


        let p = patients.find(x => x.id == a.patientId);
        let d =doctors.find(x => x.id == a.doctorId);

        table.innerHTML +=
        `
        <tr>
        <td>${p?.name}</td>
        <td>${d?.name}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>

        <span class="${
            a.status == "Completed"
            ? "status-completed"
            : a.status == "Cancelled"
            ? "status-cancelled"
            : "status-pending"
        }">

        ${a.status}

        </span>

        <br>

        ${
            a.status == "Pending"
            ?
            `
            <button class="complete-btn" onclick="updateStatus(${a.id},'Completed')"> Completed </button>
            <button class="cancel-btn" onclick="updateStatus(${a.id},'Cancelled')"> Cancelled </button>
            `
            :
            ""
        }

        </td>

        </tr>
        `;
    });
}


function updateStatus(id, status)
{
    let a = appointments.find(x => x.id == id);
        a.status = status;

    localStorage.setItem("appointments", JSON.stringify(appointments)
    );

    displayAppointments();
}

loadDropdowns();
displayAppointments();