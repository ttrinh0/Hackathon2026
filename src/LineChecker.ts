export class LineChecker {
    constructor(
        private lines: string[] = [],
        private numberOfLines: number = 0
    ) {
    }
    public setLines(lines: string[]): void {
        this.lines = lines;
        this.setTotalLines(lines.length);
    }

    get getNumberOfValidLines(): number {
        return this.numberOfLines
    }

    private setTotalLines(num: number): void { this.numberOfLines = num; }

    public getValidLines(): number {

        let lineCount = 0;
        for (let i = 0; i < this.lines.length; i++) {
            if (this.processLine(this.lines[i]))
                lineCount++
        }
        return lineCount;

    }

    public processLine(line: string): boolean {
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