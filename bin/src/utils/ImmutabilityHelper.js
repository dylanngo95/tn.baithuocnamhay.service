"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImmutabilityHelper {
    static getType(variable) {
        let type = typeof variable;
        type = variable === null ? 'null' : type;
        type = Array.isArray(variable) ? 'array' : type;
        return type;
    }
    static immute(variable) {
        let copy;
        const variableType = ImmutabilityHelper.getType(variable);
        if (variableType === 'object')
            copy = Object.assign({}, variable);
        else if (variableType === 'array')
            copy = variable.slice();
        else
            copy = variable;
        return copy;
    }
    static copy(variable) {
        const result = ImmutabilityHelper.immute(variable);
        const loop = (value) => {
            const valueType = ImmutabilityHelper.getType(value);
            const loopable = !!(valueType === 'object' || valueType === 'array');
            const loopHandler = (index) => {
                value[index] = ImmutabilityHelper.immute(value[index]);
                if (loopable)
                    loop(value[index]);
            };
            if (valueType === 'object')
                for (const index in value)
                    loopHandler(index);
            if (valueType === 'array')
                for (let index = 0; index < value.length; index++)
                    loopHandler(index);
        };
        loop(result);
        return result;
    }
    constructor() { throw new Error('just don\'t...'); }
}
exports.ImmutabilityHelper = ImmutabilityHelper;
