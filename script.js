document.addEventListener("DOMContentLoaded", () => {

  const doctorOptions = {
    "Cardiology": ["Dr. Ravi Kumar", "Dr. Dinesh Kumar"],
    "Neurology": ["Dr. Jaya Kumar", "Dr. Ajith Kumar"],
    "Orthopedics": ["Dr. Vinoth Kumar"],
    "General Medicine": ["Dr. Suresh Kumar", "Dr. Kumari"],
    "Ophthalmology": ["Dr. Kumaresan"],
    "ENT": ["Dr. Kumaran"],
    "Dentist": ["Dr. Ravi"],
    "Pediatrics": ["Dr. Raguvaran", "Dr. Suresh"],
    "Gynecology": ["Dr. Kumar", "Dr. Abdul Basith"],
    "Laboratory": ["Dr. Ravi Selvan", "Dr. Muthu Kumar"],
    "Pulmonology": ["Dr. Bala Kumar"],
    "Dermotology": ["Dr. Aisha Beevi", "Dr. Lakshmi"],
    "Nephrology": ["Dr. Muthukaruppan", "Dr. Manickam"],
    "Gastroenterology": ["Dr. Karthikeyan"],
    "Physchology": ["Dr. Sathish Kumar"]
  };

  const deptSelect = document.getElementById("departments");
  const drList = document.getElementById("drlist");

  if (deptSelect && drList) {
    deptSelect.addEventListener("change", () => {
      const department = deptSelect.value;
      drList.innerHTML = "";
      if (doctorOptions[department]) {
        doctorOptions[department].forEach(doc => {
          const opt = document.createElement("option");
          opt.value = doc;
          drList.appendChild(opt);
        });
      }
    });
  }

const patientForm = document.querySelector(".add-patient form");
if (patientForm) {

  const editPatient = JSON.parse(localStorage.getItem("editPatient") || "null");
  const editIndex = localStorage.getItem("editPatientIndex");

  if (editPatient) {
    document.getElementById("patientname").value = editPatient.name;
    document.getElementById("patientage").value = editPatient.age;
    document.getElementById("patientgender").value = editPatient.gender;
    document.getElementById("patientcontact").value = editPatient.contact;
    document.getElementById("patientemail").value = editPatient.email;
    document.getElementById("address").value = editPatient.address;
  }

  patientForm.addEventListener("submit", e => {
    e.preventDefault();

    const patient = {
      name: document.getElementById("patientname").value.trim(),
      age: document.getElementById("patientage").value,
      gender: document.getElementById("patientgender").value,
      contact: document.getElementById("patientcontact").value.trim(),
      email: document.getElementById("patientemail").value.trim(),
      address: document.getElementById("address").value.trim()
    };

    let patients = JSON.parse(localStorage.getItem("patients") || "[]");


    if (editIndex !== null && editIndex !== "null") {
      patients[editIndex] = patient;
      localStorage.removeItem("editPatient");
      localStorage.removeItem("editPatientIndex");
      alert("✅ Patient updated successfully!");
    } else {
      patients.push(patient);
      alert("✅ Patient saved successfully!");
    }

    localStorage.setItem("patients", JSON.stringify(patients));
    window.location.href = "patientrecords.html";
  });
}
const appointmentForm = document.querySelector(".book-appointment form");
if (appointmentForm) {
  const editData = JSON.parse(localStorage.getItem("editAppt") || "null");
  const editIndex = localStorage.getItem("editApptIndex");

  if (editData) {
    document.getElementById("selectpatient").value = editData.patient;
    document.getElementById("departments").value = editData.department;
    document.getElementById("selectdr").value = editData.doctor;
    document.getElementById("datetime").value = editData.datetime;
    document.getElementById("status").value = editData.status || "Pending";
  }

  appointmentForm.addEventListener("submit", e => {
    e.preventDefault();

    const appointment = {
      patient: document.getElementById("selectpatient").value.trim(),
      department: document.getElementById("departments").value,
      doctor: document.getElementById("selectdr").value.trim(),
      datetime: document.getElementById("datetime").value,
      status: document.getElementById("status").value
    };

    let appointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    if (editIndex !== null && editIndex !== "null") {
      appointments[editIndex] = appointment;
      localStorage.removeItem("editAppt");
      localStorage.removeItem("editApptIndex");
      alert("✅ Appointment updated successfully!");
    } else {
      appointments.push(appointment);
      alert("✅ Appointment booked successfully!");
    }

    localStorage.setItem("appointments", JSON.stringify(appointments));
    window.location.href = "appointments.html";
  });
}



  function updatePatientDatalist() {
    const datalist = document.getElementById("patientlist");
    if (datalist) {
      datalist.innerHTML = "";
      const patients = JSON.parse(localStorage.getItem("patients") || "[]");
      patients.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        datalist.appendChild(opt);
      });
    }
  }
  updatePatientDatalist();

  
  const patientTable = document.querySelector(".Patient-records tbody");
  if (patientTable) displayPatients();

  function displayPatients() {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    patientTable.innerHTML = "";
    patients.forEach((p, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.gender}</td>
        <td>${p.contact}</td>
        <td>${p.email}</td>
        <td>${p.address}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editPatient(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deletePatient(${index})">Delete</button>
        </td>`;
      patientTable.appendChild(row);
    });
  }

  window.deletePatient = function (index) {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    displayPatients();
  };

  window.editPatient = function (index) {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    const editPatient = patients[index];
    localStorage.setItem("editPatient", JSON.stringify(editPatient));
    localStorage.setItem("editPatientIndex", index);
    window.location.href = "index.html";
  };

  const appointmentTable = document.querySelector(".Appointments-records tbody");
  if (appointmentTable) displayAppointments();

  function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    appointmentTable.innerHTML = "";
    appointments.forEach((a, index) => {
      const dateTime = new Date(a.datetime);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${a.patient}</td>
        <td>${a.department}</td>
        <td>${a.doctor}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${a.status || "Pending"}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editAppointment(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteAppointment(${index})">Delete</button>
        </td>`;
      appointmentTable.appendChild(row);
    });
  }

  window.deleteAppointment = function (index) {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    displayAppointments();
  };

  window.editAppointment = function (index) {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const appt = appointments[index];
    localStorage.setItem("editAppt", JSON.stringify(appt));
    localStorage.setItem("editApptIndex", index);
    window.location.href = "index.html";
  };

  
  const searchBox = document.getElementById("appointmentSearch");
  if (searchBox) {
    searchBox.addEventListener("input", e => {
      const term = e.target.value.toLowerCase();
      const rows = document.querySelectorAll("tbody tr");
      rows.forEach(row => {
        const firstCell = row.querySelector("td");
        if (firstCell && firstCell.textContent.toLowerCase().includes(term)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }

  const searchBox2 = document.getElementById("patientSearch");
  if (searchBox2) {
    searchBox2.addEventListener("input", e => {
      const term = e.target.value.toLowerCase();
      const rows = document.querySelectorAll("tbody tr");
      rows.forEach(row => {
        const firstCell = row.querySelector("td");
        if (firstCell && firstCell.textContent.toLowerCase().includes(term)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
});
