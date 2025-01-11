const button = document.getElementById('button');
const birthday = document.getElementById('bday');
const age = document.getElementById('age');

function calculateAge() {
    const birthdayValue = birthday.value;
    const today = new Date();
    const birthdayDate = new Date(birthdayValue);
    const ageDate = new Date(today.getFullYear(), today.getMonth() - birthdayDate.getMonth(), today.getDate());
    const age = today.getFullYear() - birthdayDate.getFullYear();
    if (today < ageDate) {
        age--;
    }
    return age;

}

button.addEventListener('click', () => {
    const ageValue = calculateAge();
    age.textContent = `Your age is: ${ageValue}`;
});

birthday.addEventListener('input', () => {
    age.textContent = '';
});
