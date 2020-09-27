(() => {
    class Exam {
        elements = []
        operation = null
        constructor(elements, operation) {
            this.elements = elements;
            this.operation = operation;
        }
        static draw(el) {
            return `<span class='el-1'>${el.elements[0]}</span>`
                + `${el.operation}`
                + `<span class='el-2'>${el.elements[1]}</span>= `
                + `<span class='answer'><span></span><span></span><span></span>`
                + `</span`;
        }
    }

    const maxInt = 101;
    const minInt = 0;
    const count = 102;
    const OPERATION = {
        PLUS: '+',
        MINUS: '-',
		MULTY: 'x',
		DIV: ':'
    }
    const randomItem = (min = minInt, max = maxInt) => {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
    const randomOperation = (min = 0, max = Object.keys(OPERATION).length-1) => {
		let rand = Math.floor(min + Math.random() * (max + 1 - min));
		return Object.entries(OPERATION)[rand][1]
    }

    const generate = count => {
        let examples = []
        for (let i = 0; i < count; i++) {
            let numb1 = randomItem();
            let numb2 = randomItem();

            let arr = [numb1, numb2];
            let operation = randomOperation();
			
            if (operation === OPERATION.MINUS) {
                examples.push(new Exam(arr.sort((a, b) => b - a), operation));
            }
			
			if (operation === OPERATION.PLUS) {
                examples.push(new Exam(arr, operation));
			}
			
			if(operation === OPERATION.MULTY){
				examples.push(new Exam([randomItem(0,10),randomItem(0,10)], operation));
			}

			if(operation === OPERATION.DIV){
				numb1 = randomItem(1,10);
				numb2 = randomItem(0,10);
				
				let rez = numb1*numb2;
				examples.push(new Exam([rez,numb1], operation));
			}			
        }
        return examples;
    }

    const ready = () => {
        let examples = generate(count).map(el => {
            let div = document.createElement('div');
            div.className = `item`;
            div.innerHTML = Exam.draw(el);
            return div;
        })
        document.querySelector('.examples').append(...examples)
        document.querySelector('#count').innerHTML = count;
        document.querySelector('#date').innerHTML = new Date().toLocaleString();
    }
    document.addEventListener("DOMContentLoaded", ready);
})()