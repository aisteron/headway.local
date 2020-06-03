document.readyState !== 'loading' ? init() : document.addEventListener('DOMContentLoaded', init)
export function $_(element){return document.querySelector(element)}
export function $$_(elements){return document.querySelectorAll(elements)}

function init(){

	$$_('header .phone span, footer span.call').forEach(el => {
		el.addEventListener('click', event => {
			$_('.wrapper .modal').style.display = "block"
		})
	})

	let modal = $_('.wrapper .modal .callback')
	document.addEventListener('click', event => {
		if(event.target == $_('.wrapper .callback .close')){
			$_('.wrapper .modal').style.display = 'none'
		}
		if(event.target == modal || 
			event.target == $_('header .phone span') ||
			event.target == $_('footer span.call')	||
			modal.contains(event.target)
			) 
			return;
		$_('.wrapper .modal').style.display = 'none'
	} )

	$_('.modal .callback form').addEventListener('submit', event => {
		event.preventDefault()

		let url = 'http://api.local/callback.php';
		let data = {phone: $_('.modal .callback input[type="text"]').value}
			fetch(url, {
				method: 'POST',
				mode: 'cors',
				headers: {'Content-type': 'application/json' },
				body: JSON.stringify(data)
			})
			.then(response => response.text())
			.then(text => drawResult(text))
	})

	
}

function drawResult(text) {
	let string = ``
	if(text == 'success') {
		string = 'Спасибо, ожидайте звонка менеджера'
	} else {
		string = 'Извините, произошла ошибка'
	}
	
	$_('.modal form').innerHTML = string
}