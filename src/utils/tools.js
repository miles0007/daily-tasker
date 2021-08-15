// const bcrypt = require('bcrypt')
const Crypto = require('crypto');
let Ajv = require("ajv");
let sendEmail = require('./mail');
const ajv = new Ajv({allErrors: true});


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
                    },
                    Duration: {
                        type: "integer",
                        default: 0
                    }
                },
                required: ["Task_Name","Task_Type","Duration"]
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

const tools = {}

tools.Encrypt = function(credentials) {
    if (typeof credentials === 'string' && credentials.length >= 10) {
        const pass_hash = process.env.USER_PASS_HASH || 'randomlygeneratedpassword';
        const hash = Crypto.Hmac('sha256', pass_hash).update(credentials).digest('hex');
        return hash;
    } else {
        return false;
    }
}

function filterObject(objs, key) {
  let values = []
  console.log(objs, 'objs')
  objs.forEach((obj) => {
    for (var i of Object.keys(obj)) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == "object") {
        filterObject(obj[i], key);
      } else if (i == key) {
        delete obj[key];
      }
    }
    values.push(obj)
  });
  return values;
}


function notificationProcess(users) {
    for (let i=0; i< users.length; i++) {
        console.log(users[i]);
        const user_url = process.env.host + "/mission/" + users[i].url_id;
        const user_email = users[i].user.email;
        sendEmail({
          from: "cyborgv.2@hotmail.com",
          to: user_email,
          subject: "Daily Tasker - Event Register",
          text: `${user_url} \n Use this link to Add Tasks of the day.`,
        //   html: HTML,
        });
        
    }
    console.log(users.length);
}


module.exports = {validateSchema, tools, filterObject, notificationProcess };