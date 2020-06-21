const vm = new Vue({
    el: '#app',
    data: {
        hautGauche: false,
        hautDroite: false,
        basGauche: false,
        basDroite: false,
        sequence: [],
        tmp: [],
        squareMapping: ['hautGauche', 'hautDroite', 'basGauche', 'basDroite']
    },
    computed: {
        score() {
            return (this.sequence.length) ? `Score : ${this.sequence.length - 1}` : `Score : 0`;
        }
    },
    methods: {
        allGrey() {
            this.hautGauche = false;
            this.hautDroite = false;
            this.basGauche = false;
            this.basDroite = false;
        },
        addNewElemToSequence() {
            this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
            this.tmp = this.sequence.slice();
        },
        newGame() {
            this.sequence = [];
            this.nextTurn();
        },
        nextTurn() {
            this.addNewElemToSequence();
            this.allGrey();
            this.playSequence(this.tmp[0]);
        },
        playSequence(instruction) {
            this[instruction] = true;
            setTimeout(function() {
                vm.allGrey();
                vm.tmp.shift();
                if (vm.tmp[0]) {
                    setTimeout(function() {
                        vm.playSequence(vm.tmp[0]);
                    }, '400');
                } else {
                    vm.tmp = vm.sequence.slice();
                }
            }, 400);

        },
        selectSquare(instruction) {
            console.log(instruction);
            if (instruction === this.tmp[0]) {
                this[instruction] = true;
                setTimeout(function() {
                    vm.allGrey();
                    vm.tmp.shift();
                    if (!vm.tmp[0]) {
                        vm.nextTurn();
                    }
                }, 400)
            } else {
                alert('perdu')
            }
        }
    }
})