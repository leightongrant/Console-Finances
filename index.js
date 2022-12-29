// Imports
import finances from "../modules/data.js";

// Object
const analyzer = {
    finances: finances,
    dollars: new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: 'currency',
    }),
    changes() {
        let sumOfChanges = 0;
        let difference = 0;
        const changesMonthToMonth = [];
        const financesFromFeb = this.finances.slice(1, this.finances.length);

        for (let i = 0; i < financesFromFeb.length; i++) {
            difference = [financesFromFeb[i][0], this.finances[i][1] - financesFromFeb[i][1]];

            if (difference[1] === 0) {
                changesMonthToMonth.push(difference);
            } else if (difference[1] < 0) {
                difference[1] = difference[1] + (Math.abs(difference[1]) * 2);
                changesMonthToMonth.push(difference);
            } else {
                difference[1] = difference[1] - (difference[1] * 2);
                changesMonthToMonth.push(difference);
            }

            sumOfChanges += difference[1];

        }

        return [changesMonthToMonth, sumOfChanges]
    },
    get numberOfMonths() {
        return this.finances.length
    },
    get total() {
        let sum = 0;
        this.finances.forEach((record) => {
            sum += record[1];
        })
        return this.dollars.format(sum);
    },
    get averageChange() {
        let avrChng = this.changes()[1] / this.changes()[0].length;
        return this.dollars.format(avrChng);
    },
    get greatestDecreaseInProfits() {
        let firstVal = this.changes()[0].sort((a, b) => a[1] - b[1])[0];
        let decrease = `${firstVal[0]} (${this.dollars.format(firstVal[1])})`;
        return decrease;
    },
    get greatestIncreaseInProfits() {
        let lastVal = this.changes()[0].sort((a, b) => a[1] - b[1])[this.changes()[0].length - 1];
        let increase = `${lastVal[0]} (${this.dollars.format(lastVal[1])})`;
        return increase;
    }
};

// console.log(analyzer.changes()[0])
// Console Output
console.log('Financial Analysis');
console.log('-------------------------');
console.log('Total Months: ', analyzer.numberOfMonths);
console.log('Total: ', analyzer.total);
console.log('Average Change: ', analyzer.averageChange);
console.log('Greatest Increase in Profits: ', analyzer.greatestIncreaseInProfits);
console.log('Greatest Decrease in Profits: ', analyzer.greatestDecreaseInProfits);

// HTML Output
const htmlOutput = (id, data) => {
    return document.getElementById(id).innerHTML = data;
}

htmlOutput('total-months', analyzer.numberOfMonths);
htmlOutput('total', analyzer.total);
htmlOutput('average-change', analyzer.averageChange);
htmlOutput('profits', analyzer.greatestIncreaseInProfits);
htmlOutput('losses', analyzer.greatestDecreaseInProfits);