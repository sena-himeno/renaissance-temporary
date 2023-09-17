class VariableManager {
    constructor() {
        this.init();
    }
    init(){
        this.manager = {};
    }
    setVariable(variable_name,variable_value){
        return this.manager[variable_name] = variable_value;
    }

    getVariable(variable_name){
        return this.manager[variable_name];
    }

    deleteVariable(variable_name){
        delete this.manager[variable_name];
    }



}
class  GameParametersController{

}
