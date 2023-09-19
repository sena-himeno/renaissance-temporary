class VariableManager {
    constructor() {
        if (VariableManager.instance) {
            return VariableManager.instance;
        }
        this.init();
        VariableManager.instance = this;
    }
    init(){
        this._manager = {};
    }
    static getInstance() {
        if (!VariableManager.instance) {
            VariableManager.instance = new VariableManager();
        }
        return VariableManager.instance;
    }
    clearAllVariables() {
        this.init();
    }
    setVariable(variable_name,variable_value = null){
        return  this._manager[variable_name] = variable_value;
    }
    setVariables(variables) {
        for (const variableName in variables) {
            if (variables.hasOwnProperty(variableName)) {
                this.setVariable(variableName, variables[variableName]);
            }
        }
    }

    getVariable(variable_name){
        return this._manager[variable_name];
    }

    deleteVariable(variable_name){
        delete this._manager[variable_name];
    }
    variableExists(variable_name) {
        return this._manager.hasOwnProperty(variable_name) && this._manager[variable_name] !== null && this._manager[variable_name] !== undefined;
    }
    getAllVariableNames() {
        return Object.keys(this._manager);
    }



}




