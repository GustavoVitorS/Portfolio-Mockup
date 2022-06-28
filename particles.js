/*modifique o script e deixe as particulas da forma que você quiser*/

particlesJS('particles-js', {
	particles: {
		number: {
			value: 255,
			density: {
				enable: true,
				value_area: 888
			}
		},
		color: {
			value: '#fff'
		},
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#fff'
			},
			polygon: {
				nb_sides: 5
			},
			image: {
				src: 'https://cdn.freebiesupply.com/logos/large/2x/slack-logo-icon.png',
				width: 200,
				height: 200
			}
		},

		opacity: {
			value: 0.4,
			random: false,
			anim: {
				enable: false,
				speed: 1,
				opacity_min: 0.4,
				sync: false
			}
		},
		size: {
			value: 5,
			random: true,
			anim: {
				enable: false,
				speed: 20,
				size_min: 20,
				sync: false
			}
		},
		line_linked: {
			enable: false,
			distance: 250,
			color: '#808080',
			opacity: 0.4,
			width: 1
		},
		move: {
			enable: true,
			speed: 5,
			direction: 'none',
			random: false,
			straight: false,
			out_mode: 'out',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200
			}
		}
	},
	interactivity: {
		detect_on: 'window',
		events: {
			onhover: {
				enable: false,
				mode: 'repulse'
			},
			onclick: {
				enable: false,
				mode: 'push'
			}
		},
		modes: {
			'repulse': {
				distance: 70,
				duration: 0.4
			},
			'push': {
				particles_nb: 4
			}
		}
	},
	retina_detect: true
});
const allElements = document.querySelectorAll('.animated-text');

// Verifica se existe pelo menos um elemento
if (allElements.length > 0) {
	//Ele executa o script para cada elemento encontrado
	allElements.forEach((element) => {
		const txtElement = element,
			wordsList = txtElement.getAttribute('data-words'),
			words = wordsList.split(', '); // Faz um array de palavras do atributo data

		let wordsCount = 0;

		entry();

		// Função inicial
		function entry() {
			if (wordsCount < words.length) {
				// Ele executa o código para cada palavra
				let word = words[wordsCount],
					txtArr = word.split(''), // Faz uma matriz de letras na palavra
					count = 0;

				txtElement.textContent = ''; // Ele remove o texto anterior do elemento

				// Para cada letra do array
				txtArr.forEach((letter) => {
					// Ele substitui o espaço vazio pelo HTML "non-break-space"...
					// ... Isso é necessário para separar as palavras corretamente
					let _letter = letter === ' ' ? '&nbsp;' : letter;

					// Ele envolve cada letra com um "span" e coloca todas elas de volta no elemento
					txtElement.innerHTML += `<span>${_letter}</span>`;
				});

				let spans = txtElement.childNodes;

				// Ele define o intervalo entre cada letra mostrando
				const letterInterval = setInterval(activeLetter, 70);

				function activeLetter() {
					spans[count].classList.add('active');
					count++;

					if (count === spans.length) {
						clearInterval(letterInterval);

						// Aguarda 4 segundos para começar a apagar a palavra
						setTimeout(() => {
							eraseText();
						}, 600);
					}
				}

				function eraseText() {
					// Ele define o intervalo entre cada letra oculta
					let removeInterval = setInterval(removeLetter, 40);
					count--;

					function removeLetter() {
						spans[count].classList.remove('active');
						count--;

						if (count === -1) {
							clearInterval(removeInterval);
							wordsCount++;

							// Depois de remover a última letra, chame a função inicial novamente
							entry();
						}
					}
				}
			} else {
				// Se o código chegar à última palavra
				// Reinicia o contador de palavras...
				wordsCount = 0;
				// ...e chama a função inicial novamente.
				entry();
			}
		}
	});
}
