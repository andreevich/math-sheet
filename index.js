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

    const maxInt = 100;
    const minInt = 0;
    const count = 100;
    const OPERATION = {
        PLUS: '+',
        MINUS: '-'
    }
    const randomItem = (min = minInt, max = maxInt) => {
        let rand = minInt + Math.random() * (maxInt + 1 - minInt);
        return Math.floor(rand);
    }
    const randomOperation = (i) => {
        if (Math.random() >= 0.5) {
            return OPERATION.PLUS
        }
        else {
            return OPERATION.MINUS
        }
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
            else {
                examples.push(new Exam(arr, operation));
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
    }
    document.addEventListener("DOMContentLoaded", ready);
})()