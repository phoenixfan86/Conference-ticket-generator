const uploadArea = document.getElementById('upload-area')
const fileInput = document.getElementById('file-input')
const preview = document.getElementById('preview')
const ticketImg = document.getElementById('ticket-img')

// Функція для оновлення прев'ю
function updatePreview(file) {
	const reader = new FileReader()
	reader.onload = e => {
		preview.src = e.target.result // Оновлення зображення
		ticketImg.src = e.target.result
	}
	reader.readAsDataURL(file)
}

// Обробка події вибору файлу
fileInput.addEventListener('change', event => {
	const file = event.target.files[0]
	if (file) {
		if (file.size <= 500 * 1024) {
			// Перевірка на розмір
			updatePreview(file)
		} else {
			alert('Please upload a valid JPG or PNG file (max size: 500KB).')
		}
		fileInput.value = '' // Очищення для повторного вибору того ж файлу
	}
})

// Обробка drag & drop
uploadArea.addEventListener('dragover', event => {
	event.preventDefault()
	uploadArea.classList.add('dragover')
})

uploadArea.addEventListener('dragleave', () => {
	uploadArea.classList.remove('dragover')
})

uploadArea.addEventListener('drop', event => {
	event.preventDefault()
	uploadArea.classList.remove('dragover')
	const file = event.dataTransfer.files[0]
	if (file && file.size <= 500 * 1024) {
		// Перевірка на розмір
		updatePreview(file)
	} else {
		alert('Please upload a valid JPG or PNG file (max size: 500KB).')
	}
})

// Клік по області для відкриття діалогу вибору файлу
uploadArea.addEventListener('click', () => {
	if (!fileInput.matches(':focus')) {
		// Перевірка, чи input активний
		fileInput.click()
	}
})

const submitBtn = document.getElementById('submit')
const emailInput = document.getElementById('email')
const emailError = document.getElementById('email-error')
const ticketNumber = document.getElementById('ticket-number')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

emailInput.addEventListener('input', () => {
	const inputEmail = emailInput.value.trim()

	if (!emailRegex.test(inputEmail)) {
		emailError.classList.toggle('visible')
	} else {
		emailError.style.display = 'none'
	}
})

submitBtn.addEventListener('click', function () {
	document.querySelector('.ticket-wrapper').classList.toggle('visible')

	const ownerName = document.getElementById('owner-name')
	const ticketName = document.getElementById('ticket-name')
	const ownerEmail = document.getElementById('owner-email')
	const gitUsername = document.getElementById('github-username')

	const inputName = document.getElementById('name').value.trim()
	const inputEmail = document.getElementById('email').value.trim()
	const inputGithub = document.getElementById('username').value.trim()

	const randomNumber = Math.floor(10000 + Math.random() * 90000)
	ticketNumber.textContent = `#${randomNumber}`
	ownerName.textContent = inputName
	ticketName.textContent = inputName
	ownerEmail.textContent = inputEmail
	gitUsername.textContent = inputGithub
})
