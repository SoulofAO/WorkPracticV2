/* eslint-disable @typescript-eslint/no-explicit-any */
// Function to replace all variables with a given name in JSON
export function replaceVariablesByName(data: any, variableName: string, newValue: any, index: number = -1): void {
    if (index >= 0) {
        let k = -1;
        for (const [key, value] of Object.entries(data)) {
            if (key === variableName) {
                k++;
                if (k === index) {
                    data[key] = newValue;
                    return;
                }
            }
            if (typeof value === 'object' && value !== null) {
                replaceVariablesByName(value, variableName, newValue, index);
            }
        }
    } else {
        for (const [key, value] of Object.entries(data)) {
            if (key === variableName) {
                data[key] = newValue;
            }
            if (typeof value === 'object' && value !== null) {
                replaceVariablesByName(value, variableName, newValue, index);
            }
        }
    }
}

// Function to find all variables by name in JSON
export function findVariablesByName(data: any, variableName: string): any[] {
    const foundVariables: any[] = [];
    for (const [key, value] of Object.entries(data)) {
        if (key === variableName) {
            foundVariables.push(value);
        }
        if (typeof value === 'object' && value !== null) {
            foundVariables.push(...findVariablesByName(value, variableName));
        }
    }
    return foundVariables;
}