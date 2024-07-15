// Function to replace all variables with the given name in a JSON object
function replaceVariablesByName(data: any, variableName: string, newValue: any, index: number = -1): void {
    if (index >= 0) {
        let k = -1;
        for (const key in data) {
            if (key === variableName) {
                k++;
                if (k === index) {
                    data[key] = newValue;
                    return;
                }
            }
            if (typeof data[key] === 'object' && data[key] !== null) {
                replaceVariablesByName(data[key], variableName, newValue);
            }
        }
    } else {
        for (const key in data) {
            if (key === variableName) {
                data[key] = newValue;
            }
            if (typeof data[key] === 'object' && data[key] !== null) {
                replaceVariablesByName(data[key], variableName, newValue);
            }
        }
    }
}

// Function to find all variables with the given name in a JSON object
function findVariablesByName(data: any, variableName: string): any[] {
    const foundVariables: any[] = [];
    let k = -1;
    for (const key in data) {
        if (key === variableName) {
            foundVariables.push(data[key]);
        }
        if (typeof data[key] === 'object' && data[key] !== null) {
            foundVariables.push(...findVariablesByName(data[key], variableName));
        }
    }
    return foundVariables;
}