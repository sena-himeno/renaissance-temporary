const BASELINE_EASY = 10;
const BASELINE_NORMAL = 30;
const MILESTONE_VALUE = 7;
class Score{
    constructor() {

        this.init();
    }
    init() {
        this.current_milestone_value = 0;
        this.multiplier = 1;
        this.current_combo = 0;
        this.max_combo = 0;
        this.score = 0;
        this.current_time = 0;
        this.baseline = BASELINE_NORMAL;
        this.milestone_value = MILESTONE_VALUE;
    }
    static setDifficulty(difficulty) {
        this.baseline = difficulty === "easy" ? BASELINE_EASY : BASELINE_NORMAL;
    }
    ruleValid() {
        console.log("Valid Key")
        this.current_milestone_value++;
        if (this.current_milestone_value >= this.milestone_value) {
            this.current_milestone_value = 0;
            this.multiplier++;
        }
        if (this.current_combo >= this.max_combo) {
            this.max_combo = this.current_combo;
        }
    }

    ruleInvalid() {

        this.current_milestone_value > 0 ? this.current_milestone_value-- : 0;
        if (this.current_combo >= this.max_combo) {
            this.max_combo = this.current_combo;
        }
        this.current_combo = 0;
    }

    calculateScoreByKey() {
        const score = this.baseline * this.milestone_value + (this.current_combo / 10) * this.baseline;
        this.score += score;
        console.log(`current score : ${this.score}`);
    }

    calculateScore(current_time,current_count,key_info,key_pressed) {
        if (this.current_time === key_info[current_count].key_time && key_pressed === key_info[current_count].key_pressed) {
            console.log("valid key " +  key_pressed + "  time :" + current_time)
            this.ruleValid();
            this.calculateScoreByKey();
        } else {
            this.ruleInvalid();
        }
    }



}