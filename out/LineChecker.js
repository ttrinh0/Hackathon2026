"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChecker = void 0;
class LineChecker {
    lines;
    numberOfLines;
    constructor(lines = [], numberOfLines = 0) {
        this.lines = lines;
        this.numberOfLines = numberOfLines;
    }
    setLines(lines) {
        this.lines = lines;
        this.setTotalLines(lines.length);
    }
    get getNumberOfValidLines() {
        return this.numberOfLines;
    }
    setTotalLines(num) { this.numberOfLines = num; }
    getValidLines() {
        let lineCount = 0;
        for (let i = 0; i < this.lines.length; i++) {
            if (this.processLine(this.lines[i]))
                lineCount++;
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
}
exports.LineChecker = LineChecker;
//# sourceMappingURL=LineChecker.js.map