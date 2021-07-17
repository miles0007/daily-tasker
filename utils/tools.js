
let Ajv = require("ajv");
const ajv = new Ajv({allErrors: true});


// const v = {
//   tasks: [
//     {
//       Task_Type: "Give a call",
//       Task_Name: "Send Message",
//     },
//     {
//       Task_Type: "Give a call",
//     //   Task_Name: "Send Message",
//     },
//   ],
// };


const insertSchema = {
    type: "object",
    properties: {
        tasks: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                properties: {
                    Task_Name: {
                        type: "string"
                    },
                    Task_Type: {
                        type: "string"
                    }
                },
                required: ["Task_Name","Task_Type"]
            }
        }
    },
    additionalProperties: true
}

const addSchema = {
    type: "object",
    properties: {
        user: {
            type: "string"
        },
        date: {
            type: "string",
            format: "date"
        }
    },
    required: ["user"],
    additionalProperties: true
}


const data_schemas = {
    "insertschema": insertSchema,
    "addschema": addSchema
}

function validateSchema(obj_schema, data) {
    const schema = data_schemas[obj_schema]
    if (schema) {
        const valid = ajv.validate(schema, data);
        if (!valid) {
            return false, ajv.errors[0].message;
        } else {
            return true
        }
    }
    return false
    
}

// validateSchema("insertschema", v)

module.exports = validateSchema;