import sanitizeObjects from "../helpers/sanitizeObjects.helper.js";

export function validateSchema(schema) {
    return (req, res, next) => {
        const validation = schema.validate(sanitizeObjects(req.body), { abortEarly: false });

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }
        next();
    };
}