import './style.css'
import dayjs from 'dayjs'

const birthdayForm = document.getElementById('birthdayForm')
const birthdayDialog = document.getElementById('birthdayDialog')
const birthday = document.getElementById('birthday')
const birthdayDialogText = document.getElementById('birthdayDialogText')
const supplementaryDialogText = document.getElementById('supplementaryDialogText')
const closeDialog = document.getElementById('closeDialog')

birthdayForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const date = dayjs(birthday.value)
    const difference = parseInt(date.diff(dayjs(), 'day'))

    if (difference < 0) {
        birthdayDialogText.innerText = 'miales/as urodziny ' + Math.abs(difference) + ' dni temu'
    } else {
        birthdayDialogText.innerText = 'masz urodziny za ' + difference + ' dni'
    }

    if (date.isSame(dayjs(), 'day')) {
        supplementaryDialogText.innerText = 'wszystkiego najlepszego!'
    } else if (date.isSame(dayjs(), 'week')) {
        supplementaryDialogText.innerText = 'masz urodziny w tym tygodniu'
    } else {
        supplementaryDialogText.innerText = ''
    }

    birthdayDialog.showModal()
})

closeDialog.addEventListener('click', function(event) {
    birthdayDialog.close()
})
