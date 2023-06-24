import {reactive, toRefs, watch} from "vue";

function required(value) {
    if (value === '' || value === null) {
        return 'Ovo polje je obavezno';
    }
    return null;
}

export function useValidate(fields, returnErrors) {
    const errors = reactive({});
    console.log(fields);
    watch(returnErrors, (value) => {
        for (const field of fields) {
            errors[field.name] = null;
            if(value === false){
                continue;
            }
            for (const rule of field.rules) {
                if (rule === 'required') {
                    const err = required(field.field.value);
                    if (err) {
                        errors[field.name] = err;
                        break;
                    }
                }
            }
        }
    }, {immediate: true});

    return toRefs(errors);
}