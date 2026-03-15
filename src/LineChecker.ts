import { randomInt } from "crypto";

export class LineChecker {
    constructor(
        private prevLines: string[] = [],
        private numberOfLines: number = 0
    ) {
    }

    public setInitialLines(lines: string[]): void {
        this.prevLines = lines;
        this.setTotalLines(this.getValidLines(this.prevLines));
        this.getPoints(lines);
    }

    get getNumberOfValidLines(): number {
        return this.numberOfLines
    }

    private setTotalLines(num: number): void { this.numberOfLines = num; }

    public getPoints(lines: string[]) {
        let points = 0;
        for (let i = 0; i < this.getValidLines(lines); i++) {
            let amount = randomInt(5, 15)
            points += amount;
        }
        return points
    }

    public getValidLines(lines: string[]): number {
        let lineCount = 0;
        for (let i = 0; i < lines.length; i++) {
            if (this.processLine(lines[i])) {
                lineCount++
            }
        }
        return lineCount;
    }

    private processLine(line: string): boolean {
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

    public compareLines(lines: string[]): number {
        let newLines = lines;
        let uniqueNew: string[] = [];
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