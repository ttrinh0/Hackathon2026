"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChecker = void 0;
const crypto_1 = require("crypto");
class LineChecker {
    prevLines;
    numberOfLines;
    constructor(prevLines = [], numberOfLines = 0) {
        this.prevLines = prevLines;
        this.numberOfLines = numberOfLines;
    }
    setInitialLines(lines) {
        this.prevLines = lines;
        this.setTotalLines(this.getValidLines(this.prevLines));
        this.getPoints(lines);
    }
    get getNumberOfValidLines() {
        return this.numberOfLines;
    }
    setTotalLines(num) { this.numberOfLines = num; }
    getPoints(lines) {
        let points = 0;
        for (let i = 0; i < this.getValidLines(lines); i++) {
            let amount = (0, crypto_1.randomInt)(5, 15);
            points += amount;
        }
        return points;
    }
    getValidLines(lines) {
        let lineCount = 0;
        for (let i = 0; i < lines.length; i++) {
            if (this.processLine(lines[i])) {
                lineCount++;
            }
        }
        return lineCount;
    }
    processLine(line) {
        let brackets = "[]{}()";
        if (line.trim().length === 0)
            return false;
        if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*/"))
            return false;
        for (let i in brackets.split("")) {
            if (line.trim() === brackets.split("")[i])
                return false;
        }
        return true;
    }
    compareLines(lines) {
        let newLines = lines;
        let uniqueNew = [];
        newLines.forEach(line => {
            if (!this.prevLines.includes(line)) {
                uniqueNew = uniqueNew.concat(line);
            }
        });
        this.prevLines = newLines;
        return this.getPoints(uniqueNew);
        //current lines --> old lines
        // check to see if new current lines are in old lines
        // return list of line changes
        // this is what gets passed into points
    }
}
exports.LineChecker = LineChecker;
//# sourceMappingURL=LineChecker.js.map