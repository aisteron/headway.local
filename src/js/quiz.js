import {$_, $$_} from './callback.js'
import {store} from './store';
document.readyState !== 'loading' ? init() : document.addEventListener('DOMContentLoaded', init);
store.subscribe( () => makeStep(store.state) )

function init() {

	$_('.q2 input[type="text"]').addEventListener('keyup', event => {
		$_('.q2 input[type="range"]').value = event.target.value
	})

	$_('.q2 input[type="range"]').addEventListener('change', event => {
		$_('.q2 input[type="text"]').value = event.target.value
	})


	$_('.quiz button.next').addEventListener('click', () => {

		if(store.state.step < 6) {
			store.update({step: store.state.step + 1})
		} else {
			sendAnswers()
		}

	})

	$_('.quiz button.prev').addEventListener('click', () =>  store.update({step: store.state.step - 1}))

}

makeStep(store.state)

function makeStep(state){
	console.log(state.step)
	
	if(state.step == 1) {
		$_('button.prev').style.display = 'none' 
	} else {
		$_('button.prev').style.display = 'inline' 
	}

	if(state.step == 6) { 
		$_('.quiz .wrap .title').style.display = 'none'
		$_('.quiz button.next').classList.add('last')
		$_('.quiz button.next').value="Отправить"

	} else {
		$_('.quiz .wrap .title').style.display = 'block'
		$_('.quiz button.next').classList.remove('last')
		$_('.quiz button.next').value="Далее"

	}



	
	$$_('.quiz .question').forEach(el => el.style.display = 'none')	
	
	$_('.quiz .question.q'+state.step).style.display = 'block'	


}

function sendAnswers() {
	let data = {
		q1: {
			q: 'Формат обучения',
			a: $_('.q1 input:checked').nextElementSibling.innerHTML
		},
		q2: {
			q: 'Количество сотрудников',
			a: $_('.q2 input[type="text"]').value
		},
		q3: {
			q: 'Цели обучения',
			a: q3()
		},
		q4: {
			q: 'Временные рамки',
			a: q4()
		},
		q5: {
			q: 'Сфера деятельности',
			a: $_('.q5 textarea').value
		},
		form: {
			name: $_('.q6 #q6-name').value,
			phone: $_('.q6 #q6-phone').value,
			mail: $_('.q6 #q6-mail').value,
			comment: $_('.q6 #q6-comment').value
		}
	}

	function q3() {
		let arr = []
		$$_('.q3 input[type="checkbox"]').forEach(el => {
			if(el.checked) {
				arr.push(el.nextElementSibling.innerHTML)
			}
		})
		return arr
	}

	function q4() {
		let checked = ''
		document.querySelectorAll('.q4 input[type="radio"]').forEach(el => {
			if(el.checked) {
				checked = el.nextElementSibling.innerHTML
			}
		})

		return checked
	
	}

	
	//let url = 'http://api.local/quiz.php'
	let url = '/php/quiz.php'

	fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	})
		.then(response => response.text())
		.then(text => drawResult(text))
}


function drawResult(text) {
	let string = ``;
	if(text == 'success'){
		string = `
			<span class="title">Успешно отправлено!</span>
			<p>Пожалуйста, ожидайте, звонка менеджера</p>
		`
	} else {
		string = `
			<span class="title" style="color: red">Ошибка отправки!</span>
			<p>Пожалуйста, сообщите нам об этом на почту <b>hwschool@mail.ru</b></p>
		`
	}
	$_('.question.q6').innerHTML = string
	$$_('.quiz .wrap button').forEach(el => el.remove())

}